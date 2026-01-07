package com.homestay.booking.service;

import com.homestay.booking.dto.request.VerifyPaymentRequest;
import com.homestay.booking.dto.response.PaymentOrderResponse;
import com.homestay.booking.dto.response.PaymentResponse;
import com.homestay.booking.exception.PaymentException;
import com.homestay.booking.exception.ResourceNotFoundException;
import com.homestay.booking.model.Booking;
import com.homestay.booking.model.Payment;
import com.homestay.booking.model.enums.PaymentStatus;
import com.homestay.booking.repository.BookingRepository;
import com.homestay.booking.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Formatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final BookingService bookingService;
    private final EmailService emailService;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    @Transactional
    public PaymentOrderResponse createRazorpayOrder(Long bookingId, String userEmail) {
        log.info("Creating Razorpay order for booking: {}", bookingId);

        // Get booking
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        // Verify user owns the booking
        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new PaymentException("Unauthorized to create payment for this booking");
        }

        // Check if payment already exists for this booking
        Payment existingPayment = paymentRepository.findByBookingId(bookingId).orElse(null);
        if (existingPayment != null && existingPayment.getStatus() == PaymentStatus.COMPLETED) {
            throw new PaymentException("Payment already completed for this booking");
        }

        try {
            // Initialize Razorpay client
            RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            // Create order options
            JSONObject orderRequest = new JSONObject();
            // Convert amount to paise (Razorpay expects amount in smallest currency unit)
            int amountInPaise = booking.getTotalAmount().multiply(BigDecimal.valueOf(100)).intValue();
            orderRequest.put("amount", amountInPaise);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "BOOKING_" + bookingId);
            orderRequest.put("payment_capture", 1); // Auto capture payment

            // Create order in Razorpay
            Order order = razorpayClient.orders.create(orderRequest);
            String orderId = order.get("id");

            log.info("Razorpay order created: {}", orderId);

            // Create or update payment record
            Payment payment;
            if (existingPayment != null) {
                payment = existingPayment;
            } else {
                payment = new Payment();
                payment.setBooking(booking);
            }

            payment.setRazorpayOrderId(orderId);
            payment.setAmount(booking.getTotalAmount());
            payment.setCurrency("INR");
            payment.setStatus(PaymentStatus.CREATED);

            paymentRepository.save(payment);

            // Update booking payment status
            bookingService.updatePaymentStatus(bookingId, PaymentStatus.CREATED);

            // Return order details for frontend
            return PaymentOrderResponse.builder()
                    .orderId(orderId)
                    .amount(booking.getTotalAmount())
                    .currency("INR")
                    .bookingId(bookingId)
                    .razorpayKeyId(razorpayKeyId)
                    .customerName(booking.getUser().getName())
                    .customerEmail(booking.getUser().getEmail())
                    .build();

        } catch (RazorpayException e) {
            log.error("Error creating Razorpay order: {}", e.getMessage());
            throw new PaymentException("Failed to create payment order: " + e.getMessage());
        }
    }

    @Transactional
    public PaymentResponse verifyPaymentSignature(VerifyPaymentRequest request, String userEmail) {
        log.info("Verifying payment for booking: {}", request.getBookingId());

        // Get booking
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        // Verify user owns the booking
        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new PaymentException("Unauthorized to verify payment for this booking");
        }

        // Get payment record
        Payment payment = paymentRepository.findByBookingId(request.getBookingId()).orElse(null);
        if (payment == null) {
            throw new ResourceNotFoundException("Payment record not found");
        }

        // Verify Razorpay signature
        boolean isValid = verifyRazorpaySignature(
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),
                request.getRazorpaySignature()
        );

        if (!isValid) {
            log.error("Invalid Razorpay signature for booking: {}", request.getBookingId());
            payment.setStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);
            bookingService.updatePaymentStatus(request.getBookingId(), PaymentStatus.FAILED);
            throw new PaymentException("Payment signature verification failed");
        }

        // Update payment record
        payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
        payment.setRazorpaySignature(request.getRazorpaySignature());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setStatus(PaymentStatus.COMPLETED);

        Payment savedPayment = paymentRepository.save(payment);

        // Update booking status
        bookingService.updatePaymentStatus(request.getBookingId(), PaymentStatus.COMPLETED);

        // Send confirmation emails
        emailService.sendBookingConfirmationEmail(booking);
        emailService.sendPaymentReceiptEmail(booking, savedPayment);

        log.info("Payment verified successfully for booking: {}", request.getBookingId());

        return mapToPaymentResponse(savedPayment);
    }

    @Transactional(readOnly = true)
    public PaymentResponse getPaymentByBookingId(Long bookingId, String userEmail) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        // Verify user owns the booking
        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new PaymentException("Unauthorized to view payment for this booking");
        }

        Payment payment = paymentRepository.findByBookingId(bookingId).orElse(null);
        if (payment == null) {
            throw new ResourceNotFoundException("Payment not found for this booking");
        }

        return mapToPaymentResponse(payment);
    }

    @Transactional
    public void handlePaymentFailure(Long bookingId, String reason) {
        log.info("Handling payment failure for booking: {}", bookingId);

        Payment payment = paymentRepository.findByBookingId(bookingId).orElse(null);
        if (payment != null) {
            payment.setStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);
        }

        bookingService.updatePaymentStatus(bookingId, PaymentStatus.FAILED);
    }

    private boolean verifyRazorpaySignature(String orderId, String paymentId, String signature) {
        try {
            // Create signature string
            String payload = orderId + "|" + paymentId;

            // Calculate HMAC SHA256
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(
                    razorpayKeySecret.getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256"
            );
            sha256Hmac.init(secretKey);

            byte[] hash = sha256Hmac.doFinal(payload.getBytes(StandardCharsets.UTF_8));

            // Convert to hex string
            String generatedSignature = bytesToHex(hash);

            // Compare signatures
            return generatedSignature.equals(signature);

        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            log.error("Error verifying signature: {}", e.getMessage());
            return false;
        }
    }

    private String bytesToHex(byte[] bytes) {
        Formatter formatter = new Formatter();
        for (byte b : bytes) {
            formatter.format("%02x", b);
        }
        String result = formatter.toString();
        formatter.close();
        return result;
    }

    private PaymentResponse mapToPaymentResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .bookingId(payment.getBooking().getId())
                .razorpayOrderId(payment.getRazorpayOrderId())
                .razorpayPaymentId(payment.getRazorpayPaymentId())
                .amount(payment.getAmount())
                .currency(payment.getCurrency())
                .paymentMethod(payment.getPaymentMethod())
                .status(payment.getStatus())
                .createdAt(payment.getCreatedAt())
                .updatedAt(payment.getUpdatedAt())
                .build();
    }
}

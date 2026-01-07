package com.homestay.booking.controller;

import com.homestay.booking.dto.request.CreatePaymentOrderRequest;
import com.homestay.booking.dto.request.VerifyPaymentRequest;
import com.homestay.booking.dto.response.PaymentOrderResponse;
import com.homestay.booking.dto.response.PaymentResponse;
import com.homestay.booking.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed.origins}")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<PaymentOrderResponse> createPaymentOrder(
            @Valid @RequestBody CreatePaymentOrderRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        PaymentOrderResponse response = paymentService.createRazorpayOrder(
                request.getBookingId(),
                userDetails.getUsername()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<PaymentResponse> verifyPayment(
            @Valid @RequestBody VerifyPaymentRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        PaymentResponse response = paymentService.verifyPaymentSignature(
                request,
                userDetails.getUsername()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<PaymentResponse> getPaymentByBookingId(
            @PathVariable Long bookingId,
            @AuthenticationPrincipal UserDetails userDetails) {

        PaymentResponse payment = paymentService.getPaymentByBookingId(
                bookingId,
                userDetails.getUsername()
        );
        return ResponseEntity.ok(payment);
    }

    @PostMapping("/failure")
    public ResponseEntity<Map<String, String>> handlePaymentFailure(
            @RequestParam Long bookingId,
            @RequestParam(required = false) String reason) {

        paymentService.handlePaymentFailure(bookingId, reason);
        return ResponseEntity.ok(Map.of("message", "Payment failure recorded"));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "Payment Service"
        ));
    }
}

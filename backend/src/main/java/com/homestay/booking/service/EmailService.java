package com.homestay.booking.service;

import com.homestay.booking.model.Booking;
import com.homestay.booking.model.Payment;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@homestay.com}")
    private String fromEmail;

    @Value("${app.mode:test}")
    private String appMode;

    public EmailService(@org.springframework.beans.factory.annotation.Autowired(required = false) JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd MMM yyyy");

    @Async
    public void sendBookingConfirmationEmail(Booking booking) {
        if (mailSender == null) {
            log.info("Email service not configured (test mode) - Skipping booking confirmation email to: {}", booking.getUser().getEmail());
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(booking.getUser().getEmail());
            helper.setSubject("Booking Confirmation - " + booking.getRoom().getName());

            String emailBody = buildBookingConfirmationEmail(booking);
            helper.setText(emailBody, true);

            mailSender.send(message);
            log.info("Booking confirmation email sent to: {}", booking.getUser().getEmail());

        } catch (MessagingException e) {
            log.error("Error sending booking confirmation email: {}", e.getMessage());
        }
    }

    @Async
    public void sendPaymentReceiptEmail(Booking booking, Payment payment) {
        if (mailSender == null) {
            log.info("Email service not configured (test mode) - Skipping payment receipt email to: {}", booking.getUser().getEmail());
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(booking.getUser().getEmail());
            helper.setSubject("Payment Receipt - Booking #" + booking.getId());

            String emailBody = buildPaymentReceiptEmail(booking, payment);
            helper.setText(emailBody, true);

            mailSender.send(message);
            log.info("Payment receipt email sent to: {}", booking.getUser().getEmail());

        } catch (MessagingException e) {
            log.error("Error sending payment receipt email: {}", e.getMessage());
        }
    }

    @Async
    public void sendBookingCancellationEmail(Booking booking) {
        if (mailSender == null) {
            log.info("Email service not configured (test mode) - Skipping booking cancellation email to: {}", booking.getUser().getEmail());
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(booking.getUser().getEmail());
            helper.setSubject("Booking Cancellation - Booking #" + booking.getId());

            String emailBody = buildBookingCancellationEmail(booking);
            helper.setText(emailBody, true);

            mailSender.send(message);
            log.info("Booking cancellation email sent to: {}", booking.getUser().getEmail());

        } catch (MessagingException e) {
            log.error("Error sending booking cancellation email: {}", e.getMessage());
        }
    }

    private String buildBookingConfirmationEmail(Booking booking) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 20px; margin: 20px 0; }
                        .booking-details { background-color: white; padding: 15px; margin: 10px 0; border-left: 4px solid #4CAF50; }
                        .detail-row { margin: 10px 0; }
                        .label { font-weight: bold; color: #555; }
                        .value { color: #333; }
                        .footer { text-align: center; color: #777; font-size: 12px; margin-top: 20px; }
                        .amount { font-size: 24px; color: #4CAF50; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Booking Confirmed!</h1>
                        </div>
                        <div class="content">
                            <p>Dear %s,</p>
                            <p>Your booking has been confirmed successfully. Here are your booking details:</p>

                            <div class="booking-details">
                                <div class="detail-row">
                                    <span class="label">Booking ID:</span>
                                    <span class="value">#%d</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Room:</span>
                                    <span class="value">%s</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Room Type:</span>
                                    <span class="value">%s</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Meal Package:</span>
                                    <span class="value">%s</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Check-in:</span>
                                    <span class="value">%s</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Check-out:</span>
                                    <span class="value">%s</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Number of Guests:</span>
                                    <span class="value">%d</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Total Amount:</span>
                                    <span class="amount">₹%s</span>
                                </div>
                            </div>

                            <p>We look forward to hosting you at our homestay!</p>
                            <p>If you have any questions, please don't hesitate to contact us.</p>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this message.</p>
                            <p>&copy; 2024 Homestay Booking. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(
                booking.getUser().getName(),
                booking.getId(),
                booking.getRoom().getName(),
                booking.getRoom().getType(),
                booking.getMealPackage().getName(),
                booking.getCheckInDate().format(DATE_FORMATTER),
                booking.getCheckOutDate().format(DATE_FORMATTER),
                booking.getNumberOfGuests(),
                booking.getTotalAmount()
        );
    }

    private String buildPaymentReceiptEmail(Booking booking, Payment payment) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 20px; margin: 20px 0; }
                        .payment-details { background-color: white; padding: 15px; margin: 10px 0; border-left: 4px solid #2196F3; }
                        .detail-row { margin: 10px 0; }
                        .label { font-weight: bold; color: #555; }
                        .value { color: #333; }
                        .footer { text-align: center; color: #777; font-size: 12px; margin-top: 20px; }
                        .amount { font-size: 24px; color: #2196F3; font-weight: bold; }
                        .success { color: #4CAF50; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Payment Successful</h1>
                        </div>
                        <div class="content">
                            <p>Dear %s,</p>
                            <p>Your payment has been received successfully. Here are your payment details:</p>

                            <div class="payment-details">
                                <div class="detail-row">
                                    <span class="label">Payment ID:</span>
                                    <span class="value">%s</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Booking ID:</span>
                                    <span class="value">#%d</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Amount Paid:</span>
                                    <span class="amount">₹%s</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Payment Method:</span>
                                    <span class="value">%s</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Payment Status:</span>
                                    <span class="success">%s</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Transaction Date:</span>
                                    <span class="value">%s</span>
                                </div>
                            </div>

                            <p>Thank you for your payment. Your booking is now confirmed!</p>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this message.</p>
                            <p>&copy; 2024 Homestay Booking. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(
                booking.getUser().getName(),
                payment.getRazorpayPaymentId(),
                booking.getId(),
                payment.getAmount(),
                payment.getPaymentMethod() != null ? payment.getPaymentMethod() : "Online",
                payment.getStatus(),
                payment.getCreatedAt().format(DateTimeFormatter.ofPattern("dd MMM yyyy HH:mm"))
        );
    }

    private String buildBookingCancellationEmail(Booking booking) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #f44336; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 20px; margin: 20px 0; }
                        .booking-details { background-color: white; padding: 15px; margin: 10px 0; border-left: 4px solid #f44336; }
                        .detail-row { margin: 10px 0; }
                        .label { font-weight: bold; color: #555; }
                        .value { color: #333; }
                        .footer { text-align: center; color: #777; font-size: 12px; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Booking Cancelled</h1>
                        </div>
                        <div class="content">
                            <p>Dear %s,</p>
                            <p>Your booking has been cancelled as requested. Here are the details:</p>

                            <div class="booking-details">
                                <div class="detail-row">
                                    <span class="label">Booking ID:</span>
                                    <span class="value">#%d</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Room:</span>
                                    <span class="value">%s</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Check-in Date:</span>
                                    <span class="value">%s</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Check-out Date:</span>
                                    <span class="value">%s</span>
                                </div>
                            </div>

                            <p>If you have any questions about your cancellation or refund, please contact our support team.</p>
                            <p>We hope to serve you again in the future!</p>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this message.</p>
                            <p>&copy; 2024 Homestay Booking. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(
                booking.getUser().getName(),
                booking.getId(),
                booking.getRoom().getName(),
                booking.getCheckInDate().format(DATE_FORMATTER),
                booking.getCheckOutDate().format(DATE_FORMATTER)
        );
    }
}

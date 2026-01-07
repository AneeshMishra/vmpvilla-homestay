package com.homestay.booking.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentOrderResponse {

    private String orderId;
    private BigDecimal amount;
    private String currency;
    private Long bookingId;
    private String razorpayKeyId;

    // Customer details for prefill
    private String customerName;
    private String customerEmail;
}

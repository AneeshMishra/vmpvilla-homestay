package com.homestay.booking.dto.response;

import com.homestay.booking.model.enums.BookingStatus;
import com.homestay.booking.model.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {

    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;

    private Long roomId;
    private String roomName;
    private String roomType;

    private Long packageId;
    private String packageName;

    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer numberOfGuests;
    private Integer numberOfNights;

    private BigDecimal roomCharges;
    private BigDecimal packageCharges;
    private BigDecimal totalAmount;

    private BookingStatus bookingStatus;
    private PaymentStatus paymentStatus;

    private String specialRequests;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

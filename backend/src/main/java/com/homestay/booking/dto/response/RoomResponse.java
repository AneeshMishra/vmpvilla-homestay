package com.homestay.booking.dto.response;

import com.homestay.booking.model.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomResponse {
    private Long id;
    private String name;
    private String description;
    private RoomType type;
    private BigDecimal pricePerNight;
    private Integer maxGuests;
    private List<String> amenities;
    private List<String> imageUrls;
    private Boolean isAvailable;
}

package com.homestay.booking.service;

import com.homestay.booking.dto.response.RoomResponse;
import com.homestay.booking.exception.ResourceNotFoundException;
import com.homestay.booking.model.Room;
import com.homestay.booking.model.enums.RoomType;
import com.homestay.booking.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomService {

    private final RoomRepository roomRepository;

    @Transactional(readOnly = true)
    public List<RoomResponse> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<RoomResponse> getAvailableRooms() {
        return roomRepository.findByIsAvailable(true).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RoomResponse getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
        return convertToResponse(room);
    }

    @Transactional(readOnly = true)
    public List<RoomResponse> searchRooms(RoomType type, Integer maxGuests,
                                          BigDecimal minPrice, BigDecimal maxPrice) {
        return roomRepository.findAvailableRooms(type, maxGuests, minPrice, maxPrice).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<RoomResponse> getRoomsByType(RoomType type) {
        return roomRepository.findByType(type).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private RoomResponse convertToResponse(Room room) {
        return RoomResponse.builder()
                .id(room.getId())
                .name(room.getName())
                .description(room.getDescription())
                .type(room.getType())
                .pricePerNight(room.getPricePerNight())
                .maxGuests(room.getMaxGuests())
                .amenities(parseAmenities(room.getAmenities()))
                .imageUrls(parseImageUrls(room.getImageUrls()))
                .isAvailable(room.getIsAvailable())
                .build();
    }

    private List<String> parseAmenities(String amenities) {
        if (amenities == null || amenities.isEmpty()) {
            return List.of();
        }
        return Arrays.asList(amenities.split(","));
    }

    private List<String> parseImageUrls(String imageUrls) {
        if (imageUrls == null || imageUrls.isEmpty()) {
            return List.of();
        }
        return Arrays.asList(imageUrls.split(","));
    }
}

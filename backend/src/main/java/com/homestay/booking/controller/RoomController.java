package com.homestay.booking.controller;

import com.homestay.booking.dto.response.RoomResponse;
import com.homestay.booking.model.enums.RoomType;
import com.homestay.booking.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomResponse>> getAllRooms() {
        List<RoomResponse> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/available")
    public ResponseEntity<List<RoomResponse>> getAvailableRooms() {
        List<RoomResponse> rooms = roomService.getAvailableRooms();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable Long id) {
        RoomResponse room = roomService.getRoomById(id);
        return ResponseEntity.ok(room);
    }

    @GetMapping("/search")
    public ResponseEntity<List<RoomResponse>> searchRooms(
            @RequestParam(required = false) RoomType type,
            @RequestParam(required = false) Integer maxGuests,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice
    ) {
        List<RoomResponse> rooms = roomService.searchRooms(type, maxGuests, minPrice, maxPrice);
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<RoomResponse>> getRoomsByType(@PathVariable RoomType type) {
        List<RoomResponse> rooms = roomService.getRoomsByType(type);
        return ResponseEntity.ok(rooms);
    }
}

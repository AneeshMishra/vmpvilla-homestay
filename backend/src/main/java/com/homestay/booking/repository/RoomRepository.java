package com.homestay.booking.repository;

import com.homestay.booking.model.Room;
import com.homestay.booking.model.enums.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByIsAvailable(Boolean isAvailable);

    List<Room> findByType(RoomType type);

    @Query("SELECT r FROM Room r WHERE r.isAvailable = true " +
           "AND (:type IS NULL OR r.type = :type) " +
           "AND (:maxGuests IS NULL OR r.maxGuests >= :maxGuests) " +
           "AND (:minPrice IS NULL OR r.pricePerNight >= :minPrice) " +
           "AND (:maxPrice IS NULL OR r.pricePerNight <= :maxPrice)")
    List<Room> findAvailableRooms(
        @Param("type") RoomType type,
        @Param("maxGuests") Integer maxGuests,
        @Param("minPrice") BigDecimal minPrice,
        @Param("maxPrice") BigDecimal maxPrice
    );
}

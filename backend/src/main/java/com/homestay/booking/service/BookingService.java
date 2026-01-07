package com.homestay.booking.service;

import com.homestay.booking.dto.request.CreateBookingRequest;
import com.homestay.booking.dto.response.BookingResponse;
import com.homestay.booking.exception.BadRequestException;
import com.homestay.booking.exception.ResourceNotFoundException;
import com.homestay.booking.model.*;
import com.homestay.booking.model.enums.BookingStatus;
import com.homestay.booking.model.enums.PaymentStatus;
import com.homestay.booking.repository.BookingRepository;
import com.homestay.booking.repository.PackageRepository;
import com.homestay.booking.repository.RoomRepository;
import com.homestay.booking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final PackageRepository packageRepository;
    private final EmailService emailService;

    @Transactional
    public BookingResponse createBooking(CreateBookingRequest request, String userEmail) {
        log.info("Creating booking for user: {}", userEmail);

        // Validate dates
        validateBookingDates(request.getCheckInDate(), request.getCheckOutDate());

        // Get user
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Get room
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        // Get package
        com.homestay.booking.model.Package mealPackage = packageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new ResourceNotFoundException("Package not found"));

        // Validate room availability
        if (!room.getIsAvailable()) {
            throw new BadRequestException("Room is not available");
        }

        // Validate guest capacity
        if (request.getNumberOfGuests() > room.getMaxGuests()) {
            throw new BadRequestException(
                    String.format("Room can accommodate maximum %d guests", room.getMaxGuests())
            );
        }

        // Check if room is already booked for the requested dates
        if (isRoomAlreadyBooked(room.getId(), request.getCheckInDate(), request.getCheckOutDate())) {
            throw new BadRequestException("Room is already booked for the selected dates");
        }

        // Calculate total amount
        long numberOfNights = ChronoUnit.DAYS.between(request.getCheckInDate(), request.getCheckOutDate());
        BigDecimal roomCharges = room.getPricePerNight().multiply(BigDecimal.valueOf(numberOfNights));
        BigDecimal packageCharges = mealPackage.getPrice().multiply(BigDecimal.valueOf(numberOfNights))
                .multiply(BigDecimal.valueOf(request.getNumberOfGuests()));
        BigDecimal totalAmount = roomCharges.add(packageCharges);

        // Create booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setMealPackage(mealPackage);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setNumberOfGuests(request.getNumberOfGuests());
        booking.setTotalAmount(totalAmount);
        booking.setBookingStatus(BookingStatus.PENDING);
        booking.setPaymentStatus(PaymentStatus.PENDING);
        booking.setSpecialRequests(request.getSpecialRequests());

        Booking savedBooking = bookingRepository.save(booking);
        log.info("Booking created successfully with ID: {}", savedBooking.getId());

        return mapToBookingResponse(savedBooking);
    }

    @Transactional(readOnly = true)
    public BookingResponse getBookingById(Long bookingId, String userEmail) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        // Check if booking belongs to the user
        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new BadRequestException("You are not authorized to view this booking");
        }

        return mapToBookingResponse(booking);
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> getUserBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Booking> bookings = bookingRepository.findByUserId(user.getId());
        return bookings.stream()
                .map(this::mapToBookingResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream()
                .map(this::mapToBookingResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateBookingStatus(Long bookingId, BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        booking.setBookingStatus(status);
        bookingRepository.save(booking);
        log.info("Booking {} status updated to {}", bookingId, status);
    }

    @Transactional
    public void updatePaymentStatus(Long bookingId, PaymentStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        booking.setPaymentStatus(status);

        // If payment is completed, confirm the booking
        if (status == PaymentStatus.COMPLETED) {
            booking.setBookingStatus(BookingStatus.CONFIRMED);
        }

        bookingRepository.save(booking);
        log.info("Booking {} payment status updated to {}", bookingId, status);
    }

    @Transactional
    public void cancelBooking(Long bookingId, String userEmail) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        // Check if booking belongs to the user
        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new BadRequestException("You are not authorized to cancel this booking");
        }

        // Only allow cancellation if booking is pending or confirmed
        if (booking.getBookingStatus() == BookingStatus.CANCELLED ||
                booking.getBookingStatus() == BookingStatus.COMPLETED) {
            throw new BadRequestException("Cannot cancel this booking");
        }

        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        // Send cancellation email
        emailService.sendBookingCancellationEmail(booking);

        log.info("Booking {} cancelled successfully", bookingId);
    }

    @Transactional(readOnly = true)
    public boolean isRoomAvailable(Long roomId, LocalDate checkInDate, LocalDate checkOutDate) {
        return !isRoomAlreadyBooked(roomId, checkInDate, checkOutDate);
    }

    private boolean isRoomAlreadyBooked(Long roomId, LocalDate checkInDate, LocalDate checkOutDate) {
        List<Booking> conflictingBookings = bookingRepository.findConflictingBookings(
                roomId, checkInDate, checkOutDate
        );
        return !conflictingBookings.isEmpty();
    }

    private void validateBookingDates(LocalDate checkInDate, LocalDate checkOutDate) {
        LocalDate today = LocalDate.now();

        if (checkInDate.isBefore(today)) {
            throw new BadRequestException("Check-in date cannot be in the past");
        }

        if (checkOutDate.isBefore(checkInDate.plusDays(1))) {
            throw new BadRequestException("Check-out date must be at least one day after check-in date");
        }

        // Maximum booking period is 30 days
        long numberOfNights = ChronoUnit.DAYS.between(checkInDate, checkOutDate);
        if (numberOfNights > 30) {
            throw new BadRequestException("Maximum booking period is 30 days");
        }
    }

    private BookingResponse mapToBookingResponse(Booking booking) {
        long numberOfNights = ChronoUnit.DAYS.between(
                booking.getCheckInDate(),
                booking.getCheckOutDate()
        );

        BigDecimal roomCharges = booking.getRoom().getPricePerNight()
                .multiply(BigDecimal.valueOf(numberOfNights));
        BigDecimal packageCharges = booking.getMealPackage().getPrice()
                .multiply(BigDecimal.valueOf(numberOfNights))
                .multiply(BigDecimal.valueOf(booking.getNumberOfGuests()));

        return BookingResponse.builder()
                .id(booking.getId())
                .userId(booking.getUser().getId())
                .userName(booking.getUser().getName())
                .userEmail(booking.getUser().getEmail())
                .roomId(booking.getRoom().getId())
                .roomName(booking.getRoom().getName())
                .roomType(booking.getRoom().getType().toString())
                .packageId(booking.getMealPackage().getId())
                .packageName(booking.getMealPackage().getName())
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .numberOfGuests(booking.getNumberOfGuests())
                .numberOfNights((int) numberOfNights)
                .roomCharges(roomCharges)
                .packageCharges(packageCharges)
                .totalAmount(booking.getTotalAmount())
                .bookingStatus(booking.getBookingStatus())
                .paymentStatus(booking.getPaymentStatus())
                .specialRequests(booking.getSpecialRequests())
                .createdAt(booking.getCreatedAt())
                .updatedAt(booking.getUpdatedAt())
                .build();
    }
}

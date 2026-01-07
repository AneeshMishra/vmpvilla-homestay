import api from '../utils/api';

export const bookingService = {
  createBooking: (bookingData) => {
    return api.post('/bookings', bookingData);
  },

  getBookingById: (id) => {
    return api.get(`/bookings/${id}`);
  },

  getUserBookings: () => {
    return api.get('/bookings/my-bookings');
  },

  cancelBooking: (id) => {
    return api.post(`/bookings/${id}/cancel`);
  },

  checkAvailability: (roomId, checkInDate, checkOutDate) => {
    return api.get('/bookings/check-availability', {
      params: { roomId, checkInDate, checkOutDate },
    });
  },
};

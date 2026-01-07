import api from '../utils/api';

export const paymentService = {
  createPaymentOrder: (bookingId) => {
    return api.post('/payments/create-order', { bookingId });
  },

  verifyPayment: (paymentData) => {
    return api.post('/payments/verify', paymentData);
  },

  getPaymentByBookingId: (bookingId) => {
    return api.get(`/payments/booking/${bookingId}`);
  },

  handlePaymentFailure: (bookingId, reason) => {
    return api.post('/payments/failure', null, {
      params: { bookingId, reason },
    });
  },
};

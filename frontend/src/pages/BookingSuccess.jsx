import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { bookingService } from '../services/bookingService';
import { formatCurrency, formatDate } from '../utils/formatters';
import Loader from '../components/Loader';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId } = location.state || {};

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      navigate('/rooms');
      return;
    }
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const response = await bookingService.getBookingById(bookingId);
      setBooking(response.data);
    } catch (error) {
      console.error('Error fetching booking:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Booking not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 mb-8">
            Your booking has been confirmed and payment was successful
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-semibold">#{booking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Room:</span>
                <span className="font-semibold">{booking.roomName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-semibold">{formatDate(booking.checkInDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span className="font-semibold">{formatDate(booking.checkOutDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span className="font-semibold">{booking.numberOfGuests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Meal Package:</span>
                <span className="font-semibold">{booking.packageName}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-bold">Total Paid:</span>
                <span className="font-bold text-primary-600">
                  {formatCurrency(booking.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Booking confirmation email sent to {booking.userEmail}</li>
              <li>✓ Payment receipt sent to your email</li>
              <li>✓ You can view your booking details anytime</li>
              <li>✓ Please arrive on check-in date with a valid ID</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/my-bookings" className="btn-primary flex-1">
              View My Bookings
            </Link>
            <Link to="/rooms" className="btn-secondary flex-1">
              Browse More Rooms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookingService } from '../services/bookingService';
import { paymentService } from '../services/paymentService';
import { formatCurrency, formatDate, calculateNights } from '../utils/formatters';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room, package: mealPackage, checkInDate, checkOutDate, numberOfGuests } = location.state || {};

  const [specialRequests, setSpecialRequests] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!room || !mealPackage) {
    navigate('/rooms');
    return null;
  }

  const nights = calculateNights(checkInDate, checkOutDate);
  const roomCharges = room.pricePerNight * nights;
  const packageCharges = mealPackage.price * nights * numberOfGuests;
  const totalAmount = roomCharges + packageCharges;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleConfirmBooking = async () => {
    try {
      setIsProcessing(true);

      const bookingData = {
        roomId: room.id,
        packageId: mealPackage.id,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        specialRequests,
      };

      const bookingResponse = await bookingService.createBooking(bookingData);
      const booking = bookingResponse.data;

      toast.success('Booking created! Proceeding to payment...');

      const paymentOrderResponse = await paymentService.createPaymentOrder(booking.id);
      const orderData = paymentOrderResponse.data;

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway');
        return;
      }

      const options = {
        key: orderData.razorpayKeyId || RAZORPAY_KEY_ID,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'Homestay Booking',
        description: `Booking for ${room.name}`,
        order_id: orderData.orderId,
        prefill: {
          name: orderData.customerName,
          email: orderData.customerEmail,
        },
        theme: {
          color: '#22c55e',
        },
        handler: async function (response) {
          try {
            const verifyData = {
              bookingId: booking.id,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              paymentMethod: 'Online',
            };

            await paymentService.verifyPayment(verifyData);
            toast.success('Payment successful! Booking confirmed.');
            navigate('/booking/success', { state: { bookingId: booking.id } });
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed');
            await paymentService.handlePaymentFailure(booking.id, 'Verification failed');
          }
        },
        modal: {
          ondismiss: async function () {
            toast.warning('Payment cancelled');
            await paymentService.handlePaymentFailure(booking.id, 'User cancelled');
            setIsProcessing(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Booking failed');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Confirm Your Booking
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold mb-6">Booking Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Room Details</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Room:</span> {room.name}</p>
                <p><span className="font-medium">Type:</span> {room.type}</p>
                <p><span className="font-medium">Price:</span> {formatCurrency(room.pricePerNight)}/night</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Stay Details</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Check-in:</span> {formatDate(checkInDate)}</p>
                <p><span className="font-medium">Check-out:</span> {formatDate(checkOutDate)}</p>
                <p><span className="font-medium">Nights:</span> {nights}</p>
                <p><span className="font-medium">Guests:</span> {numberOfGuests}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold text-gray-900 mb-4">Meal Package</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{mealPackage.name}</div>
                  <div className="text-sm text-gray-600">{mealPackage.description}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary-600">
                    {formatCurrency(mealPackage.price)}
                  </div>
                  <div className="text-xs text-gray-600">per person/night</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows="3"
              className="input-field"
              placeholder="Any special requirements or requests..."
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold mb-6">Price Breakdown</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">Room Charges ({nights} nights)</span>
              <span className="font-semibold">{formatCurrency(roomCharges)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">
                Meal Package ({numberOfGuests} guests × {nights} nights)
              </span>
              <span className="font-semibold">{formatCurrency(packageCharges)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-xl font-bold">
              <span>Total Amount</span>
              <span className="text-primary-600">{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Payment Information</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Secure payment powered by Razorpay</li>
            <li>• Accept UPI, Credit/Debit Cards, Net Banking</li>
            <li>• You will receive booking confirmation via email</li>
            <li>• Payment receipt will be sent after successful payment</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary flex-1"
            disabled={isProcessing}
          >
            Back
          </button>
          <button
            onClick={handleConfirmBooking}
            disabled={isProcessing}
            className="btn-primary flex-1"
          >
            {isProcessing ? 'Processing...' : 'Confirm & Pay'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;

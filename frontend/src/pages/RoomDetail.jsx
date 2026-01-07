import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roomService } from '../services/roomService';
import { packageService } from '../services/packageService';
import { bookingService } from '../services/bookingService';
import { formatCurrency, calculateNights } from '../utils/formatters';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [room, setRoom] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  useEffect(() => {
    fetchRoomAndPackages();
  }, [id]);

  const fetchRoomAndPackages = async () => {
    try {
      setLoading(true);
      const [roomResponse, packagesResponse] = await Promise.all([
        roomService.getRoomById(id),
        packageService.getAllPackages(),
      ]);

      setRoom(roomResponse.data);
      setPackages(packagesResponse.data);
      if (packagesResponse.data.length > 0) {
        setSelectedPackage(packagesResponse.data[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load room details');
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    try {
      setIsCheckingAvailability(true);
      const response = await bookingService.checkAvailability(
        id,
        checkInDate,
        checkOutDate
      );

      if (response.data.available) {
        toast.success('Room is available for selected dates!');
      } else {
        toast.error('Room is not available for selected dates');
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      toast.error('Failed to check availability');
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.info('Please login to book');
      navigate('/login');
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (numberOfGuests > room.maxGuests) {
      toast.error(`Maximum ${room.maxGuests} guests allowed`);
      return;
    }

    navigate('/booking/new', {
      state: {
        room,
        package: selectedPackage,
        checkInDate,
        checkOutDate,
        numberOfGuests,
      },
    });
  };

  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate || !selectedPackage) return 0;
    const nights = calculateNights(checkInDate, checkOutDate);
    const roomCharges = room.pricePerNight * nights;
    const packageCharges = selectedPackage.price * nights * numberOfGuests;
    return roomCharges + packageCharges;
  };

  if (loading) {
    return <Loader />;
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Room not found</p>
      </div>
    );
  }

  const nights = checkInDate && checkOutDate ? calculateNights(checkInDate, checkOutDate) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/rooms')}
          className="mb-6 text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Rooms
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div>
              <div className="h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
                {room.imageUrls && room.imageUrls.length > 0 ? (
                  <img
                    src={room.imageUrls[0]}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-9xl">
                    🏠
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {room.name}
                    </h1>
                    <span className="inline-block bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded">
                      {room.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-600">
                      {formatCurrency(room.pricePerNight)}
                    </div>
                    <div className="text-gray-600">per night</div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {room.description}
                </p>

                <div className="flex items-center gap-4 text-gray-700">
                  <span className="flex items-center">
                    👥 Max {room.maxGuests} Guests
                  </span>
                  <span className={`flex items-center ${room.available ? 'text-green-600' : 'text-red-600'}`}>
                    {room.available ? '✓ Available' : '✗ Not Available'}
                  </span>
                </div>

                {room.amenities && room.amenities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center text-gray-700"
                        >
                          <span className="mr-2">✓</span>
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Book This Room</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={checkInDate || new Date().toISOString().split('T')[0]}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      value={numberOfGuests}
                      onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
                      min="1"
                      max={room.maxGuests}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meal Package
                    </label>
                    <div className="space-y-2">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackage(pkg)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            selectedPackage?.id === pkg.id
                              ? 'border-primary-600 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-300'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold">{pkg.name}</div>
                              <div className="text-sm text-gray-600">
                                {pkg.description}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-primary-600">
                                {formatCurrency(pkg.price)}
                              </div>
                              <div className="text-xs text-gray-600">
                                per person/night
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {checkInDate && checkOutDate && selectedPackage && (
                    <div className="bg-white p-4 rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Room ({nights} nights)</span>
                        <span>{formatCurrency(room.pricePerNight * nights)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Package ({numberOfGuests} guests × {nights} nights)</span>
                        <span>{formatCurrency(selectedPackage.price * nights * numberOfGuests)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary-600">{formatCurrency(calculateTotal())}</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={checkAvailability}
                    disabled={!checkInDate || !checkOutDate || isCheckingAvailability}
                    className="w-full btn-secondary"
                  >
                    {isCheckingAvailability ? 'Checking...' : 'Check Availability'}
                  </button>

                  <button
                    onClick={handleBookNow}
                    disabled={!checkInDate || !checkOutDate || !room.available}
                    className="w-full btn-primary"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;

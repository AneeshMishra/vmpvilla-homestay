import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { roomService } from '../services/roomService';
import { formatCurrency } from '../utils/formatters';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchRooms();
  }, [filter]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      let response;

      if (filter === 'ALL') {
        response = await roomService.getAllRooms();
      } else {
        response = await roomService.getRoomsByType(filter);
      }

      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast.error('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Available Rooms
          </h1>
          <p className="text-gray-600">
            Choose from our comfortable and well-equipped rooms
          </p>
        </div>

        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'ALL'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Rooms
          </button>
          <button
            onClick={() => setFilter('STANDARD')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'STANDARD'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setFilter('DELUXE')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'DELUXE'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Deluxe
          </button>
          <button
            onClick={() => setFilter('SUITE')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'SUITE'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Suite
          </button>
        </div>

        {rooms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No rooms available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div key={room.id} className="card hover:scale-105">
                <div className="relative h-64 bg-gray-200">
                  {room.imageUrls && room.imageUrls.length > 0 ? (
                    <img
                      src={room.imageUrls[0]}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      🏠
                    </div>
                  )}
                  {room.available ? (
                    <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Booked
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {room.name}
                    </h3>
                    <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {room.type}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span>👥 {room.maxGuests} Guests</span>
                  </div>

                  {room.amenities && room.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">
                        {formatCurrency(room.pricePerNight)}
                      </span>
                      <span className="text-gray-600 text-sm">/night</span>
                    </div>

                    <Link
                      to={`/rooms/${room.id}`}
                      className="btn-primary text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomList;

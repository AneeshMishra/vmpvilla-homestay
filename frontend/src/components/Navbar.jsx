import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HOMESTAY_INFO } from '../utils/constants';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-vmp-pink">🏠</span>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-playfair text-vmp-pink">
                  {HOMESTAY_INFO.name}
                </span>
                <span className="text-xs text-gray-500 -mt-1">
                  {HOMESTAY_INFO.tagline}
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/rooms"
              className="text-gray-700 hover:text-vmp-pink px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Rooms
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-vmp-pink px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/my-bookings"
                  className="text-gray-700 hover:text-vmp-pink px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  My Bookings
                </Link>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-vmp-pink font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-vmp-pink hover:bg-vmp-pink-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

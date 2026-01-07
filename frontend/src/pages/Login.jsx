import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

// Check if in test mode (no Google Client ID configured)
const APP_MODE = import.meta.env.VITE_APP_MODE || 'test';
const IS_TEST_MODE = APP_MODE === 'test';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/rooms');
    }
  }, [isAuthenticated, navigate]);

  const handleTestLogin = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    const result = await login(email);

    if (result.success) {
      toast.success('Login successful!');
      navigate('/rooms');
    } else {
      toast.error(result.error || 'Login failed');
    }
    setLoading(false);
  };

  const handleQuickLogin = async (testEmail) => {
    setLoading(true);
    const result = await login(testEmail);

    if (result.success) {
      toast.success('Login successful!');
      navigate('/rooms');
    } else {
      toast.error(result.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🏡</div>
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome to Homestay Booking
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {IS_TEST_MODE
              ? 'Test Mode - Enter any email to login'
              : 'Sign in to book your perfect homestay'
            }
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {IS_TEST_MODE ? (
            // Test Mode Login
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Test Mode Enabled
                    </h3>
                    <p className="mt-1 text-xs text-yellow-700">
                      No Google OAuth required. Enter any email to login.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleTestLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter any email (e.g., john@example.com)"
                    className="input-field"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Quick Login</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleQuickLogin('john@example.com')}
                  disabled={loading}
                  className="btn-secondary text-sm py-2"
                >
                  John Doe
                </button>
                <button
                  onClick={() => handleQuickLogin('jane@example.com')}
                  disabled={loading}
                  className="btn-secondary text-sm py-2"
                >
                  Jane Smith
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Features</span>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Browse and book rooms
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Select meal packages
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Manage your bookings
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Test payments (Razorpay sandbox)
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            // Production Mode - Google OAuth
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Sign in with Google
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Use your Google account to access all features
                </p>
              </div>

              <div className="flex justify-center">
                {/* Google Login button would go here in production */}
                <p className="text-sm text-gray-500">
                  Google OAuth integration configured for production
                </p>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Benefits</span>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Easy booking process
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Secure payment options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Track your bookings
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Email confirmations
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-600">
          {IS_TEST_MODE
            ? 'Test mode is enabled. No real authentication required.'
            : 'By signing in, you agree to our Terms of Service and Privacy Policy'
          }
        </p>
      </div>
    </div>
  );
};

export default Login;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Homestay Booking</h3>
            <p className="text-gray-400">
              Book comfortable homestays with delicious meal packages.
              Experience the warmth of home away from home.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/rooms" className="text-gray-400 hover:text-white transition-colors">
                  Browse Rooms
                </a>
              </li>
              <li>
                <a href="/my-bookings" className="text-gray-400 hover:text-white transition-colors">
                  My Bookings
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@homestaybooking.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Mumbai, Maharashtra</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Homestay Booking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

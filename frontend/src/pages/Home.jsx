import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HOMESTAY_INFO, AMENITIES } from '../utils/constants';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel images - these will be placeholders until real images are added
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      title: 'Welcome to VMP Villa',
      subtitle: 'Your comfortable stay near Taj Mahal'
    },
    {
      url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
      title: 'Luxurious Rooms',
      subtitle: 'Modern amenities with traditional hospitality'
    },
    {
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
      title: 'Beautiful Garden Views',
      subtitle: 'Relax in peaceful surroundings'
    },
    {
      url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
      title: 'Close to Taj Mahal',
      subtitle: 'Just 9.6 km from the iconic monument'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Carousel Images */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(250, 81, 102, 0.3), rgba(250, 81, 102, 0.3)), url(${image.url})`
              }}
            >
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-2xl">
                  <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4 animate-fadeIn">
                    {image.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 animate-fadeIn">
                    {image.subtitle}
                  </p>
                  <div className="flex gap-4">
                    <Link
                      to="/rooms"
                      className="bg-white text-vmp-pink hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                    >
                      Explore Rooms
                    </Link>
                    <Link
                      to="/contact"
                      className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-vmp-pink px-8 py-3 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-vmp-pink p-3 rounded-full transition-all shadow-lg z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-vmp-pink p-3 rounded-full transition-all shadow-lg z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Welcome Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-playfair font-bold text-vmp-text mb-4">
              Welcome to {HOMESTAY_INFO.name}
            </h2>
            <p className="text-xl text-vmp-pink font-semibold mb-6">
              {HOMESTAY_INFO.tagline}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Experience the perfect blend of comfort and luxury at VMP Villa, your home away from home in Agra.
              Located just 9.6 km from the magnificent Taj Mahal, our homestay offers 12 beautifully appointed
              rooms with modern amenities, garden views, and warm hospitality. Whether you're visiting for business
              or pleasure, VMP Villa ensures a memorable stay.
            </p>
          </div>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-vmp-text mb-4">
              Our Amenities
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need for a comfortable stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {AMENITIES.map((amenity, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 text-center"
              >
                <div className="text-5xl mb-4">{amenity.icon}</div>
                <h3 className="text-xl font-semibold text-vmp-text mb-2">
                  {amenity.name}
                </h3>
                <p className="text-gray-600">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Highlights */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-vmp-text mb-4">
              Perfect Location
            </h2>
            <p className="text-gray-600 text-lg">
              Easy access to Agra's top attractions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-vmp-pink to-primary-600 text-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🏛️</div>
              <div className="text-3xl font-bold mb-2">{HOMESTAY_INFO.landmarks.tajMahal}</div>
              <div className="text-sm">to Taj Mahal</div>
            </div>

            <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🏢</div>
              <div className="text-3xl font-bold mb-2">{HOMESTAY_INFO.landmarks.cityCenter}</div>
              <div className="text-sm">to City Center</div>
            </div>

            <div className="bg-gradient-to-br from-vmp-pink-light to-primary-500 text-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🛍️</div>
              <div className="text-3xl font-bold mb-2">{HOMESTAY_INFO.landmarks.tdiMall}</div>
              <div className="text-sm">to TDI Mall</div>
            </div>

            <div className="bg-gradient-to-br from-primary-600 to-vmp-pink-dark text-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">✈️</div>
              <div className="text-3xl font-bold mb-2">{HOMESTAY_INFO.landmarks.airport}</div>
              <div className="text-sm">to Agra Airport</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-vmp-pink to-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Ready to Book Your Stay?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience comfort and hospitality at VMP Villa. Browse our rooms and find your perfect accommodation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rooms"
              className="bg-white text-vmp-pink hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              View All Rooms
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-vmp-pink px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Info Strip */}
      <div className="bg-vmp-text text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-semibold mb-2">📍 Address</h3>
              <p className="text-sm text-gray-300">
                {HOMESTAY_INFO.contact.address.line1}, {HOMESTAY_INFO.contact.address.city}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📞 Phone</h3>
              <p className="text-sm text-gray-300">{HOMESTAY_INFO.contact.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✉️ Email</h3>
              <p className="text-sm text-gray-300">{HOMESTAY_INFO.contact.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

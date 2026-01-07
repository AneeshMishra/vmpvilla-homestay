import { useState } from 'react';
import { HOMESTAY_INFO } from '../utils/constants';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
    alert('Thank you for contacting VMP Villa! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-vmp-pink to-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl">
            We'd love to hear from you. Get in touch with VMP Villa!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-playfair font-bold text-vmp-text mb-6">
              Get In Touch
            </h2>

            {/* Address */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start mb-4">
                <span className="text-3xl mr-4">📍</span>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Address</h3>
                  <p className="text-gray-600">
                    {HOMESTAY_INFO.contact.address.line1}<br />
                    {HOMESTAY_INFO.contact.address.line2}<br />
                    {HOMESTAY_INFO.contact.address.city}, {HOMESTAY_INFO.contact.address.state} {HOMESTAY_INFO.contact.address.pincode}<br />
                    {HOMESTAY_INFO.contact.address.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start mb-4">
                <span className="text-3xl mr-4">📞</span>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Phone</h3>
                  <a
                    href={`tel:${HOMESTAY_INFO.contact.phone}`}
                    className="text-vmp-pink hover:text-vmp-pink-dark"
                  >
                    {HOMESTAY_INFO.contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start mb-4">
                <span className="text-3xl mr-4">✉️</span>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <a
                    href={`mailto:${HOMESTAY_INFO.contact.email}`}
                    className="text-vmp-pink hover:text-vmp-pink-dark"
                  >
                    {HOMESTAY_INFO.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Landmarks */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-4">📍 Nearby Landmarks</h3>
              <ul className="space-y-2 text-gray-600">
                <li>🏛️ Taj Mahal - {HOMESTAY_INFO.landmarks.tajMahal}</li>
                <li>🏢 City Center - {HOMESTAY_INFO.landmarks.cityCenter}</li>
                <li>🛍️ TDI Mall - {HOMESTAY_INFO.landmarks.tdiMall}</li>
                <li>✈️ Agra Airport - {HOMESTAY_INFO.landmarks.airport}</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-playfair font-bold mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vmp-pink"
                    placeholder="Your name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vmp-pink"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vmp-pink"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vmp-pink"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-vmp-pink hover:bg-vmp-pink-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-12">
          <h2 className="text-3xl font-playfair font-bold text-vmp-text mb-6 text-center">
            Find Us On Map
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.1234567890!2d78.0081!3d27.1767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEwJzM2LjEiTiA3OMKwMDAnMjkuMiJF!5e0!3m2!1sen!2sin!4v1234567890123"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VMP Villa Location"
            ></iframe>
          </div>
          <div className="text-center mt-4">
            <a
              href={HOMESTAY_INFO.contact.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-vmp-pink hover:bg-vmp-pink-dark text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

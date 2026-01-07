// VMP Villa Homestay Constants

export const HOMESTAY_INFO = {
  name: 'VMP Villa',
  tagline: 'you feel comfortable',
  fullName: 'VMP Villa Home Stay',

  contact: {
    address: {
      line1: 'A-73, KPS Town, Jaipuriya Greens City',
      line2: 'Greens Shamshabad Road, KPS Town',
      city: 'Agra',
      state: 'Uttar Pradesh',
      pincode: '282007',
      country: 'India',
      area: 'Tājganj'
    },

    // VMP Villa contact details
    phone: '+91-9258555345',
    email: 'support@vmpvilla.in',
    website: 'https://www.vmpvilla.in',

    // Google Maps coordinates for VMP Villa, Agra
    location: {
      lat: 27.1767, // Approximate - Tājganj, Agra area
      lng: 78.0081,
      mapUrl: 'https://maps.google.com/?q=VMP+Villa+A-73+KPS+Town+Agra'
    }
  },

  landmarks: {
    cityCenter: '4.2 km',
    tajMahal: '9.6 km',
    tdiMall: '8.3 km',
    airport: '14 km'
  },

  features: [
    'AC Rooms',
    'Free WiFi',
    'Garden View',
    'Terrace',
    '12 Comfortable Rooms',
    'Close to Taj Mahal',
    'Peaceful Location',
    'Modern Amenities'
  ],

  social: {
    // Add your social media links
    facebook: '',
    instagram: '',
    twitter: ''
  }
};

export const BRAND_COLORS = {
  primary: '#FA5166',
  primaryLight: '#F06292',
  primaryDark: '#C2185B',
  text: '#1B2536',
  background: '#FFFFFF'
};

// Placeholder room images - replace with actual VMP Villa room images
export const ROOM_IMAGES = [
  {
    url: '/images/rooms/room-1.jpg',
    alt: 'VMP Villa Deluxe Room',
    title: 'Deluxe Room'
  },
  {
    url: '/images/rooms/room-2.jpg',
    alt: 'VMP Villa Suite',
    title: 'Suite Room'
  },
  {
    url: '/images/rooms/room-3.jpg',
    alt: 'VMP Villa Standard Room',
    title: 'Standard Room'
  },
  {
    url: '/images/rooms/garden-view.jpg',
    alt: 'VMP Villa Garden View',
    title: 'Garden View'
  },
  {
    url: '/images/rooms/terrace.jpg',
    alt: 'VMP Villa Terrace',
    title: 'Terrace Area'
  }
];

export const AMENITIES = [
  {
    icon: '❄️',
    name: 'Air Conditioning',
    description: 'All rooms equipped with AC'
  },
  {
    icon: '📶',
    name: 'Free WiFi',
    description: 'High-speed internet'
  },
  {
    icon: '🌳',
    name: 'Garden View',
    description: 'Beautiful garden surroundings'
  },
  {
    icon: '🏛️',
    name: 'Near Taj Mahal',
    description: 'Just 9.6 km away'
  },
  {
    icon: '🅿️',
    name: 'Parking',
    description: 'Free parking available'
  },
  {
    icon: '🍽️',
    name: 'Dining',
    description: 'Multiple meal packages'
  },
  {
    icon: '🛏️',
    name: 'Comfortable Rooms',
    description: '12 well-appointed rooms'
  },
  {
    icon: '🌅',
    name: 'Terrace',
    description: 'Relaxing terrace area'
  }
];

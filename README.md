# 🏡 Homestay Booking Application

A full-stack web application for booking homestay rooms with meal packages, featuring Google OAuth authentication and Razorpay payment integration.

## 🚀 Features

### User Features
- **Google OAuth Login**: Secure authentication using Google account
- **Room Browsing**: View and filter rooms by type (Standard, Deluxe, Suite)
- **Room Details**: Detailed information with amenities, pricing, and availability
- **Meal Packages**: Choose from CP (Continental Plan), MAP (Modified American Plan), or AP (American Plan)
- **Booking Management**: Create, view, and cancel bookings
- **Secure Payment**: Razorpay integration supporting UPI, Cards, and Net Banking
- **Email Notifications**: Automatic booking confirmations and payment receipts
- **Responsive Design**: Mobile-first, fully responsive UI

### Technical Features
- **JWT Authentication**: Secure token-based authentication
- **Real-time Availability Check**: Prevent double bookings
- **Payment Verification**: Razorpay signature verification
- **Async Email Service**: Non-blocking email notifications
- **RESTful API**: Clean and well-documented API endpoints
- **Error Handling**: Comprehensive error handling and validation

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.1**
  - Spring Web
  - Spring Data JPA
  - Spring Security
  - Spring Mail
- **PostgreSQL 12+**
- **Razorpay Java SDK**
- **Google OAuth2 Client**
- **JWT (JJWT)**
- **Lombok**

### Frontend
- **React 18.2**
- **Vite** (Build tool)
- **React Router v6**
- **Tailwind CSS**
- **Axios**
- **React OAuth Google**
- **React Toastify**

## 📁 Project Structure

```
homestay-booking/
├── backend/
│   ├── src/main/java/com/homestay/booking/
│   │   ├── config/              # Configuration classes
│   │   ├── controller/          # REST API controllers
│   │   ├── dto/                 # Data Transfer Objects
│   │   ├── exception/           # Exception handling
│   │   ├── model/               # JPA Entities
│   │   ├── repository/          # Spring Data repositories
│   │   ├── security/            # JWT & Security config
│   │   └── service/             # Business logic
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql             # Sample data
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── components/          # Reusable components
    │   ├── context/             # React Context (Auth)
    │   ├── pages/               # Page components
    │   ├── services/            # API service layer
    │   ├── utils/               # Utility functions
    │   ├── App.jsx              # Main App component
    │   ├── main.jsx             # Entry point
    │   └── index.css            # Global styles
    ├── package.json
    └── vite.config.js
```

## 🔧 Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 18+ and npm
- PostgreSQL 12+
- Google OAuth Client ID ([Get it here](https://console.cloud.google.com/))
- Razorpay Account ([Sign up here](https://razorpay.com/))

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create PostgreSQL database**
   ```sql
   CREATE DATABASE homestay_booking;
   ```

3. **Configure environment variables**

   Create `.env` file or set environment variables:
   ```properties
   # Database
   DB_URL=jdbc:postgresql://localhost:5432/homestay_booking
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-min-256-bits

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Razorpay
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret

   # Email (Gmail SMTP)
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-specific-password
   ```

4. **Update `application.properties`**

   The application.properties file is already configured to use environment variables.

5. **Build and run**
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

   Backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   VITE_RAZORPAY_KEY_ID=your-razorpay-key-id
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Frontend will start on `http://localhost:5173`

## 🔑 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth Client ID
5. Application type: Web application
6. Authorized JavaScript origins: `http://localhost:5173`
7. Authorized redirect URIs: `http://localhost:5173`
8. Copy Client ID and Client Secret

## 💳 Razorpay Setup

1. Sign up at [Razorpay](https://razorpay.com/)
2. Go to Settings → API Keys
3. Generate Test/Live API keys
4. Copy Key ID and Key Secret
5. For testing, use [test cards](https://razorpay.com/docs/payments/payments/test-card-upi-details/)

## 📧 Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account → Security → 2-Step Verification
3. Scroll to "App passwords"
4. Generate an app password for "Mail"
5. Use this password in your environment variables

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/google-login` - Login with Google
- `GET /api/auth/health` - Health check

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/{id}` - Get room by ID
- `GET /api/rooms/available` - Get available rooms
- `GET /api/rooms/search` - Search rooms
- `GET /api/rooms/type/{type}` - Get rooms by type

### Packages
- `GET /api/packages` - Get all meal packages
- `GET /api/packages/{id}` - Get package by ID
- `GET /api/packages/name/{name}` - Get package by name

### Bookings (Protected)
- `POST /api/bookings` - Create booking
- `GET /api/bookings/{id}` - Get booking by ID
- `GET /api/bookings/my-bookings` - Get user bookings
- `POST /api/bookings/{id}/cancel` - Cancel booking
- `GET /api/bookings/check-availability` - Check room availability

### Payments (Protected)
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/booking/{bookingId}` - Get payment by booking
- `POST /api/payments/failure` - Handle payment failure

## 🎨 UI Screenshots

### Home Page
- Hero section with call-to-action
- Feature highlights
- How it works section

### Room Listing
- Filter by room type
- Grid layout with room cards
- Price and availability indicators

### Room Details
- Image gallery
- Room amenities
- Date picker
- Package selection
- Price calculator

### Booking Flow
1. Select room and dates
2. Choose meal package
3. Review booking summary
4. Secure payment via Razorpay
5. Booking confirmation

## 🧪 Testing

### Test Razorpay Payment
Use these test card details:
- **Card Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date
- **Name**: Any name

### Test UPI
Use UPI ID: `success@razorpay`

## 🚀 Deployment

### Backend (Heroku/AWS)
1. Build JAR: `./mvnw clean package`
2. Deploy JAR file to your hosting provider
3. Set all environment variables
4. Configure PostgreSQL database

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Set environment variables
4. Configure redirects for SPA

## 📝 Environment Variables Summary

### Backend
```
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
MAIL_USERNAME
MAIL_PASSWORD
```

### Frontend
```
VITE_API_BASE_URL
VITE_GOOGLE_CLIENT_ID
VITE_RAZORPAY_KEY_ID
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👥 Author

Built with ❤️ by Your Name

## 🆘 Support

For issues and questions, please create an issue in the GitHub repository.

---

**Happy Coding!** 🎉

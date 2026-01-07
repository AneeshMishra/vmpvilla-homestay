# Homestay Booking Backend API

Spring Boot backend for the Homestay Booking application with Google OAuth authentication, JWT tokens, and Razorpay payment integration.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+
- Google OAuth Client ID and Secret
- Razorpay API Keys (Test mode for development)

## Setup Instructions

### 1. Database Setup

Create PostgreSQL database:
```sql
CREATE DATABASE homestay_db;
```

### 2. Environment Configuration

Create `.env` file in the backend directory (copy from `.env.example`):

```env
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your-very-secure-256-bit-secret-key-minimum-32-characters-long
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

### 3. Build and Run

```bash
# Install dependencies and build
mvn clean install

# Run the application
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/google-login` - Authenticate with Google ID token
- `GET /api/auth/health` - Health check

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/{id}` - Get room by ID

### Packages
- `GET /api/packages` - Get all meal packages

### Bookings (Requires Authentication)
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/user/{userId}` - Get user's bookings
- `GET /api/bookings/{id}` - Get booking details

### Payments (Requires Authentication)
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment signature

## Project Structure

```
src/main/java/com/homestay/booking/
├── config/          # Configuration classes (Security, CORS, Razorpay)
├── controller/      # REST API controllers
├── dto/            # Data Transfer Objects (Request/Response)
├── exception/      # Custom exceptions and global handler
├── model/          # JPA Entity models
├── repository/     # Spring Data JPA repositories
├── security/       # JWT authentication and filters
└── service/        # Business logic services
```

## Security

- JWT-based authentication
- Google OAuth 2.0 verification
- CORS configuration for frontend
- Password-less authentication
- Stateless session management

## Database Schema

Entities: User, Room, Package, Booking, Payment

See entity models in `model/` package for complete schema.

## Testing

```bash
mvn test
```

## Next Steps

1. Set up environment variables
2. Configure PostgreSQL database
3. Obtain Google OAuth credentials
4. Get Razorpay API keys
5. Run the application

For frontend integration, see `../frontend/README.md`

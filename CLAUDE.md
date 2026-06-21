# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VMP Villa Homestay is a full-stack room booking web application for a homestay property in Agra, India. Users can browse rooms, select meal packages, authenticate via Google OAuth, and pay via Razorpay.

## Commands

### Backend (run from `backend/`)
```bash
./mvnw spring-boot:run          # Start dev server on :8080
./mvnw clean install            # Build (runs tests)
./mvnw clean package -DskipTests # Build JAR without tests
./mvnw test                     # Run all tests
```

### Frontend (run from `frontend/`)
```bash
npm install     # Install dependencies
npm run dev     # Start dev server on :5173
npm run build   # Production build to dist/
npm run lint    # ESLint check
```

### Docker (run from root)
```bash
docker-compose up --build   # Full stack: PostgreSQL + backend + frontend
```

## Architecture

### Backend (`backend/src/main/java/com/homestay/booking/`)

Standard Spring Boot layered architecture: `controller` → `service` → `repository` → `model`.

**Key packages:**
- `controller/` — REST endpoints; extract the authenticated user's email from `SecurityContextHolder` and pass it to services
- `service/` — all business logic lives here
- `security/` — `JwtAuthenticationFilter` validates Bearer tokens on every request; `JwtTokenProvider` issues and parses tokens
- `config/SecurityConfig` — defines which endpoints are public vs. protected; rooms and packages are public, bookings and payments require auth

**Test mode vs. production mode** (`app.mode` env var, defaults to `test`):  
In test mode, `AuthService.authenticateTestMode()` accepts any email string directly without verifying a real Google token. This bypasses the `GoogleIdTokenVerifier`. Switch to `production` to enforce real Google OAuth.

**Pricing formula** (in `BookingService.createBooking`):
```
total = (room.pricePerNight × nights) + (package.price × nights × guests)
```

**Booking constraints:** check-in cannot be past, minimum 1 night, maximum 30 nights.

**Dual status fields:** `Booking` has both `bookingStatus` (`PENDING/CONFIRMED/CANCELLED/COMPLETED`) and `paymentStatus` (`PENDING/CREATED/COMPLETED/FAILED`). When payment completes, `PaymentService` sets `paymentStatus=COMPLETED`, which triggers `BookingService.updatePaymentStatus` to also set `bookingStatus=CONFIRMED`.

**Payment flow:** Create booking → `POST /api/payments/create-order` (creates Razorpay order) → frontend launches Razorpay checkout widget → `POST /api/payments/verify` (HMAC-SHA256 signature verification) → confirmation emails sent.

**Database:** Hibernate `ddl-auto=update` manages schema. `data.sql` seeds 3 meal packages (CP/MAP/AP) and 6 sample rooms on startup using `ON CONFLICT DO NOTHING`.

### Frontend (`frontend/src/`)

**Auth flow:** `AuthContext` provides `{ user, token, isAuthenticated, login, logout }`. `login()` sends Google credential to `POST /api/auth/google-login`, stores returned JWT and user object in `localStorage`. The Axios instance in `utils/api.js` reads the token from localStorage on every request. A 401 response auto-clears auth and redirects to `/login`.

**Route protection:** `ProtectedRoute` wraps booking-related routes (`/booking/new`, `/booking/success`, `/my-bookings`). Public routes: `/`, `/rooms`, `/rooms/:id`, `/login`, `/contact`.

**Service layer** (`services/`): thin wrappers around the shared Axios instance; one file per domain (auth, room, booking, package, payment). Never call `axios` directly — always import from `utils/api.js`.

**Constants** (`utils/constants.js`): Contains `HOMESTAY_INFO` with VMP Villa's real contact details, address, and brand colors. Update here for any property info changes.

**Vite proxy:** In dev, requests to `/api/*` are proxied to `http://localhost:8080`, so the frontend `.env` value `VITE_API_BASE_URL` only matters for production builds.

## Environment Variables

### Backend (`backend/.env` or env vars)
| Variable | Purpose |
|---|---|
| `APP_MODE` | `test` (default, skips Google OAuth) or `production` |
| `DB_URL` | PostgreSQL JDBC URL |
| `DB_USERNAME` / `DB_PASSWORD` | Database credentials |
| `JWT_SECRET` | Min 32-character secret for HMAC-SHA256 |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Required in production mode |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay credentials |
| `EMAIL_USERNAME` / `EMAIL_PASSWORD` | Gmail SMTP (use App Password) |

### Frontend (`frontend/.env`)
| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Backend URL (default: `http://localhost:8080/api`) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID for the login button |
| `VITE_RAZORPAY_KEY_ID` | Razorpay public key for the checkout widget |

## API Endpoints

Public: `GET /api/rooms/**`, `GET /api/packages/**`, `POST /api/auth/google-login`  
Protected (JWT required): `POST/GET /api/bookings/**`, `POST/GET /api/payments/**`

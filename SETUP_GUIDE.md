# 🚀 Quick Setup Guide - Homestay Booking Application

## ⚡ Quick Start (Development)

### Step 1: Setup Backend

```bash
# Navigate to backend
cd backend

# Create database
psql -U postgres
CREATE DATABASE homestay_booking;
\q

# Create .env file (or set environment variables)
cp .env.example .env
# Edit .env with your credentials

# Run application
./mvnw spring-boot:run
# OR on Windows
mvnw.cmd spring-boot:run
```

Backend will be available at: `http://localhost:8080`

### Step 2: Setup Frontend

```bash
# Navigate to frontend (in a new terminal)
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your API keys

# Run development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## 🔑 Required Credentials

### 1. Google OAuth Setup (5 minutes)

1. Visit: https://console.cloud.google.com/
2. Create new project: "Homestay Booking"
3. Enable "Google+ API"
4. Create OAuth Client ID:
   - Type: Web application
   - Authorized origins: `http://localhost:5173`
   - Authorized redirects: `http://localhost:5173`
5. Copy **Client ID** and **Client Secret**

### 2. Razorpay Setup (5 minutes)

1. Visit: https://razorpay.com/
2. Sign up for account
3. Go to: Settings → API Keys → Generate Test Keys
4. Copy **Key ID** and **Key Secret**

### 3. Gmail SMTP Setup (3 minutes)

1. Enable 2FA on your Gmail account
2. Visit: https://myaccount.google.com/security
3. Go to: 2-Step Verification → App passwords
4. Generate password for "Mail"
5. Copy the **16-character password**

---

## 📝 Environment Configuration

### Backend `.env`

Create `backend/.env`:

```properties
# Database Configuration
DB_URL=jdbc:postgresql://localhost:5432/homestay_booking
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password

# JWT Secret (Generate random 256-bit string)
JWT_SECRET=your-secret-key-at-least-256-bits-long-random-string

# Google OAuth
GOOGLE_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_client_secret

# Razorpay Keys
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Gmail SMTP
MAIL_USERNAME=your.email@gmail.com
MAIL_PASSWORD=your-16-char-app-password
```

### Frontend `.env`

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_GOOGLE_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

---

## ✅ Verification Checklist

### Backend Health Check

1. Visit: http://localhost:8080/api/auth/health
2. Should return: `{"status":"UP"}`

### Frontend Health Check

1. Visit: http://localhost:5173
2. Should see homepage with navigation

### Database Check

```bash
psql -U postgres -d homestay_booking
\dt
# Should show: bookings, meal_packages, payments, rooms, users
SELECT * FROM meal_packages;
# Should show 3 packages (CP, MAP, AP)
```

---

## 🧪 Testing the Application

### Test Login

1. Go to http://localhost:5173/login
2. Click "Sign in with Google"
3. Select your Google account
4. Should redirect to rooms page

### Test Booking Flow

1. Go to "Rooms" page
2. Click "View Details" on any room
3. Select check-in and check-out dates
4. Select meal package
5. Click "Book Now"
6. Review booking details
7. Click "Confirm & Pay"

### Test Payment (Razorpay Test Mode)

Use these test credentials:

**Test Card:**
- Card: `4111 1111 1111 1111`
- CVV: `123`
- Expiry: Any future date
- Name: Any name

**Test UPI:**
- UPI ID: `success@razorpay`

---

## 🐛 Troubleshooting

### Backend Issues

**Issue: Cannot connect to database**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql
# OR on Windows
# Check Services → PostgreSQL

# Test connection
psql -U postgres -d homestay_booking
```

**Issue: Port 8080 already in use**
```bash
# Find process using port 8080
lsof -i :8080  # Mac/Linux
netstat -ano | findstr :8080  # Windows

# Kill the process or change port in application.properties
server.port=8081
```

**Issue: Google login fails**
- Verify Google Client ID in both backend and frontend
- Check authorized origins include `http://localhost:5173`
- Ensure Google+ API is enabled

### Frontend Issues

**Issue: Cannot connect to backend**
- Verify backend is running on port 8080
- Check VITE_API_BASE_URL in `.env`
- Check browser console for CORS errors

**Issue: Payment popup doesn't appear**
- Check Razorpay keys are correct
- Verify `https://checkout.razorpay.com/v1/checkout.js` loads
- Check browser console for errors

**Issue: npm install fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## 📦 Sample Data

The application comes pre-loaded with:

### Rooms (6 rooms)
- 2 Standard rooms (₹1,500 - ₹2,000/night)
- 2 Deluxe rooms (₹3,000 - ₹3,500/night)
- 2 Suite rooms (₹5,000 - ₹6,000/night)

### Meal Packages
- **CP** (Continental Plan): Breakfast - ₹500/person/night
- **MAP** (Modified American Plan): Breakfast + Dinner - ₹1,000/person/night
- **AP** (American Plan): All Meals - ₹1,500/person/night

---

## 🔐 Security Notes

### For Development
- Use test mode for Razorpay
- JWT secret can be any random string
- Gmail app password for email notifications

### For Production
- Use strong JWT secret (256-bit minimum)
- Switch to Razorpay live keys
- Use proper email service (SendGrid, AWS SES)
- Enable HTTPS
- Update CORS origins
- Use environment-specific configs

---

## 📚 API Documentation

Once backend is running, API endpoints are available at:

**Base URL:** `http://localhost:8080/api`

### Public Endpoints
- `GET /rooms` - List all rooms
- `GET /packages` - List meal packages

### Protected Endpoints (Require JWT)
- `POST /bookings` - Create booking
- `GET /bookings/my-bookings` - User's bookings
- `POST /payments/create-order` - Create payment
- `POST /payments/verify` - Verify payment

**Authentication Header:**
```
Authorization: Bearer <jwt-token>
```

---

## 🎯 Next Steps

1. ✅ Complete setup and verify application works
2. 📱 Test complete booking flow
3. 💳 Test payment with test credentials
4. 📧 Verify email notifications
5. 🎨 Customize styling/branding
6. 🚀 Deploy to production

---

## 💡 Tips

- Use separate Google/Razorpay accounts for dev/prod
- Keep test keys in `.env`, never commit to git
- Test email notifications with your own email first
- Review logs for any errors: `backend/logs/` or console

---

## 🆘 Need Help?

- Check console logs (Frontend: Browser, Backend: Terminal)
- Verify all environment variables are set correctly
- Ensure all services are running (PostgreSQL, Backend, Frontend)
- Check README.md for detailed documentation

---

**Happy Coding!** 🎉

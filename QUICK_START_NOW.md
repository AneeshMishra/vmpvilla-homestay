# Quick Start Guide - Run Your App NOW!

## ✅ All Code Issues Fixed!

All compilation errors have been resolved:
- ✅ Optional<Payment> errors fixed in PaymentService
- ✅ Lambda variable error fixed in AuthService
- ✅ Backend compiles successfully

---

## 🚀 Start Your App (3 Steps)

### Step 1: Create Database

**Choose ONE method:**

#### Method A: Using pgAdmin (Easiest - Visual)
1. Open **pgAdmin** from Start Menu
2. Connect to PostgreSQL (localhost)
3. Right-click **Databases** → **Create** → **Database**
4. Name: `homestay_booking`
5. Click **Save**

#### Method B: Using Command Line
```cmd
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres
```
Enter your PostgreSQL password, then:
```sql
CREATE DATABASE homestay_booking;
\q
```

#### Method C: Double-click Script
Double-click `setup-database.bat` and enter password when prompted.

---

### Step 2: Start Backend

Open **Terminal 1** (PowerShell or CMD):

```cmd
cd C:\Users\Hp\Documents\homestay-booking\backend
.\run-backend.bat
```

**Wait for**: `Started BookingApplication in X.XXX seconds`

This means backend is running at **http://localhost:8080**

---

### Step 3: Start Frontend

Open **Terminal 2** (new terminal):

```cmd
cd C:\Users\Hp\Documents\homestay-booking\frontend

# First time only - install dependencies
npm install

# Start development server
npm run dev
```

**Wait for**: `Local: http://localhost:5173`

---

## ✅ Access Your App

Open browser and go to: **http://localhost:5173**

You should see your Homestay Booking application!

---

## 🧪 Test Login (Test Mode)

Since we're in test mode (Google OAuth disabled), you can login with **any email**:

1. Click "Login" or "Sign In"
2. Enter any email (e.g., `test@example.com`, `john@homestay.com`, etc.)
3. Click "Sign In"
4. You'll be automatically logged in!

The system will create a test user for you automatically.

---

## 🔧 Troubleshooting

### Backend won't start?

**Error: "Connection refused" or "database does not exist"**
- Database not created → Go back to Step 1

**Error: "password authentication failed"**
- Wrong password in `backend\.env`
- Open `backend\.env` and update `DB_PASSWORD=postgres` to your actual password

**Error: "Port 8080 already in use"**
```cmd
# Check what's using port 8080
netstat -ano | findstr :8080
# Kill the process or change port in application.properties
```

### Frontend won't start?

**Error: "npm not found"**
- Node.js not installed
- Install from: https://nodejs.org/

**Error: "Cannot find module"**
```cmd
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

**Error: "Port 5173 already in use"**
- Close other Vite/React apps
- Or use different port: `npm run dev -- --port 3001`

---

## 📊 What You Get

### Pages Available:
- **Home** (`/`) - Landing page with hero section
- **Login** (`/login`) - Test mode login (any email works)
- **Rooms** (`/rooms`) - Browse available rooms
- **Room Details** (`/rooms/:id`) - View room details
- **Booking** (`/booking/:roomId`) - Create a booking
- **My Bookings** (`/my-bookings`) - View your bookings
- **Profile** (`/profile`) - User profile

### API Endpoints:
- `GET /api/rooms` - List all rooms
- `GET /api/packages` - List meal packages
- `POST /api/bookings` - Create booking
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/auth/google` - Google OAuth (disabled in test mode)
- `POST /api/auth/test` - Test mode login

---

## 🎯 Quick Command Reference

```cmd
# Check if PostgreSQL is running
sc query postgresql-x64-15

# Check if database exists
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -l

# Stop backend (in backend terminal)
Ctrl + C

# Stop frontend (in frontend terminal)
Ctrl + C

# Rebuild backend
cd backend
.\mvnw.cmd clean install

# Clear frontend cache
cd frontend
rm -rf node_modules
npm install
```

---

## 🔄 Daily Development Workflow

```cmd
# Morning startup (2 terminals)

# Terminal 1: Backend
cd C:\Users\Hp\Documents\homestay-booking\backend
.\run-backend.bat

# Terminal 2: Frontend
cd C:\Users\Hp\Documents\homestay-booking\frontend
npm run dev

# That's it! Both running.
```

---

## 📝 Environment Files

### Backend (.env)
Location: `backend\.env`

```env
# Database (update password if different)
DB_URL=jdbc:postgresql://localhost:5432/homestay_booking
DB_USERNAME=postgres
DB_PASSWORD=postgres

# App Mode (test = no Google OAuth required)
APP_MODE=test

# JWT Secret (change in production)
JWT_SECRET=your-super-secret-jwt-key-minimum-256-bits-long-change-in-production

# Google OAuth (not used in test mode)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Razorpay (not used until payment testing)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email (not used until email testing)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Frontend (.env)
Location: `frontend\.env`

```env
# App Mode (test = shows email login form)
VITE_APP_MODE=test

# Backend API
VITE_API_BASE_URL=http://localhost:8080/api

# Google OAuth (not used in test mode)
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Razorpay (not used until payment testing)
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

---

## 🎉 You're Ready!

1. ✅ Database created
2. ✅ Backend running (Terminal 1)
3. ✅ Frontend running (Terminal 2)
4. ✅ App accessible at http://localhost:5173
5. ✅ Test login working (any email)

**Start building features!** 🚀

---

## 📚 Next Steps

Once your app is running:

1. **Test the features**:
   - Browse rooms
   - Create a booking
   - View your bookings

2. **Add sample data** (optional):
   - Use pgAdmin to add rooms and packages
   - Or create SQL scripts to seed data

3. **Enable production features later**:
   - Google OAuth (update GOOGLE_CLIENT_ID)
   - Razorpay payment (update RAZORPAY_KEY_ID)
   - Email notifications (update EMAIL settings)
   - Change APP_MODE to "production" in both .env files

4. **Docker setup** (optional):
   - Follow [START_HERE_DOCKER.md](START_HERE_DOCKER.md)
   - Easier deployment and production setup

---

## 🆘 Still Having Issues?

Check these files for help:
- [BUILD_AND_RUN.md](BUILD_AND_RUN.md) - Detailed build instructions
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete setup guide
- [TEST_MODE_GUIDE.md](TEST_MODE_GUIDE.md) - Test mode documentation

Or check the console output for specific error messages.

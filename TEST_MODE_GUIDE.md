# 🧪 Test Mode Guide - No Google OAuth Required

## Overview

The application now supports **Test Mode** for local development, which disables Google OAuth and allows simple email-based authentication. This makes it easy to test the application without setting up Google OAuth credentials.

---

## 🎯 Quick Start (Test Mode)

### 1. Backend Configuration

Edit `backend\.env` - ensure this line is set:

```properties
# Set to 'test' for local development
APP_MODE=test
```

### 2. Frontend Configuration

Edit `frontend\.env` - ensure this line is set:

```env
# Set to 'test' for local development
VITE_APP_MODE=test
```

### 3. Run the Application

**Backend:**
```bash
cd backend
mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Login

1. Go to http://localhost:5173/login
2. Enter any email address (e.g., `john@example.com`)
3. Click "Sign In"
4. Or use Quick Login buttons for instant access

**That's it!** No Google OAuth setup required! 🎉

---

## 📋 Test Mode vs Production Mode

### Test Mode (`APP_MODE=test`)

**Backend:**
- ✅ Simple email-based authentication
- ✅ No Google OAuth verification needed
- ✅ Automatically creates user accounts
- ✅ JWT tokens still generated for security
- ✅ All features work normally

**Frontend:**
- ✅ Email input form instead of Google button
- ✅ Quick login buttons for convenience
- ✅ Test mode indicator shown
- ✅ No Google OAuth library needed

**What Works:**
- ✓ User authentication with any email
- ✓ Room browsing and booking
- ✓ Payment flow (with test Razorpay keys)
- ✓ Booking management
- ✓ All API endpoints

**What's Disabled:**
- ✗ Google OAuth verification
- ✗ Email notifications (optional - can be configured)

### Production Mode (`APP_MODE=production`)

**Backend:**
- ✅ Full Google OAuth 2.0 verification
- ✅ Email verification required
- ✅ Secure token validation
- ✅ Production-grade authentication

**Frontend:**
- ✅ Google Sign-In button
- ✅ OAuth consent flow
- ✅ Production security

**Required:**
- Google OAuth Client ID
- Google OAuth Client Secret
- Verified email addresses

---

## 🔧 Configuration Details

### Backend Environment Variables

```properties
# backend\.env

# Application Mode
APP_MODE=test                    # or 'production'

# Database (Required for both modes)
DB_URL=jdbc:postgresql://localhost:5432/homestay_booking
DB_USERNAME=postgres
DB_PASSWORD=postgres

# JWT Secret (Required for both modes)
JWT_SECRET=your-super-secret-jwt-key-minimum-256-bits

# Google OAuth (Only required for production mode)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Razorpay (Optional for test, use test keys)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email (Optional for both modes)
MAIL_USERNAME=your.email@gmail.com
MAIL_PASSWORD=your-app-password
```

### Frontend Environment Variables

```env
# frontend\.env

# Application Mode
VITE_APP_MODE=test               # or 'production'

# API Base URL
VITE_API_BASE_URL=http://localhost:8080/api

# Google OAuth (Only required for production mode)
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Razorpay (Optional, use test keys for testing)
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

---

## 🎭 How Test Mode Works

### Backend Authentication Flow

1. **User submits email** via login form
2. **Backend receives email** in `token` field
3. **AuthService checks APP_MODE**
   - If `test`: Creates/retrieves user by email
   - If `production`: Verifies Google OAuth token
4. **JWT token generated** for the user
5. **User logged in** with full access

### Code Changes

**AuthService.java:**
```java
@Value("${app.mode:test}")
private String appMode;

@Transactional
public AuthResponse authenticateWithGoogle(GoogleLoginRequest request) {
    // Test mode: Simple authentication
    if ("test".equalsIgnoreCase(appMode)) {
        return authenticateTestMode(request.getToken());
    }

    // Production mode: Google OAuth verification
    // ... existing Google OAuth code ...
}

@Transactional
public AuthResponse authenticateTestMode(String email) {
    // Create/get user with provided email
    // Generate JWT token
    // Return authentication response
}
```

**Login.jsx:**
```jsx
const APP_MODE = import.meta.env.VITE_APP_MODE || 'test';
const IS_TEST_MODE = APP_MODE === 'test';

// Show email form in test mode
{IS_TEST_MODE ? (
  <EmailLoginForm />
) : (
  <GoogleLoginButton />
)}
```

---

## 👥 Test Users

In test mode, you can login with **any email address**. The system will automatically create a user account.

### Pre-configured Quick Login Options:

| Email | Name | Purpose |
|-------|------|---------|
| john@example.com | John | Default test user |
| jane@example.com | Jane | Second test user |
| admin@example.com | Admin | Admin user (if needed) |

Or enter any email like:
- `test@homestay.com`
- `alice@wonderland.com`
- `bob@builder.com`

---

## 🔄 Switching Modes

### Switch to Test Mode

**Backend:**
```properties
APP_MODE=test
```

**Frontend:**
```env
VITE_APP_MODE=test
```

**Restart both services** to apply changes.

### Switch to Production Mode

**Backend:**
1. Set `APP_MODE=production`
2. Configure Google OAuth credentials
3. Restart backend

**Frontend:**
1. Set `VITE_APP_MODE=production`
2. Configure Google Client ID
3. Restart frontend (npm run dev)

---

## 🧪 Testing Scenarios

### Test Complete Booking Flow

1. **Login** with test email
2. **Browse rooms** at /rooms
3. **Select a room** and click "View Details"
4. **Choose dates** and meal package
5. **Click "Book Now"**
6. **Review booking** details
7. **Click "Confirm & Pay"**
8. **Complete payment** (use Razorpay test cards)
9. **View confirmation** page
10. **Check bookings** in "My Bookings"

### Test Multiple Users

1. Login as `john@example.com`
2. Create a booking
3. Logout
4. Login as `jane@example.com`
5. Create another booking
6. Verify bookings are user-specific

---

## 🚀 Deployment to Production

### Steps to Enable Production Mode:

1. **Get Google OAuth Credentials**
   - Visit: https://console.cloud.google.com/
   - Create OAuth Client ID
   - Add authorized origins: your-domain.com
   - Add redirect URIs: your-domain.com/login

2. **Update Backend Configuration**
   ```properties
   APP_MODE=production
   GOOGLE_CLIENT_ID=your-actual-client-id
   GOOGLE_CLIENT_SECRET=your-actual-secret
   ```

3. **Update Frontend Configuration**
   ```env
   VITE_APP_MODE=production
   VITE_GOOGLE_CLIENT_ID=your-actual-client-id
   ```

4. **Test Google Login**
   - Verify Google button appears
   - Test login flow
   - Confirm OAuth works

5. **Deploy**
   - Build and deploy backend
   - Build and deploy frontend
   - Update CORS settings for production domain

---

## ⚙️ Advanced Configuration

### Custom Test Users

You can pre-create test users in the database:

```sql
INSERT INTO users (email, name, google_id, role, created_at, updated_at)
VALUES
  ('admin@homestay.com', 'Admin User', 'test-admin', 'ADMIN', NOW(), NOW()),
  ('staff@homestay.com', 'Staff User', 'test-staff', 'USER', NOW(), NOW());
```

### Disable Email Notifications in Test Mode

In `EmailService.java`, check app mode before sending:

```java
@Value("${app.mode:test}")
private String appMode;

public void sendEmail(...) {
    if ("production".equalsIgnoreCase(appMode)) {
        // Send email
    } else {
        log.info("Test mode: Email not sent");
    }
}
```

---

## 🐛 Troubleshooting

### Login Shows Google Button Instead of Email Form

**Problem:** Frontend is in production mode
**Solution:** Check `frontend\.env` has `VITE_APP_MODE=test`

### Backend Rejects Email Login

**Problem:** Backend is in production mode
**Solution:** Check `backend\.env` has `APP_MODE=test`

### Changes Not Reflected

**Problem:** Need to restart services
**Solution:**
```bash
# Stop and restart backend
# Stop (Ctrl+C) and restart frontend: npm run dev
```

### Test Users Not Created

**Problem:** Database connection issue
**Solution:**
- Verify PostgreSQL is running
- Check database credentials in `backend\.env`
- Verify database `homestay_booking` exists

---

## 📊 Comparison Matrix

| Feature | Test Mode | Production Mode |
|---------|-----------|-----------------|
| **Authentication** | Email only | Google OAuth |
| **User Creation** | Automatic | On first OAuth login |
| **Security** | JWT tokens | JWT + OAuth |
| **Setup Time** | 0 minutes | 10-15 minutes |
| **Required Credentials** | None | Google OAuth |
| **Best For** | Local development | Production deployment |
| **Email Verification** | Not required | Required |
| **Test Cards** | Razorpay test mode | Real payments |

---

## 💡 Best Practices

### For Development
1. ✅ Use test mode for faster iteration
2. ✅ Use quick login buttons
3. ✅ Test with multiple test users
4. ✅ Use Razorpay test keys

### Before Production
1. ✅ Test production mode locally first
2. ✅ Verify Google OAuth works
3. ✅ Test with real Google account
4. ✅ Switch to production Razorpay keys
5. ✅ Enable email notifications

---

## 🎉 Summary

**Test Mode Benefits:**
- ⚡ **Fast setup** - no OAuth configuration
- 🔧 **Easy testing** - login with any email
- 🚀 **Quick development** - focus on features
- 🧪 **Multiple users** - test different scenarios
- 💰 **No cost** - use test payment keys

**When to Use:**
- ✅ Local development
- ✅ Feature testing
- ✅ UI/UX development
- ✅ Database testing
- ✅ API testing

**When to Switch to Production:**
- ✅ Deploying to server
- ✅ Real user testing
- ✅ Security testing
- ✅ Final QA
- ✅ Going live

---

**Ready to test?** Just set `APP_MODE=test` and start coding! 🚀

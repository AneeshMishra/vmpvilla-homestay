# Email Service Fix - Test Mode Support

## Problem Fixed

The backend was failing to start with error:
```
Error creating bean with name 'emailService': Injection of autowired dependencies failed
```

## Root Cause

The application was trying to create `JavaMailSender` bean even though email credentials were not configured. In test mode, we don't need email functionality.

## Solution Applied

### 1. Made Email Configuration Optional

**File**: `application.properties`
- Added default values to all email properties
- Email will be disabled if password is "not-configured"

```properties
spring.mail.username=${EMAIL_USERNAME:noreply@homestay.com}
spring.mail.password=${EMAIL_PASSWORD:not-configured}
```

### 2. Created Custom Email Configuration

**File**: `EmailConfig.java` (NEW)
- Returns `null` for `JavaMailSender` in test mode
- Only creates real mail sender when email is properly configured
- Excludes Spring Boot's default mail autoconfiguration

### 3. Updated EmailService

**File**: `EmailService.java`
- Made `JavaMailSender` optional with `@Autowired(required = false)`
- Added null checks before sending emails
- Logs info message instead of sending emails in test mode

### 4. Updated Main Application

**File**: `HomestayBookingApplication.java`
- Excluded `MailSenderAutoConfiguration` to prevent conflicts
- Uses our custom email configuration instead

## How It Works Now

### Test Mode (Default)
- ✅ No email server connection required
- ✅ No email credentials needed
- ✅ EmailService logs messages instead of sending emails
- ✅ App starts successfully without email configuration

### Production Mode
When you're ready to enable emails:

1. Update `backend/.env`:
```env
APP_MODE=production
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

2. Restart backend
3. Emails will be sent automatically for:
   - Booking confirmations
   - Payment receipts
   - Booking cancellations

## Email Features

### Emails Sent (when enabled):

1. **Booking Confirmation Email**
   - Sent when booking is created
   - Contains booking details, room info, dates, guests

2. **Payment Receipt Email**
   - Sent when payment is successful
   - Contains payment details, transaction ID, amount

3. **Cancellation Email**
   - Sent when booking is cancelled
   - Contains refund information (if applicable)

### Email Templates

All emails use HTML templates with:
- Professional styling
- Booking/payment details
- Contact information
- Branding

## Testing

### Test Mode (Current):
```bash
cd backend
.\run-backend.bat
```

Check logs - you'll see:
```
Email service disabled - Running in test mode or email not configured
Email service not configured (test mode) - Skipping booking confirmation email to: user@example.com
```

### Production Mode Testing:
1. Set up Gmail App Password:
   - Go to Google Account → Security
   - Enable 2-Factor Authentication
   - Create App Password
   - Use that password in EMAIL_PASSWORD

2. Update .env with real credentials

3. Test by creating a booking

## What Changed

### Files Modified:
- ✅ `application.properties` - Made email properties optional
- ✅ `EmailService.java` - Added null checks
- ✅ `HomestayBookingApplication.java` - Excluded mail autoconfiguration

### Files Created:
- ✅ `EmailConfig.java` - Custom email configuration

## No Breaking Changes

- All existing functionality works
- Emails are simply skipped in test mode
- Can enable anytime by updating credentials
- No code changes needed to switch modes

---

Your backend should now start successfully without any email configuration! 🎉

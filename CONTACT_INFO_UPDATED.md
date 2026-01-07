# VMP Villa Contact Information - Updated ✅

## Contact Details Applied

Your VMP Villa contact information has been successfully updated throughout the application!

### 📞 Contact Information

**Phone:** +91-9258555345
**Email:** support@vmpvilla.in
**Website:** https://www.vmpvilla.in

---

## ✅ Files Updated

### 1. Frontend Constants
**File:** `frontend/src/utils/constants.js`
**Lines:** 20-21

```javascript
phone: '+91-9258555345',
email: 'support@vmpvilla.in',
```

This updates contact info across:
- ✅ Home page footer
- ✅ Contact page
- ✅ All clickable phone/email links
- ✅ Contact form
- ✅ Any other components using HOMESTAY_INFO

### 2. Backend Environment
**File:** `backend/.env`
**Line:** 25

```env
EMAIL_USERNAME=support@vmpvilla.in
```

This sets the email for:
- ✅ Booking confirmation emails (when enabled)
- ✅ Payment receipt emails (when enabled)
- ✅ System notifications (when enabled)

---

## 📱 Where Contact Info Appears

Your contact details now show up in:

### Home Page (Bottom Section)
```
📍 Address: A-73, KPS Town, Agra
📞 Phone: +91-9258555345
✉️ Email: support@vmpvilla.in
```

### Contact Page
- **Phone section:** Clickable link to call +91-9258555345
- **Email section:** Clickable link to email support@vmpvilla.in
- **Contact form:** Replies will go to support@vmpvilla.in

### All Pages
When users click phone or email, it will:
- 📞 Phone: Opens dialer with +91-9258555345
- ✉️ Email: Opens email client to support@vmpvilla.in

---

## 🔄 Test Your Changes

### 1. Start Frontend
```bash
cd frontend
npm run dev
```

### 2. Visit Pages
- **Home:** http://localhost:5173/ (scroll to bottom)
- **Contact:** http://localhost:5173/contact

### 3. Test Links
- Click phone number → Should open dialer
- Click email → Should open email client

---

## 📧 Email Configuration (Optional)

To enable actual email sending (booking confirmations, etc.):

### For Gmail:
1. **Enable 2-Factor Authentication** on support@vmpvilla.in
2. **Create App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Generate app password
   - Copy the 16-character password

3. **Update backend/.env:**
```env
EMAIL_PASSWORD=your-16-char-app-password
```

4. **Change APP_MODE to production** (when ready):
```env
APP_MODE=production
```

5. **Restart backend**

### For Other Email Providers:
Update in `backend/.env`:
```env
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_USERNAME=support@vmpvilla.in
EMAIL_PASSWORD=your-password
```

---

## 🎯 Current Status

### ✅ Working Now (Test Mode):
- Phone number displays correctly: +91-9258555345
- Email displays correctly: support@vmpvilla.in
- All links are clickable
- Contact form shows correct info

### ⏳ Needs Email Password (For Production):
- Booking confirmation emails
- Payment receipt emails
- System notifications

**Note:** In test mode, emails are logged but not sent. This is perfect for development!

---

## 🔐 Security Note

The `.env` file contains:
```env
EMAIL_USERNAME=support@vmpvilla.in
EMAIL_PASSWORD=your-email-app-password  # ← Add real password here
```

**Important:**
- ⚠️ Never commit `.env` to Git (it's in .gitignore)
- ✅ Use app-specific passwords, not your actual email password
- ✅ Keep credentials secure

---

## 🎉 Summary

Your VMP Villa contact information is now live!

**Updated:**
- ✅ Phone: +91-9258555345
- ✅ Email: support@vmpvilla.in

**Visible on:**
- ✅ Home page footer
- ✅ Contact page
- ✅ All navigation
- ✅ Click-to-call and click-to-email working

**Next Steps (Optional):**
1. Test the website thoroughly
2. Add email password if you want email notifications
3. Add real room images
4. Create database and add room data
5. Start taking bookings!

---

## 📞 Quick Contact Test

Visit: http://localhost:5173/contact

You should see:
- Phone: **+91-9258555345** (clickable)
- Email: **support@vmpvilla.in** (clickable)
- Contact form ready to receive messages

Perfect! 🎊

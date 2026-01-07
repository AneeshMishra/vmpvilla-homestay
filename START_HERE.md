# 🚀 START HERE - Run Your Application

## ✅ Prerequisites Status

- ✓ Java 17 installed
- ✓ PostgreSQL 15 installed & running
- ✓ Node.js & npm installed
- ✓ Frontend dependencies installed
- ✓ Test mode configured (no Google OAuth needed)

**You're ready to run!**

---

## 📝 Step-by-Step Instructions

### **Step 1: Create Database** (One-time setup)

**Option A: Automated Script**
```cmd
setup-database.bat
```
Enter password when prompted (default: `postgres`)

**Option B: Manual Command**
```cmd
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -c "CREATE DATABASE homestay_booking;"
```

---

### **Step 2: Start Backend**

**Option A: Using Run Script (Recommended)**
```cmd
cd backend
run-backend.bat
```

**Option B: Using Maven Wrapper**
```cmd
cd backend
mvnw.cmd spring-boot:run
```

**Option C: Direct Maven (if installed)**
```cmd
cd backend
mvn spring-boot:run
```

**Expected Output:**
```
Google OAuth disabled - Test mode
Hibernate: create table if not exists users ...
Started HomestayBookingApplication in X seconds
```

**Keep this terminal open!**

---

### **Step 3: Start Frontend** (New Terminal)

```cmd
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in X ms
➜  Local:   http://localhost:5173/
```

---

### **Step 4: Open Application**

**Open your browser:**
- **Application:** http://localhost:5173
- **Login Page:** http://localhost:5173/login

**Test Login:**
1. Enter any email: `john@example.com`
2. Click "Sign In" or use Quick Login buttons
3. Start browsing rooms!

---

## 🎯 Quick Commands Summary

```cmd
# 1. Create database (one-time)
setup-database.bat

# 2. Start backend (Terminal 1)
cd backend
run-backend.bat

# 3. Start frontend (Terminal 2)
cd frontend
npm run dev

# 4. Open browser
start http://localhost:5173
```

---

## 🐛 Troubleshooting

### **Error: "mvnw is not recognized"**

**Solution:** Use the run script instead:
```cmd
cd backend
run-backend.bat
```

This script automatically sets JAVA_HOME and runs Maven.

---

### **Error: "Cannot connect to database"**

**Check PostgreSQL is running:**
```cmd
sc query postgresql-x64-15
```

**Should show:** `STATE: 4 RUNNING`

**If stopped, start it:**
```cmd
net start postgresql-x64-15
```

**Create database if not exists:**
```cmd
setup-database.bat
```

---

### **Error: "Port 8080 already in use"**

**Find and kill process:**
```cmd
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

---

### **Error: "Port 5173 already in use"**

**Find and kill process:**
```cmd
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

### **Error: "JAVA_HOME not set"**

**Use the run script:**
```cmd
cd backend
run-backend.bat
```

It automatically sets JAVA_HOME.

**Or set manually:**
```cmd
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
```

---

## 📊 Application URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Main application |
| **Backend API** | http://localhost:8080/api | REST API |
| **Health Check** | http://localhost:8080/api/auth/health | Backend health status |
| **Login** | http://localhost:5173/login | Login page (test mode) |
| **Rooms** | http://localhost:5173/rooms | Browse rooms |
| **My Bookings** | http://localhost:5173/my-bookings | View bookings |

---

## 🎓 Test the Application

### **1. Login**
- Go to http://localhost:5173/login
- Enter: `john@example.com`
- Click "Sign In"

### **2. Browse Rooms**
- Filter by room type
- View room details
- Check prices and amenities

### **3. Make a Booking**
- Select a room
- Choose dates and meal package
- Click "Book Now"
- Review booking summary

### **4. Test Payment**
- Use Razorpay test card: `4111 1111 1111 1111`
- CVV: `123`, Expiry: Any future date
- Complete payment

### **5. View Bookings**
- Go to "My Bookings"
- See your booking details
- Try cancelling a booking

---

## 💡 Pro Tips

1. **Keep both terminals open** while using the app
2. **Backend logs** show all API requests
3. **Frontend hot-reloads** on code changes
4. **Test with multiple users** - use different emails
5. **Check database** with pgAdmin to see data

---

## 🎉 Success Indicators

**Backend is ready when you see:**
```
Google OAuth disabled - Test mode
Started HomestayBookingApplication in X seconds
```

**Frontend is ready when you see:**
```
➜  Local:   http://localhost:5173/
```

**Login works when:**
- Email form is shown (not Google button)
- "Test Mode Enabled" banner is visible
- You can login with any email

---

## 📚 Next Steps

Once everything is working:

1. **Test all features** - rooms, booking, payment
2. **Try different users** - multiple email addresses
3. **Check "My Bookings"** - view and cancel
4. **Customize** - modify code as needed
5. **Deploy** - enable production mode with real OAuth

---

## 🔄 Stop the Application

**Stop Backend:**
- Press `Ctrl + C` in backend terminal

**Stop Frontend:**
- Press `Ctrl + C` in frontend terminal

---

## 🆘 Need More Help?

**Documentation:**
- [TEST_MODE_GUIDE.md](TEST_MODE_GUIDE.md) - Complete test mode guide
- [BUILD_AND_RUN.md](BUILD_AND_RUN.md) - Detailed build instructions
- [READY_TO_RUN.md](READY_TO_RUN.md) - Quick start guide

**Common Questions:**
- **No Google OAuth needed?** ✓ Correct, test mode doesn't require it
- **Real payments?** ✗ Use Razorpay test cards
- **Multiple users?** ✓ Use different emails
- **Production ready?** Set `APP_MODE=production` when deploying

---

**Ready? Start with Step 1!** 🚀

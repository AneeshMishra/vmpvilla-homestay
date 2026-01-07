# 🚀 Build and Run Guide - Homestay Booking Application

## Prerequisites Check

### 1. Java Installation
```bash
java -version
```
**Required:** Java 17 or higher
**Download:** https://adoptium.net/ (if not installed)

### 2. Node.js Installation
```bash
node --version
npm --version
```
**Required:** Node.js 18+
**Download:** https://nodejs.org/ (if not installed)

### 3. PostgreSQL Installation
```bash
psql --version
```
**Required:** PostgreSQL 12+
**Download:** https://www.postgresql.org/download/ (if not installed)

---

## 🗄️ Database Setup

### Step 1: Create Database

**Windows (using psql):**
```cmd
psql -U postgres
```

**In psql console:**
```sql
CREATE DATABASE homestay_booking;
\q
```

**Verify database:**
```cmd
psql -U postgres -l
```
You should see `homestay_booking` in the list.

---

## ⚙️ Configuration Setup

### Step 1: Configure Backend Environment

Edit `backend\.env` file with your credentials:

```properties
# Database Configuration
DB_URL=jdbc:postgresql://localhost:5432/homestay_booking
DB_USERNAME=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD

# JWT Secret (Use a random 256-bit string)
JWT_SECRET=your-super-secret-jwt-key-minimum-256-bits-long-change-in-production

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Razorpay Keys
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Gmail SMTP
MAIL_USERNAME=your.email@gmail.com
MAIL_PASSWORD=your-16-char-app-password
```

### Step 2: Configure Frontend Environment

Edit `frontend\.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

---

## 📦 Build and Run

### Option 1: Using Maven (If Maven is installed)

#### Backend:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

#### Frontend (in new terminal):
```bash
cd frontend
npm install
npm run dev
```

### Option 2: Using IDE (Recommended for Windows)

#### For Backend (IntelliJ IDEA / Eclipse / VS Code):

**IntelliJ IDEA:**
1. Open `backend` folder
2. Wait for Maven to download dependencies
3. Find `HomestayBookingApplication.java`
4. Right-click → Run 'HomestayBookingApplication'

**VS Code with Java Extension Pack:**
1. Open `backend` folder
2. Install "Extension Pack for Java" if not installed
3. Press `F5` or click "Run" → "Start Debugging"

**Eclipse:**
1. File → Import → Maven → Existing Maven Projects
2. Select `backend` folder
3. Right-click on project → Run As → Spring Boot App

#### For Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Option 3: Using Gradle (Alternative)

If you prefer Gradle, create `backend/build.gradle`:

```gradle
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.2.1'
    id 'io.spring.dependency-management' version '1.1.4'
}

group = 'com.homestay'
version = '1.0.0'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-mail'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
    implementation 'org.postgresql:postgresql:42.7.1'
    implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
    implementation 'io.jsonwebtoken:jjwt-impl:0.11.5'
    implementation 'io.jsonwebtoken:jjwt-jackson:0.11.5'
    implementation 'com.google.api-client:google-api-client:2.2.0'
    implementation 'com.razorpay:razorpay-java:1.4.3'
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

tasks.named('test') {
    useJUnitPlatform()
}
```

Then run:
```bash
cd backend
gradle clean build
gradle bootRun
```

---

## ✅ Verify Installation

### Backend Health Check
Open browser: http://localhost:8080/api/auth/health

**Expected Response:**
```json
{
  "status": "UP",
  "service": "Auth Service"
}
```

### Frontend Check
Open browser: http://localhost:5173

You should see the homepage.

### Database Check
```bash
psql -U postgres -d homestay_booking
```

In psql:
```sql
\dt
SELECT * FROM meal_packages;
```

You should see 3 packages (CP, MAP, AP).

---

## 🎯 Quick Test

### 1. Test Homepage
- Go to http://localhost:5173
- Should see landing page

### 2. Test Room Listing
- Click "Browse Rooms"
- Should see available rooms

### 3. Test Login (if configured)
- Click "Login"
- Click "Sign in with Google"
- If Google OAuth is configured, login flow should work

---

## 🐛 Common Issues

### Issue 1: Port Already in Use

**Backend (Port 8080):**
```bash
# Find process
netstat -ano | findstr :8080

# Kill process (replace PID)
taskkill /PID <PID> /F
```

**Frontend (Port 5173):**
```bash
# Find process
netstat -ano | findstr :5173

# Kill process
taskkill /PID <PID> /F
```

### Issue 2: Database Connection Failed

Check PostgreSQL is running:
```bash
# Windows
# Check Services → postgresql-x64-XX should be running

# Or restart it
net stop postgresql-x64-XX
net start postgresql-x64-XX
```

### Issue 3: Maven Dependencies Not Downloading

Delete and rebuild:
```bash
# Delete .m2 repository cache
rmdir /s %USERPROFILE%\.m2\repository

# Rebuild
cd backend
mvn clean install -U
```

### Issue 4: Frontend Build Errors

```bash
cd frontend
# Clear node_modules
rmdir /s node_modules
del package-lock.json

# Reinstall
npm install
```

---

## 📊 Application URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | React application |
| Backend API | http://localhost:8080/api | REST API |
| Health Check | http://localhost:8080/api/auth/health | Backend health |
| Rooms API | http://localhost:8080/api/rooms | Get all rooms |
| Packages API | http://localhost:8080/api/packages | Get packages |

---

## 🔧 Development Tips

### Hot Reload

**Frontend:** Automatically reloads on file changes (Vite)

**Backend:** Add Spring Boot DevTools for auto-restart:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
</dependency>
```

### View Logs

**Backend:** Check console where Spring Boot is running

**Frontend:** Check browser console (F12 → Console)

**Database:**
```bash
psql -U postgres -d homestay_booking
SELECT * FROM bookings ORDER BY created_at DESC LIMIT 10;
```

---

## 📧 Testing Email Notifications

Since email requires Gmail configuration, you can skip it for local testing:

**Option 1:** Use a test email service like Mailtrap
**Option 2:** Comment out email code temporarily
**Option 3:** Configure Gmail (see SETUP_GUIDE.md)

The application will work without email configured, you just won't receive email notifications.

---

## 🚀 Next Steps

Once both services are running:

1. ✅ Browse rooms at http://localhost:5173/rooms
2. ✅ Configure Google OAuth to enable login
3. ✅ Configure Razorpay to enable payments
4. ✅ Test complete booking flow

---

## 💡 Pro Tips

1. **Use IntelliJ IDEA Community Edition** (Free) - Best for Spring Boot
2. **Use VS Code** - Good for React development
3. **Keep both terminals open** - One for backend, one for frontend
4. **Check logs frequently** - Most errors are visible in console
5. **Use Chrome DevTools** - For frontend debugging

---

**Need Help?** Check SETUP_GUIDE.md for detailed credential setup!

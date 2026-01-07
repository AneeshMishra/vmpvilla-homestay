# ⚡ Quick Start - Install Java & PostgreSQL

You're at: `C:\Users\Hp\Documents\homestay-booking`

## 🎯 Two Ways to Install

### Option 1: Automated (5 minutes) ⭐ **RECOMMENDED**

**Open PowerShell as Administrator:**
1. Press `Win + X`
2. Click "Terminal (Admin)" or "PowerShell (Admin)"
3. Run these commands:

```powershell
cd "C:\Users\Hp\Documents\homestay-booking"
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\install-prerequisites.ps1
```

**What it does:**
- ✅ Installs Chocolatey package manager
- ✅ Installs Java 17 (Eclipse Temurin)
- ✅ Installs PostgreSQL 15
- ✅ Creates `homestay_booking` database
- ✅ Sets up environment variables

**Default credentials:**
- PostgreSQL username: `postgres`
- PostgreSQL password: `postgres`

---

### Option 2: Manual (30 minutes)

**Follow detailed guide:** [INSTALL_JAVA_POSTGRESQL.md](INSTALL_JAVA_POSTGRESQL.md)

**Summary:**
1. Download Java 17: https://adoptium.net/
2. Download PostgreSQL: https://www.postgresql.org/download/windows/
3. Install both (remember PostgreSQL password!)
4. Create database: `CREATE DATABASE homestay_booking;`

---

## ✅ After Installation

### 1. Verify Installation

Open **new** Command Prompt or PowerShell:

```cmd
java -version
```
✅ Should show: `openjdk version "17.x.x"`

```cmd
psql --version
```
✅ Should show: `psql (PostgreSQL) 15.x`

### 2. Update Configuration

Edit `backend\.env` - change this line:
```properties
DB_PASSWORD=postgres    # Use your actual PostgreSQL password
```

### 3. Run the Application

**Backend (choose one):**

**Using IntelliJ IDEA (easier):**
- Download: https://www.jetbrains.com/idea/download/
- Open `backend` folder
- Run `HomestayBookingApplication.java`

**Using Command Line:**
```cmd
cd backend
mvnw spring-boot:run
```

**Frontend (new terminal):**
```cmd
cd frontend
npm run dev
```

### 4. Access the App

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api
- Health Check: http://localhost:8080/api/auth/health

---

## 🐛 Troubleshooting

**"java is not recognized"**
- Restart terminal after installation
- Or restart computer

**"psql is not recognized"**
- Restart terminal after installation
- Or add to PATH: `C:\Program Files\PostgreSQL\15\bin`

**Can't connect to database**
- Check PostgreSQL service is running (Services → postgresql-x64-15)
- Verify password in `backend\.env`

**Port 8080 already in use**
```cmd
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| **QUICK_START.md** | This file - quick installation |
| [INSTALL_JAVA_POSTGRESQL.md](INSTALL_JAVA_POSTGRESQL.md) | Detailed manual installation |
| [BUILD_AND_RUN.md](BUILD_AND_RUN.md) | How to build and run |
| [CURRENT_STATUS.md](CURRENT_STATUS.md) | Project status |

---

## 🚀 Ready to Go?

1. ✅ Run installation script or install manually
2. ✅ Verify installations work
3. ✅ Update `backend\.env` with password
4. ✅ Run backend and frontend
5. ✅ Access http://localhost:5173

**Enjoy your Homestay Booking Application!** 🎉

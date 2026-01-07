# 📋 Installation Requirements - Homestay Booking Application

## ⚠️ Missing Prerequisites Detected

Your system needs the following software installed before you can run the application:

---

## 1. ☕ Java 17+ (REQUIRED - **CURRENTLY MISSING**)

### Why You Need It
The backend application is built with Spring Boot and requires Java to run.

### Download & Install

**Option A: Eclipse Temurin (Recommended)**
1. Visit: https://adoptium.net/
2. Download: **JDK 17 LTS** for Windows x64
3. Run installer
4. Check "Set JAVA_HOME" during installation
5. Verify installation:
   ```cmd
   java -version
   ```
   Should show: `openjdk version "17.x.x"`

**Option B: Oracle JDK**
1. Visit: https://www.oracle.com/java/technologies/downloads/#java17
2. Download Java 17 for Windows
3. Install and set JAVA_HOME

### Set JAVA_HOME (If not auto-set)
```cmd
# Windows (Run as Administrator)
setx JAVA_HOME "C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot"
setx PATH "%PATH%;%JAVA_HOME%\bin"
```

---

## 2. 🟢 Node.js 18+ (REQUIRED - **CURRENTLY INSTALLED** ✓)

### Verify Installation
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

✅ **Status: INSTALLED** (Used for frontend)

---

## 3. 🐘 PostgreSQL 12+ (REQUIRED - Status Unknown)

### Why You Need It
Database for storing rooms, bookings, users, and payments.

### Download & Install
1. Visit: https://www.postgresql.org/download/windows/
2. Download latest version (15.x recommended)
3. Run installer
4. **Remember the password you set for 'postgres' user!**
5. Install on default port: 5432
6. Verify:
   ```cmd
   psql --version
   ```

### Setup Database
```cmd
# Open psql
psql -U postgres

# In psql console:
CREATE DATABASE homestay_booking;
\l  # List databases (verify homestay_booking exists)
\q  # Quit
```

---

## 4. 🔧 Build Tools (ONE REQUIRED)

### Option A: Maven (Recommended)

**Download:**
1. Visit: https://maven.apache.org/download.cgi
2. Download: apache-maven-3.9.x-bin.zip
3. Extract to: `C:\Program Files\Apache\maven`
4. Add to PATH:
   ```cmd
   setx PATH "%PATH%;C:\Program Files\Apache\maven\bin"
   ```
5. Verify:
   ```cmd
   mvn --version
   ```

### Option B: Use IDE (Easier)

**IntelliJ IDEA Community (Free & Recommended):**
1. Download: https://www.jetbrains.com/idea/download/
2. Install Community Edition (Free)
3. Open `backend` folder as project
4. IDE will handle Maven automatically

---

## 📦 Quick Installation Summary

### Install Order:
1. ✅ **Java 17** (30 minutes)
2. ✅ **PostgreSQL** (20 minutes)
3. ✅ **Maven** OR **IntelliJ IDEA** (15 minutes)

### Total Time: ~1 hour

---

## 🚀 Once Prerequisites Are Installed

### Method 1: Using Maven (Command Line)

```bash
# 1. Create database
psql -U postgres
CREATE DATABASE homestay_booking;
\q

# 2. Configure environment
# Edit backend\.env with your database password

# 3. Build and run backend
cd backend
mvn clean install
mvn spring-boot:run

# 4. Run frontend (new terminal)
cd frontend
npm install  # Already done ✓
npm run dev
```

### Method 2: Using IntelliJ IDEA (Easier)

```bash
# 1. Create database (same as above)
psql -U postgres
CREATE DATABASE homestay_booking;
\q

# 2. Open IntelliJ IDEA
# File → Open → Select 'backend' folder

# 3. Wait for Maven to download dependencies

# 4. Find HomestayBookingApplication.java
# Right-click → Run

# 5. Run frontend (terminal)
cd frontend
npm run dev
```

---

## 🎯 System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 4 GB | 8 GB |
| Disk Space | 2 GB | 5 GB |
| OS | Windows 10 | Windows 10/11 |
| Java | JDK 17 | JDK 17 LTS |
| Node.js | 18.x | 20.x |
| PostgreSQL | 12.x | 15.x |

---

## 📥 Download Links Summary

### Essential Downloads:
1. **Java 17**: https://adoptium.net/
2. **PostgreSQL**: https://www.postgresql.org/download/windows/
3. **IntelliJ IDEA Community**: https://www.jetbrains.com/idea/download/
   OR
4. **Maven**: https://maven.apache.org/download.cgi

---

## ✅ Verification Checklist

After installing prerequisites, run these commands:

```cmd
java -version          # Should show Java 17
node --version         # Should show Node 18+
npm --version          # Should show npm 9+
psql --version         # Should show PostgreSQL 12+
mvn --version          # Should show Maven 3.x (if using Maven)
```

All commands should work without "command not found" errors.

---

## 🆘 Installation Help

### Java Not Found After Install
```cmd
# Add to system PATH manually
# Search "Environment Variables" in Windows
# Edit PATH variable
# Add: C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\bin
```

### PostgreSQL Not Starting
```cmd
# Open Services (services.msc)
# Find "postgresql-x64-XX"
# Right-click → Start
```

### Maven Not Found
```cmd
# Verify Maven is extracted to:
# C:\Program Files\Apache\maven

# Add to PATH:
# C:\Program Files\Apache\maven\bin
```

---

## 💡 Recommendations

### For Beginners:
- ✅ Use **IntelliJ IDEA Community** instead of Maven CLI
- ✅ Install **PostgreSQL with pgAdmin** (GUI included)
- ✅ Keep all default installation paths

### For Experienced Developers:
- ✅ Use Maven CLI for faster builds
- ✅ Configure environment variables properly
- ✅ Use Windows Terminal for better CLI experience

---

## 🎓 Learning Resources

### Java Spring Boot:
- Official Docs: https://spring.io/projects/spring-boot
- Tutorial: https://spring.io/guides/gs/spring-boot/

### React:
- Official Docs: https://react.dev/
- Vite Docs: https://vitejs.dev/

### PostgreSQL:
- Official Docs: https://www.postgresql.org/docs/

---

## 📞 What To Do Next?

### Step 1: Install Missing Software
Install Java 17 and PostgreSQL first (required for backend).

### Step 2: Verify Installation
Run verification commands to ensure everything works.

### Step 3: Return to BUILD_AND_RUN.md
Follow the build instructions once prerequisites are installed.

---

**Need Help?** Join our Discord or create an issue on GitHub!

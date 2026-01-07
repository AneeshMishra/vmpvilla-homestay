# 📥 Install Java 17 and PostgreSQL - Step by Step Guide

## 🚀 Quick Installation (Automated)

### Option A: Using PowerShell Script (Recommended)

1. **Open PowerShell as Administrator**
   - Press `Win + X`
   - Click "Windows PowerShell (Admin)" or "Terminal (Admin)"

2. **Navigate to project folder**
   ```powershell
   cd "C:\Users\Hp\Documents\homestay-booking"
   ```

3. **Run installation script**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   .\install-prerequisites.ps1
   ```

4. **Follow the prompts**
   - Script will install Chocolatey, Java 17, and PostgreSQL
   - Default PostgreSQL password: `postgres`
   - Database will be created automatically

---

## 📖 Manual Installation (If Script Fails)

### Step 1: Install Java 17

#### Download Java 17

1. **Visit Eclipse Temurin Download Page**
   - URL: https://adoptium.net/temurin/releases/
   - Or direct link: https://adoptium.net/

2. **Select Download Options**
   - Operating System: **Windows**
   - Architecture: **x64**
   - Package Type: **JDK**
   - Version: **17 - LTS**

3. **Download**
   - Click **.msi** installer (recommended)
   - File size: ~160 MB
   - Example: `OpenJDK17U-jdk_x64_windows_hotspot_17.0.9_9.msi`

#### Install Java 17

1. **Run the installer** (Double-click the .msi file)

2. **Installation wizard steps:**
   - Click "Next"
   - Accept license agreement
   - **IMPORTANT:** Check these options:
     - ✅ Set JAVA_HOME variable
     - ✅ Add to PATH
     - ✅ Associate .jar files
   - Choose installation directory (default: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x`)
   - Click "Install"
   - Wait for installation to complete
   - Click "Finish"

3. **Verify installation:**
   - Open new Command Prompt or PowerShell
   - Run:
     ```cmd
     java -version
     ```
   - Expected output:
     ```
     openjdk version "17.0.9" 2023-10-17
     OpenJDK Runtime Environment Temurin-17.0.9+9 (build 17.0.9+9)
     OpenJDK 64-Bit Server VM Temurin-17.0.9+9 (build 17.0.9+9, mixed mode, sharing)
     ```

#### Troubleshooting Java Installation

**If "java -version" doesn't work:**

1. **Manually set JAVA_HOME:**
   - Press `Win + X` → System
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", click "New"
     - Variable name: `JAVA_HOME`
     - Variable value: `C:\Program Files\Eclipse Adoptium\jdk-17.0.9.9-hotspot` (adjust version)
   - Click OK

2. **Add to PATH:**
   - In "System variables", find and edit "Path"
   - Click "New"
   - Add: `%JAVA_HOME%\bin`
   - Click OK on all windows

3. **Restart terminal** and try `java -version` again

---

### Step 2: Install PostgreSQL

#### Download PostgreSQL

1. **Visit PostgreSQL Download Page**
   - URL: https://www.postgresql.org/download/windows/
   - Click "Download the installer"

2. **EnterpriseDB Installer Page**
   - URL: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
   - Select: **PostgreSQL 15.x** for Windows x86-64
   - Click "Download"
   - File size: ~250 MB
   - Example: `postgresql-15.5-1-windows-x64.exe`

#### Install PostgreSQL

1. **Run the installer** (Double-click the .exe file)

2. **Installation wizard steps:**

   **a) Setup - PostgreSQL:**
   - Click "Next"

   **b) Installation Directory:**
   - Default: `C:\Program Files\PostgreSQL\15`
   - Click "Next"

   **c) Select Components:**
   - ✅ PostgreSQL Server
   - ✅ pgAdmin 4 (GUI tool - recommended)
   - ✅ Stack Builder
   - ✅ Command Line Tools
   - Click "Next"

   **d) Data Directory:**
   - Default: `C:\Program Files\PostgreSQL\15\data`
   - Click "Next"

   **e) Password:**
   - **IMPORTANT:** Set password for postgres user
   - Recommended for development: `postgres`
   - **Remember this password!** You'll need it for the application.
   - Re-enter password to confirm
   - Click "Next"

   **f) Port:**
   - Default: `5432`
   - Click "Next"

   **g) Advanced Options:**
   - Locale: Default
   - Click "Next"

   **h) Ready to Install:**
   - Review settings
   - Click "Next"

   **i) Installation Progress:**
   - Wait for installation (2-5 minutes)

   **j) Completing Setup:**
   - Uncheck "Launch Stack Builder at exit" (optional)
   - Click "Finish"

3. **Verify installation:**
   - Open new Command Prompt or PowerShell
   - Run:
     ```cmd
     psql --version
     ```
   - Expected output:
     ```
     psql (PostgreSQL) 15.5
     ```

#### Troubleshooting PostgreSQL Installation

**If "psql --version" doesn't work:**

1. **Add to PATH manually:**
   - Press `Win + X` → System
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", edit "Path"
   - Click "New"
   - Add: `C:\Program Files\PostgreSQL\15\bin`
   - Click OK on all windows

2. **Restart terminal** and try `psql --version` again

**If PostgreSQL service is not running:**

1. Open Services:
   - Press `Win + R`
   - Type: `services.msc`
   - Press Enter

2. Find "postgresql-x64-15"
   - Right-click → Start
   - Right-click → Properties → Startup type: Automatic

---

### Step 3: Create Database

#### Method 1: Using Command Line (psql)

1. **Open Command Prompt or PowerShell**

2. **Connect to PostgreSQL:**
   ```cmd
   psql -U postgres
   ```

3. **Enter password** when prompted (the one you set during installation)

4. **Create database:**
   ```sql
   CREATE DATABASE homestay_booking;
   ```

5. **Verify database was created:**
   ```sql
   \l
   ```
   You should see `homestay_booking` in the list

6. **Exit psql:**
   ```sql
   \q
   ```

#### Method 2: Using pgAdmin 4 (GUI)

1. **Open pgAdmin 4**
   - Start Menu → pgAdmin 4

2. **Connect to server:**
   - Expand "Servers" in left panel
   - Click "PostgreSQL 15"
   - Enter password when prompted

3. **Create database:**
   - Right-click "Databases"
   - Select "Create" → "Database"
   - Database name: `homestay_booking`
   - Owner: `postgres`
   - Click "Save"

4. **Verify:**
   - You should see `homestay_booking` under Databases

---

## ✅ Verification Checklist

After installation, verify everything is working:

### Check Java
```cmd
java -version
```
✅ Should show: `openjdk version "17.x.x"`

### Check PostgreSQL
```cmd
psql --version
```
✅ Should show: `psql (PostgreSQL) 15.x`

### Check Database
```cmd
psql -U postgres -l
```
✅ Should list `homestay_booking` database

### Check JAVA_HOME
```cmd
echo %JAVA_HOME%
```
✅ Should show: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x`

---

## 🔧 Update Configuration Files

### Update backend\.env

Edit `backend\.env` file:

```properties
# Database Configuration
DB_URL=jdbc:postgresql://localhost:5432/homestay_booking
DB_USERNAME=postgres
DB_PASSWORD=postgres    # Change this to your actual password

# JWT Secret (keep as is for now)
JWT_SECRET=your-super-secret-jwt-key-minimum-256-bits-long-change-in-production

# Google OAuth (optional for now)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Razorpay Keys (optional for now)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Gmail SMTP (optional for now)
MAIL_USERNAME=your.email@gmail.com
MAIL_PASSWORD=your-16-char-app-password
```

**IMPORTANT:** Change `DB_PASSWORD` to match the password you set during PostgreSQL installation!

---

## 🎯 What's Next?

### You're now ready to run the application!

#### Option A: Using IntelliJ IDEA (Recommended)

1. **Download IntelliJ IDEA Community:**
   - https://www.jetbrains.com/idea/download/
   - Install Community Edition (Free)

2. **Open Project:**
   - File → Open
   - Select `C:\Users\Hp\Documents\homestay-booking\backend`

3. **Run Application:**
   - Find `HomestayBookingApplication.java`
   - Right-click → Run

4. **Run Frontend** (new terminal):
   ```cmd
   cd C:\Users\Hp\Documents\homestay-booking\frontend
   npm run dev
   ```

#### Option B: Using Command Line (Maven)

1. **Install Maven:**
   - Download: https://maven.apache.org/download.cgi
   - Extract to: `C:\Program Files\Apache\maven`
   - Add to PATH: `C:\Program Files\Apache\maven\bin`

2. **Run Backend:**
   ```cmd
   cd C:\Users\Hp\Documents\homestay-booking\backend
   mvn spring-boot:run
   ```

3. **Run Frontend** (new terminal):
   ```cmd
   cd C:\Users\Hp\Documents\homestay-booking\frontend
   npm run dev
   ```

---

## 📊 Installation Summary

| Software | Download | Size | Time |
|----------|----------|------|------|
| Java 17 | https://adoptium.net/ | 160 MB | 10 min |
| PostgreSQL 15 | https://www.postgresql.org/download/windows/ | 250 MB | 15 min |
| Database Setup | Command line or pgAdmin | - | 2 min |
| **Total** | - | **410 MB** | **~30 min** |

---

## 🆘 Common Issues

### Java Installed but "java -version" Fails
- **Solution:** Restart terminal or restart computer
- **Or:** Manually add to PATH (see troubleshooting above)

### PostgreSQL Service Won't Start
- **Solution:** Open Services (services.msc)
- Find "postgresql-x64-15" → Right-click → Start

### Can't Connect to Database
- **Check:** PostgreSQL service is running
- **Check:** Password is correct
- **Check:** Port 5432 is not blocked by firewall

### "Database does not exist" Error
- **Solution:** Create database manually (see Step 3 above)

---

## 💡 Pro Tips

1. **Use pgAdmin 4** for visual database management
2. **Remember your PostgreSQL password** - you'll need it often
3. **Add PostgreSQL and Java to PATH** during installation
4. **Restart terminal** after installation to refresh environment
5. **Use IntelliJ IDEA** for easier Spring Boot development

---

**Installation complete?** → Go to [BUILD_AND_RUN.md](BUILD_AND_RUN.md) to start the application!

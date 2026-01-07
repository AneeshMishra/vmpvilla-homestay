# Docker Setup Checklist for Homestay Booking Project

## Current Issue
✗ Docker Desktop won't start due to **virtualization disabled in BIOS**

## Complete Setup Process

### ✓ Step 1: Check Current Status
```powershell
.\check-virtualization.ps1
```

This will show you what's enabled and what needs to be done.

---

### ✓ Step 2: Enable BIOS Virtualization (REQUIRED)

**Current Status**: DISABLED (VirtualizationFirmwareEnabled = FALSE)

#### Instructions for HP Computer:

1. **Save all work and restart computer**

2. **Enter BIOS**:
   - Press **F10** repeatedly as soon as computer starts
   - Keep pressing until BIOS screen appears
   - (If F10 doesn't work, try: Esc, then F10)

3. **Find Virtualization**:
   Look for one of these menu paths:
   - `Advanced → System Options → Virtualization Technology`
   - `Security → System Security → Virtualization Technology`
   - `Advanced → Device Configuration → Virtualization Technology`

4. **Enable it**:
   - Change to **Enabled**
   - Press **F10** to Save
   - Select **Yes** to confirm
   - Computer restarts automatically

5. **Verify after restart**:
   ```powershell
   wmic cpu get VirtualizationFirmwareEnabled
   ```
   Should show: **TRUE**

---

### ✓ Step 3: Enable Hyper-V in Windows

**After enabling BIOS virtualization**, run this script:

```powershell
# Right-click PowerShell → Run as Administrator
.\enable-hyperv.ps1
```

This script will:
- ✓ Verify BIOS virtualization is enabled
- ✓ Enable Hyper-V (all components)
- ✓ Enable Virtual Machine Platform
- ✓ Enable Windows Hypervisor Platform
- ✓ Prompt for restart

**Or enable manually**:
1. Press `Win + R`
2. Type: `optionalfeatures`
3. Enable:
   - ✓ Hyper-V
   - ✓ Virtual Machine Platform
   - ✓ Windows Hypervisor Platform
4. Restart

---

### ✓ Step 4: Restart Computer (REQUIRED)

After enabling Hyper-V, you **MUST restart** for changes to take effect.

---

### ✓ Step 5: Start Docker Desktop

1. Open **Docker Desktop** from Start Menu
2. Wait for "Docker Desktop is running" in system tray (green icon)
3. First startup may take 1-2 minutes

---

### ✓ Step 6: Verify Docker Works

```powershell
# Check Docker version
docker --version

# Test Docker is working
docker run hello-world

# Check Docker Compose
docker-compose --version
```

You should see:
```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

---

### ✓ Step 7: Start Homestay Booking App

Once Docker is running, start the app:

```powershell
# Option 1: Use the batch script
.\docker-start.bat

# Option 2: Manual commands
docker-compose up -d --build

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Database**: localhost:5432

---

## Quick Command Reference

```powershell
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after code changes
docker-compose up -d --build

# Check running containers
docker ps

# Stop and remove everything (including database data)
docker-compose down -v
```

---

## Troubleshooting

### Docker Desktop still won't start after enabling virtualization

1. **Check virtualization is actually enabled**:
   ```powershell
   wmic cpu get VirtualizationFirmwareEnabled
   ```
   Should be **TRUE**

2. **Check Hyper-V is enabled**:
   ```powershell
   Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V
   ```
   Should show **State: Enabled**

3. **Try disabling and re-enabling Hyper-V**:
   ```powershell
   # Disable
   Disable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All
   # Restart
   # Enable again
   Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All
   # Restart
   ```

### Port conflicts (8080, 3000, 5432 already in use)

```powershell
# Check what's using port 8080
netstat -ano | findstr :8080

# Stop conflicting service or change ports in docker-compose.yml
```

### Windows Home Edition

If you have Windows Home (doesn't support Hyper-V):

1. Install WSL 2:
   ```powershell
   wsl --install
   wsl --set-default-version 2
   ```

2. In Docker Desktop:
   - Settings → General
   - Enable "Use WSL 2 based engine"

---

## Alternative: Run Without Docker

If Docker setup is too complex, you can run the app directly:

1. **Database**: Already have PostgreSQL installed
2. **Backend**: Use `.\run-backend.bat`
3. **Frontend**: Use `npm run dev`

See [BUILD_AND_RUN.md](BUILD_AND_RUN.md) for details.

---

## Progress Checklist

- [ ] Check virtualization status (`.\check-virtualization.ps1`)
- [ ] Enable virtualization in BIOS (restart required)
- [ ] Verify virtualization enabled (`wmic cpu get VirtualizationFirmwareEnabled`)
- [ ] Run `.\enable-hyperv.ps1` as Administrator
- [ ] Restart computer
- [ ] Start Docker Desktop
- [ ] Test Docker (`docker run hello-world`)
- [ ] Start app (`.\docker-start.bat`)
- [ ] Access frontend at http://localhost:3000

---

## Files Created

- `check-virtualization.ps1` - Check what's enabled/disabled
- `enable-hyperv.ps1` - Automatically enable Hyper-V (run as Admin)
- `docker-start.bat` - Start all Docker services
- `ENABLE_DOCKER_GUIDE.md` - Detailed BIOS instructions
- `DOCKER_SETUP_CHECKLIST.md` - This file

---

## Next Steps

**Right now, you need to:**

1. **Restart your computer**
2. **Press F10 at startup** (repeatedly)
3. **Find "Virtualization Technology"** in BIOS
4. **Set to "Enabled"**
5. **Save and exit** (F10)
6. **After Windows boots**, run: `.\enable-hyperv.ps1` (as Administrator)
7. **Restart again**
8. **Start Docker Desktop**
9. **Run**: `.\docker-start.bat`

**Estimated time**: 15-20 minutes (including restarts)

# Docker Setup - Start Here

## Current Situation

Docker Desktop won't start because **virtualization is disabled in your BIOS**.

**Status**: VirtualizationFirmwareEnabled = **FALSE** ❌

---

## Fix It in 3 Steps (20 minutes)

### Step 1: Enable in BIOS (5 min)

1. Restart computer
2. Press **F10** repeatedly at startup
3. Find "Virtualization Technology"
4. Set to **Enabled**
5. Press **F10** to save

### Step 2: Enable Hyper-V (5 min)

Run PowerShell as Administrator:
```powershell
.\enable-hyperv.ps1
```

Then restart when prompted.

### Step 3: Start Docker (2 min)

1. Open Docker Desktop
2. Wait for it to start
3. Run: `.\docker-start.bat`

**Done!** App at http://localhost:3000

---

## Or Skip Docker (5 minutes, no restarts)

If you want to start coding immediately without fixing Docker:

```powershell
# Create database
.\setup-database.bat

# Terminal 1: Start backend
cd backend
.\run-backend.bat

# Terminal 2: Start frontend
cd frontend
npm run dev
```

App at http://localhost:5173

---

## Files to Help You

- **[DOCKER_FIX_SUMMARY.md](DOCKER_FIX_SUMMARY.md)** ← Read this for complete instructions
- **[check-virtualization.ps1](check-virtualization.ps1)** ← Check what's enabled
- **[enable-hyperv.ps1](enable-hyperv.ps1)** ← Auto-enable Hyper-V
- **[ENABLE_DOCKER_GUIDE.md](ENABLE_DOCKER_GUIDE.md)** ← Detailed BIOS guide

---

## Quick Decision

**Want Docker?** → Follow 3 steps above (20 min with restarts)

**Just want to code?** → Skip Docker, use direct method (5 min, no restarts)

Both work perfectly! Docker is cleaner for deployment, but not required for development.

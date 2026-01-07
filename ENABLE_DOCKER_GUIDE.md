# Docker Desktop Virtualization Fix Guide

## Current Status
Your system check shows:
- **Virtualization Firmware**: DISABLED (needs to be enabled in BIOS)
- **CPU Support**: Your CPU supports virtualization
- **Action Required**: Enable in BIOS, then enable Hyper-V in Windows

---

## Step 1: Enable Virtualization in BIOS

### For HP Computer (Your System):

1. **Save all work and close all applications**

2. **Restart your computer**

3. **Enter BIOS Setup**:
   - As soon as you press the power button, **repeatedly press F10**
   - Keep pressing until you see the BIOS setup screen
   - Alternative keys if F10 doesn't work: **Esc**, then **F10**

4. **Navigate to Virtualization Settings**:
   - Use arrow keys to navigate
   - Look for one of these menu paths:

   **Option A: System Configuration**
   ```
   Advanced → System Options → Virtualization Technology
   ```

   **Option B: Security**
   ```
   Security → System Security → Virtualization Technology (VTx)
   ```

   **Option C: Advanced**
   ```
   Advanced → Device Configuration → Virtualization Technology
   ```

5. **Enable Virtualization**:
   - When you find "Virtualization Technology" or "Intel VT-x":
   - Change the value to **Enabled**
   - It might also say "Intel(R) Virtualization Technology"

6. **Save and Exit**:
   - Press **F10** to save changes
   - Select "Yes" to confirm
   - Computer will restart automatically

7. **Verify it worked** (after Windows boots):
   - Open PowerShell
   - Run: `wmic cpu get VirtualizationFirmwareEnabled`
   - Should now show: **TRUE**

---

## Step 2: Enable Hyper-V in Windows

After enabling BIOS virtualization, you need to enable Windows Hyper-V features.

### Method 1: PowerShell (Recommended - Fastest)

1. **Open PowerShell as Administrator**:
   - Press `Win + X`
   - Select "Windows PowerShell (Admin)" or "Terminal (Admin)"

2. **Run this command**:
   ```powershell
   Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
   ```

3. **Also enable these features**:
   ```powershell
   Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
   Enable-WindowsOptionalFeature -Online -FeatureName HypervisorPlatform
   ```

4. **Restart when prompted**:
   ```
   Type Y and press Enter
   ```

### Method 2: GUI (Alternative)

1. **Open Windows Features**:
   - Press `Win + R`
   - Type: `optionalfeatures`
   - Press Enter

2. **Enable these checkboxes**:
   - ✓ Hyper-V
     - ✓ Hyper-V Management Tools
     - ✓ Hyper-V Platform
   - ✓ Virtual Machine Platform
   - ✓ Windows Hypervisor Platform

3. **Click OK**

4. **Restart your computer** when prompted

---

## Step 3: Verify and Start Docker Desktop

### After Restart:

1. **Verify virtualization is enabled**:
   ```powershell
   # Check CPU virtualization
   wmic cpu get VirtualizationFirmwareEnabled
   # Should show: TRUE

   # Check Hyper-V is enabled
   Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V
   # Should show: State: Enabled
   ```

2. **Start Docker Desktop**:
   - Open Docker Desktop from Start Menu
   - It should start successfully now
   - Wait for "Docker Desktop is running" in system tray

3. **Verify Docker works**:
   ```powershell
   docker --version
   docker run hello-world
   ```

---

## Troubleshooting

### If BIOS doesn't have Virtualization option:
- Your CPU might not support it (rare for modern systems)
- Check HP support documentation for your specific model
- Run: `systeminfo | findstr /C:"System Model"` to get your model number

### If virtualization shows TRUE but Docker still fails:
1. Disable Hyper-V completely:
   ```powershell
   Disable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All
   ```
2. Restart
3. Re-enable Hyper-V using commands above
4. Restart again

### If using Windows Home Edition:
- Windows Home doesn't support Hyper-V
- Use WSL 2 backend instead (see below)

---

## Alternative: WSL 2 Backend (For Windows Home or if Hyper-V has issues)

If you have Windows Home or Hyper-V gives problems:

1. **Install WSL 2**:
   ```powershell
   wsl --install
   wsl --set-default-version 2
   ```

2. **Restart computer**

3. **Configure Docker Desktop**:
   - Open Docker Desktop
   - Go to Settings → General
   - Enable "Use the WSL 2 based engine"
   - Click "Apply & Restart"

---

## For Your Homestay Project with Docker

Once Docker is working, you can use the provided `docker-compose.yml`:

```powershell
# Navigate to project
cd C:\Users\Hp\Documents\homestay-booking

# Start all services (database, backend, frontend)
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

---

## Quick Reference Commands

```powershell
# Check virtualization status
wmic cpu get VirtualizationFirmwareEnabled

# Check Hyper-V status
Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V

# Enable Hyper-V (run as Administrator)
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All

# Docker commands
docker --version
docker-compose --version
docker ps
docker-compose up -d
docker-compose down
```

---

## Summary of Steps

1. ✓ Restart computer
2. ✓ Enter BIOS (F10 on HP)
3. ✓ Enable "Virtualization Technology"
4. ✓ Save and exit BIOS
5. ✓ Windows boots
6. ✓ Open PowerShell as Admin
7. ✓ Run: `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All`
8. ✓ Restart computer
9. ✓ Start Docker Desktop
10. ✓ Success!

---

## Need Help?

If you get stuck:
1. Take a photo of any error messages
2. Run: `systeminfo > system-info.txt` and check the file
3. Check Docker Desktop logs: Settings → Troubleshoot → Get Support

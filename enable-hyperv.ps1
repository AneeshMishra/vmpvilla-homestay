# Enable Hyper-V and Required Features for Docker Desktop
# MUST be run as Administrator

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ERROR: Administrator Rights Required" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "This script must be run as Administrator." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To run as Administrator:" -ForegroundColor Cyan
    Write-Host "1. Right-click on PowerShell" -ForegroundColor White
    Write-Host "2. Select 'Run as Administrator'" -ForegroundColor White
    Write-Host "3. Navigate to this folder and run the script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Or run this command:" -ForegroundColor Cyan
    Write-Host "Start-Process powershell -Verb RunAs -ArgumentList '-File ""$PSCommandPath""'" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Enable Hyper-V for Docker Desktop" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# First check if CPU virtualization is enabled
Write-Host "[Checking] CPU Virtualization Status..." -ForegroundColor Yellow
$virtEnabled = (Get-WmiObject Win32_Processor).VirtualizationFirmwareEnabled

if (-not $virtEnabled) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ERROR: BIOS Virtualization DISABLED" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "You must enable virtualization in BIOS first!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Steps:" -ForegroundColor Yellow
    Write-Host "1. Restart your computer" -ForegroundColor White
    Write-Host "2. Press F10 repeatedly at startup (for HP computers)" -ForegroundColor White
    Write-Host "3. Find 'Virtualization Technology' or 'Intel VT-x'" -ForegroundColor White
    Write-Host "4. Set to 'Enabled'" -ForegroundColor White
    Write-Host "5. Save and Exit (F10)" -ForegroundColor White
    Write-Host "6. Run this script again after restart" -ForegroundColor White
    Write-Host ""
    Write-Host "See ENABLE_DOCKER_GUIDE.md for detailed instructions" -ForegroundColor Cyan
    Write-Host ""
    pause
    exit 1
}

Write-Host "✓ CPU Virtualization is enabled" -ForegroundColor Green
Write-Host ""

# Check Windows edition
$windowsEdition = (Get-WmiObject -Class Win32_OperatingSystem).Caption
Write-Host "[Detected] Windows Edition: $windowsEdition" -ForegroundColor Cyan
Write-Host ""

if ($windowsEdition -like "*Home*") {
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "  WARNING: Windows Home Edition" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Windows Home does NOT support Hyper-V." -ForegroundColor Yellow
    Write-Host "For Docker Desktop on Windows Home:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Install WSL 2 instead:" -ForegroundColor Cyan
    Write-Host "   wsl --install" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Set WSL 2 as default:" -ForegroundColor Cyan
    Write-Host "   wsl --set-default-version 2" -ForegroundColor White
    Write-Host ""
    Write-Host "3. In Docker Desktop:" -ForegroundColor Cyan
    Write-Host "   Settings → General → Enable 'Use WSL 2 based engine'" -ForegroundColor White
    Write-Host ""

    $installWSL = Read-Host "Would you like to install WSL 2 now? (Y/N)"
    if ($installWSL -eq "Y" -or $installWSL -eq "y") {
        Write-Host ""
        Write-Host "[Installing] WSL 2..." -ForegroundColor Yellow
        wsl --install
        Write-Host ""
        Write-Host "WSL installation initiated." -ForegroundColor Green
        Write-Host "Computer will need to restart after installation." -ForegroundColor Yellow
    }
    pause
    exit 0
}

# Enable Hyper-V and related features
Write-Host "[Enabling] Required Windows Features..." -ForegroundColor Yellow
Write-Host ""

$featuresToEnable = @(
    @{Name="Microsoft-Hyper-V-All"; Display="Hyper-V (All Components)"},
    @{Name="VirtualMachinePlatform"; Display="Virtual Machine Platform"},
    @{Name="HypervisorPlatform"; Display="Windows Hypervisor Platform"}
)

$restartRequired = $false

foreach ($feature in $featuresToEnable) {
    Write-Host "  → Enabling $($feature.Display)..." -ForegroundColor Cyan

    try {
        $result = Enable-WindowsOptionalFeature -Online -FeatureName $feature.Name -All -NoRestart

        if ($result.RestartNeeded) {
            $restartRequired = $true
        }

        Write-Host "    ✓ $($feature.Display) enabled" -ForegroundColor Green
    } catch {
        Write-Host "    ✗ Failed to enable $($feature.Display)" -ForegroundColor Red
        Write-Host "      Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Configuration Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

if ($restartRequired) {
    Write-Host "A RESTART is REQUIRED for changes to take effect." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After restart:" -ForegroundColor Cyan
    Write-Host "1. Start Docker Desktop" -ForegroundColor White
    Write-Host "2. Wait for 'Docker Desktop is running' message" -ForegroundColor White
    Write-Host "3. Test with: docker run hello-world" -ForegroundColor White
    Write-Host ""

    $restart = Read-Host "Restart now? (Y/N)"
    if ($restart -eq "Y" -or $restart -eq "y") {
        Write-Host ""
        Write-Host "Restarting in 10 seconds..." -ForegroundColor Yellow
        Write-Host "Press Ctrl+C to cancel" -ForegroundColor Gray
        Start-Sleep -Seconds 10
        Restart-Computer -Force
    } else {
        Write-Host ""
        Write-Host "Remember to restart your computer manually!" -ForegroundColor Yellow
        Write-Host ""
    }
} else {
    Write-Host "Features are already enabled or no restart needed." -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now:" -ForegroundColor Cyan
    Write-Host "1. Start Docker Desktop" -ForegroundColor White
    Write-Host "2. Test with: docker run hello-world" -ForegroundColor White
    Write-Host ""
}

pause

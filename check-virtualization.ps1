# Check Virtualization Status
# Run this script to see if virtualization is enabled

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Virtualization Status Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check CPU Virtualization
Write-Host "[1] CPU Virtualization Status:" -ForegroundColor Yellow
try {
    $virtEnabled = (Get-WmiObject Win32_Processor).VirtualizationFirmwareEnabled
    if ($virtEnabled) {
        Write-Host "    OK ENABLED" -ForegroundColor Green
        Write-Host "    Your CPU virtualization is turned ON in BIOS" -ForegroundColor Green
    } else {
        Write-Host "    X DISABLED" -ForegroundColor Red
        Write-Host "    You need to enable it in BIOS" -ForegroundColor Red
        Write-Host "    -> Restart -> Press F10 -> Enable Virtualization Technology" -ForegroundColor Yellow
    }
} catch {
    Write-Host "    X Could not determine status" -ForegroundColor Red
}

Write-Host ""

# Check Hyper-V
Write-Host "[2] Hyper-V Status:" -ForegroundColor Yellow
try {
    $hyperV = Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All -ErrorAction SilentlyContinue
    if ($hyperV -and $hyperV.State -eq "Enabled") {
        Write-Host "    OK ENABLED" -ForegroundColor Green
    } else {
        Write-Host "    X DISABLED" -ForegroundColor Red
        Write-Host "    Run: enable-hyperv.ps1 (as Administrator)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "    X Not available (might be Windows Home edition)" -ForegroundColor Red
}

Write-Host ""

# Check Virtual Machine Platform
Write-Host "[3] Virtual Machine Platform:" -ForegroundColor Yellow
try {
    $vmp = Get-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -ErrorAction SilentlyContinue
    if ($vmp -and $vmp.State -eq "Enabled") {
        Write-Host "    OK ENABLED" -ForegroundColor Green
    } else {
        Write-Host "    X DISABLED" -ForegroundColor Red
    }
} catch {
    Write-Host "    X Could not check" -ForegroundColor Red
}

Write-Host ""

# Check Windows Hypervisor Platform
Write-Host "[4] Windows Hypervisor Platform:" -ForegroundColor Yellow
try {
    $whp = Get-WindowsOptionalFeature -Online -FeatureName HypervisorPlatform -ErrorAction SilentlyContinue
    if ($whp -and $whp.State -eq "Enabled") {
        Write-Host "    OK ENABLED" -ForegroundColor Green
    } else {
        Write-Host "    X DISABLED" -ForegroundColor Red
    }
} catch {
    Write-Host "    X Could not check" -ForegroundColor Red
}

Write-Host ""

# Check WSL
Write-Host "[5] WSL (Windows Subsystem for Linux):" -ForegroundColor Yellow
try {
    $wslVersion = wsl --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "    OK INSTALLED" -ForegroundColor Green
    } else {
        Write-Host "    X NOT INSTALLED" -ForegroundColor Yellow
        Write-Host "    (Optional, but useful for Docker)" -ForegroundColor Gray
    }
} catch {
    Write-Host "    X NOT INSTALLED" -ForegroundColor Yellow
}

Write-Host ""

# Check Docker
Write-Host "[6] Docker Desktop:" -ForegroundColor Yellow
try {
    $dockerVersion = docker --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "    OK INSTALLED: $dockerVersion" -ForegroundColor Green

        # Check if Docker is running
        $dockerPs = docker ps 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "    OK RUNNING" -ForegroundColor Green
        } else {
            Write-Host "    X NOT RUNNING (start Docker Desktop)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "    X NOT INSTALLED or not in PATH" -ForegroundColor Red
    }
} catch {
    Write-Host "    X NOT FOUND" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

# Summary and recommendations
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host ""

if (-not $virtEnabled) {
    Write-Host "1. ENABLE BIOS VIRTUALIZATION (Required)" -ForegroundColor Red
    Write-Host "   -> Restart computer" -ForegroundColor Yellow
    Write-Host "   -> Press F10 repeatedly at startup" -ForegroundColor Yellow
    Write-Host "   -> Find 'Virtualization Technology'" -ForegroundColor Yellow
    Write-Host "   -> Set to 'Enabled'" -ForegroundColor Yellow
    Write-Host "   -> Save and Exit (F10)" -ForegroundColor Yellow
    Write-Host ""
}

if (-not $hyperV -or $hyperV.State -ne "Enabled") {
    Write-Host "2. ENABLE HYPER-V (Required for Docker)" -ForegroundColor Yellow
    Write-Host "   -> Run: .\enable-hyperv.ps1 (as Administrator)" -ForegroundColor Yellow
    Write-Host "   -> Or manually: optionalfeatures -> Enable Hyper-V" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "3. START DOCKER DESKTOP" -ForegroundColor Green
Write-Host "   -> After completing steps above" -ForegroundColor Gray
Write-Host ""

Write-Host "For detailed instructions, see: ENABLE_DOCKER_GUIDE.md" -ForegroundColor Cyan
Write-Host ""

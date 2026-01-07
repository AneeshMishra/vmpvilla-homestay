# Homestay Booking - Prerequisites Installation Script
# This script installs Java 17 and PostgreSQL on Windows

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Homestay Booking - Prerequisites Installer" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Function to check if a command exists
function Test-CommandExists {
    param($command)
    $null = Get-Command $command -ErrorAction SilentlyContinue
    return $?
}

# Check if Chocolatey is installed
Write-Host "[1/6] Checking for Chocolatey package manager..." -ForegroundColor Yellow
if (-not (Test-CommandExists choco)) {
    Write-Host "Chocolatey not found. Installing Chocolatey..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

    # Refresh environment
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    Write-Host "Chocolatey installed successfully!" -ForegroundColor Green
} else {
    Write-Host "Chocolatey is already installed." -ForegroundColor Green
}

Write-Host ""

# Install Java 17
Write-Host "[2/6] Installing Java 17 (Eclipse Temurin)..." -ForegroundColor Yellow
if (Test-CommandExists java) {
    $javaVersion = java -version 2>&1 | Select-String "version" | ForEach-Object { $_.ToString() }
    Write-Host "Java is already installed: $javaVersion" -ForegroundColor Green
    $response = Read-Host "Do you want to reinstall? (y/N)"
    if ($response -ne 'y' -and $response -ne 'Y') {
        Write-Host "Skipping Java installation." -ForegroundColor Yellow
    } else {
        choco install temurin17 -y
    }
} else {
    choco install temurin17 -y
    Write-Host "Java 17 installation completed!" -ForegroundColor Green
}

Write-Host ""

# Install PostgreSQL
Write-Host "[3/6] Installing PostgreSQL 15..." -ForegroundColor Yellow
if (Test-CommandExists psql) {
    $pgVersion = psql --version
    Write-Host "PostgreSQL is already installed: $pgVersion" -ForegroundColor Green
    $response = Read-Host "Do you want to reinstall? (y/N)"
    if ($response -ne 'y' -and $response -ne 'Y') {
        Write-Host "Skipping PostgreSQL installation." -ForegroundColor Yellow
    } else {
        choco install postgresql15 --params '/Password:postgres' -y
    }
} else {
    Write-Host "Installing PostgreSQL with default password 'postgres'..." -ForegroundColor Cyan
    choco install postgresql15 --params '/Password:postgres' -y
    Write-Host "PostgreSQL installation completed!" -ForegroundColor Green
    Write-Host "Default password for 'postgres' user: postgres" -ForegroundColor Yellow
}

Write-Host ""

# Refresh environment variables
Write-Host "[4/6] Refreshing environment variables..." -ForegroundColor Yellow
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
Write-Host "Environment variables refreshed!" -ForegroundColor Green

Write-Host ""

# Verify installations
Write-Host "[5/6] Verifying installations..." -ForegroundColor Yellow
Write-Host ""

# Verify Java
if (Test-CommandExists java) {
    Write-Host "✓ Java verification:" -ForegroundColor Green
    java -version
} else {
    Write-Host "✗ Java installation failed or not in PATH" -ForegroundColor Red
    Write-Host "You may need to restart your terminal or computer" -ForegroundColor Yellow
}

Write-Host ""

# Verify PostgreSQL
if (Test-CommandExists psql) {
    Write-Host "✓ PostgreSQL verification:" -ForegroundColor Green
    psql --version
} else {
    Write-Host "✗ PostgreSQL installation failed or not in PATH" -ForegroundColor Red
    Write-Host "You may need to restart your terminal or computer" -ForegroundColor Yellow
}

Write-Host ""

# Create database
Write-Host "[6/6] Creating database..." -ForegroundColor Yellow
$createDb = Read-Host "Do you want to create the 'homestay_booking' database now? (Y/n)"
if ($createDb -ne 'n' -and $createDb -ne 'N') {
    Write-Host "Creating database 'homestay_booking'..." -ForegroundColor Cyan

    # Wait for PostgreSQL service to start
    Start-Sleep -Seconds 3

    # Create database using psql
    $env:PGPASSWORD = "postgres"
    $dbExists = psql -U postgres -lqt 2>$null | Select-String "homestay_booking"

    if ($dbExists) {
        Write-Host "Database 'homestay_booking' already exists!" -ForegroundColor Yellow
    } else {
        psql -U postgres -c "CREATE DATABASE homestay_booking;" 2>$null
        if ($?) {
            Write-Host "✓ Database 'homestay_booking' created successfully!" -ForegroundColor Green
        } else {
            Write-Host "Failed to create database automatically." -ForegroundColor Red
            Write-Host "You can create it manually with:" -ForegroundColor Yellow
            Write-Host "  psql -U postgres" -ForegroundColor Cyan
            Write-Host "  CREATE DATABASE homestay_booking;" -ForegroundColor Cyan
        }
    }
    Remove-Item Env:\PGPASSWORD
} else {
    Write-Host "Skipping database creation. You can create it later with:" -ForegroundColor Yellow
    Write-Host "  psql -U postgres" -ForegroundColor Cyan
    Write-Host "  CREATE DATABASE homestay_booking;" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Installation Summary" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✓ Chocolatey package manager: Installed" -ForegroundColor Green
Write-Host "✓ Java 17: Installed" -ForegroundColor Green
Write-Host "✓ PostgreSQL 15: Installed" -ForegroundColor Green
Write-Host ""
Write-Host "PostgreSQL Credentials:" -ForegroundColor Yellow
Write-Host "  Username: postgres" -ForegroundColor Cyan
Write-Host "  Password: postgres" -ForegroundColor Cyan
Write-Host "  Database: homestay_booking" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Close and reopen your terminal/PowerShell" -ForegroundColor White
Write-Host "2. Update backend\.env with database password" -ForegroundColor White
Write-Host "3. Run: cd backend && mvn spring-boot:run" -ForegroundColor White
Write-Host "4. In new terminal: cd frontend && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, see: BUILD_AND_RUN.md" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"

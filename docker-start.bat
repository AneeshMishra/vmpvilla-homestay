@echo off
REM Docker Desktop Quick Start for Homestay Booking App
REM Run this AFTER Docker Desktop is running

echo ========================================
echo   Homestay Booking - Docker Start
echo ========================================
echo.

REM Check if Docker is running
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Desktop is not running!
    echo.
    echo Please:
    echo 1. Start Docker Desktop from Start Menu
    echo 2. Wait for "Docker Desktop is running" message
    echo 3. Run this script again
    echo.
    pause
    exit /b 1
)

echo [OK] Docker Desktop is running
echo.

echo [Starting] Building and starting all services...
echo This may take a few minutes on first run...
echo.

docker-compose up -d --build

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   SUCCESS! All services are running
    echo ========================================
    echo.
    echo Services:
    echo   - Database:  PostgreSQL on localhost:5432
    echo   - Backend:   http://localhost:8080
    echo   - Frontend:  http://localhost:3000
    echo.
    echo Check status:    docker-compose ps
    echo View logs:       docker-compose logs -f
    echo Stop services:   docker-compose down
    echo.
    echo Opening frontend in browser...
    timeout /t 3 /nobreak >nul
    start http://localhost:3000
) else (
    echo.
    echo [ERROR] Failed to start services
    echo.
    echo Troubleshooting:
    echo 1. Check Docker Desktop is running
    echo 2. Run: docker-compose logs
    echo 3. Check for port conflicts (8080, 3000, 5432)
    echo.
)

pause

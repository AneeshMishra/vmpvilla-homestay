@echo off
echo ============================================
echo PostgreSQL Database Setup
echo ============================================
echo.

echo Setting PostgreSQL path...
set PGPATH=C:\Program Files\PostgreSQL\15\bin
set PATH=%PGPATH%;%PATH%

echo Checking PostgreSQL connection...
echo.

echo Enter PostgreSQL password when prompted (default: postgres)
echo.

echo Creating database 'homestay_booking'...
psql -U postgres -c "CREATE DATABASE homestay_booking;" 2>NUL
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Database created!
) else (
    echo [INFO] Database may already exist, checking...
    psql -U postgres -lqt | findstr homestay_booking >NUL
    if %ERRORLEVEL% EQU 0 (
        echo [SUCCESS] Database 'homestay_booking' exists!
    ) else (
        echo [ERROR] Failed to create database
        goto :error
    )
)

echo.
echo Verifying database...
psql -U postgres -c "\l" | findstr homestay_booking
echo.

echo ============================================
echo Database setup complete!
echo ============================================
echo.
echo Database: homestay_booking
echo User: postgres
echo Port: 5432
echo.
echo Next: Run the backend application
echo   cd backend
echo   mvnw spring-boot:run
echo.
pause
exit /b 0

:error
echo.
echo ============================================
echo Setup failed!
echo ============================================
echo.
echo Please check:
echo 1. PostgreSQL service is running
echo 2. Password is correct (default: postgres)
echo 3. Port 5432 is not blocked
echo.
pause
exit /b 1

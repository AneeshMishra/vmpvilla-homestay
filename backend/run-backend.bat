@echo off
echo ============================================
echo Starting Homestay Booking Backend
echo ============================================
echo.

REM Set JAVA_HOME if not set
if "%JAVA_HOME%"=="" (
    echo Setting JAVA_HOME...
    set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
    echo JAVA_HOME set to: %JAVA_HOME%
)

REM Verify Java
echo Checking Java...
"%JAVA_HOME%\bin\java.exe" -version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Java not found at %JAVA_HOME%
    echo Please verify Java installation
    pause
    exit /b 1
)

echo.
echo ============================================
echo Building and Running Backend...
echo ============================================
echo.
echo This may take a few minutes on first run...
echo (Maven will download dependencies)
echo.

REM Run Maven
call mvnw.cmd clean spring-boot:run

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ============================================
    echo Backend failed to start!
    echo ============================================
    echo.
    echo Common issues:
    echo 1. PostgreSQL not running
    echo 2. Database 'homestay_booking' not created
    echo 3. Wrong database password in backend\.env
    echo.
    echo Check the error messages above
    pause
    exit /b 1
)

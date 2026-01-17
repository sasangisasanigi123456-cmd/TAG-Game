@echo off
REM Quick Start Script for Tag Game
REM This script will start a local web server

echo.
echo ================================
echo   Tag Game - Local Server
echo ================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python not found. Checking for Python 3...
    py --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Python is not installed or not in PATH
        echo.
        echo Please install Python from: https://www.python.org/downloads/
        echo Make sure to check "Add Python to PATH" during installation
        echo.
        pause
        exit /b 1
    )
    set PYTHON=py
) else (
    set PYTHON=python
)

echo Starting web server on http://localhost:8000
echo.
echo Press CTRL+C to stop the server
echo.

cd /d "%~dp0"

%PYTHON% -m http.server 8000

if %errorlevel% neq 0 (
    echo.
    echo Server failed to start. Trying alternative method...
    %PYTHON% -m SimpleHTTPServer 8000
)

pause

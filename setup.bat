@echo off

:: Ensure we're in the correct directory
cd /d "%~dp0"

:: Check if Python is installed
python --version 2>NUL
if errorlevel 1 (
    echo Python could not be found. Please install Python and try again.
    exit /b 1
)

:: Check if pip is installed
pip --version 2>NUL
if errorlevel 1 (
    echo pip could not be found. Please install pip and try again.
    exit /b 1
)

:: Install requirements
pip install -r requirements.txt

:: Run the Python script to download FingerprintJS
python download_fingerprintjs.py

echo Setup complete. The extension is ready to use.
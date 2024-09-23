#!/bin/bash

# Ensure we're in the correct directory
cd "$(dirname "$0")"

# Check if Python is installed
if ! command -v python3 &> /dev/null
then
    echo "Python3 could not be found. Please install Python3 and try again."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null
then
    echo "pip3 could not be found. Please install pip3 and try again."
    exit 1
fi

# Install requirements
pip3 install -r requirements.txt

# Run the Python script to download FingerprintJS
python3 download_fingerprintjs.py

echo "Setup complete. The extension is ready to use."
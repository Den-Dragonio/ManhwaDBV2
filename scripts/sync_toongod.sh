#!/bin/bash

# --- ToonGod Sync Helper ---

PYTHON="/Library/Frameworks/Python.framework/Versions/3.14/bin/python3"

# 1. Install dependencies if needed
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    $PYTHON -m venv venv
    source venv/bin/activate
    pip install -r scripts/requirements.txt
else
    source venv/bin/activate
fi

# 2. Check for service account key
if [ ! -f "scripts/serviceAccount.json" ]; then
    echo "ERROR: scripts/serviceAccount.json not found!"
    echo "Please place your Firebase Service Account JSON key in the scripts folder."
    exit 1
fi

# 3. Run the scraper
echo "Starting synchronization..."
python scripts/scraper.py "$@"

echo "Done!"

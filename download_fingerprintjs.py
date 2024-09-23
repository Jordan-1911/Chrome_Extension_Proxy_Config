import os
import requests
import json

def download_fingerprintjs():
    # URL to get the latest release info
    url = "https://api.github.com/repos/fingerprintjs/fingerprintjs/releases/latest"

    try:
        # Get the latest release info
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        release_info = json.loads(response.text)

        # Find the browser.min.js asset
        browser_min_js = next((asset for asset in release_info['assets'] if asset['name'] == 'fingerprint.min.js'), None)

        if browser_min_js:
            # Download the file
            file_url = browser_min_js['browser_download_url']
            file_response = requests.get(file_url)
            file_response.raise_for_status()

            # Ensure the lib directory exists
            os.makedirs('lib', exist_ok=True)

            # Save the file
            with open(os.path.join('lib', 'fingerprint.min.js'), 'wb') as f:
                f.write(file_response.content)

            print("Successfully downloaded fingerprint.min.js")
        else:
            print("Could not find fingerprint.min.js in the latest release")

    except requests.RequestException as e:
        print(f"An error occurred while downloading FingerprintJS: {e}")

if __name__ == "__main__":
    download_fingerprintjs()
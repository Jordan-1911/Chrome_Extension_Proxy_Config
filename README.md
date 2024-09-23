# Browser Fingerprint Extension

## Motivation

In the world of web scraping, SEO tasks, and social media account management, it's crucial to avoid being flagged by automated detection systems. Websites often employ sophisticated methods to identify and block automated traffic by checking various factors such as IP addresses, user agents, and browser fingerprints.

This extension leverages [FingerprintJS](https://fingerprintjs.com/) to provide detailed insights into your browser's fingerprint. It allows developers and digital professionals to:

- Test web applications using different proxies
- Understand how their browser appears to websites
- Modify user agents and other identifiable information

By using this tool, you can better understand and control your digital footprint, making it easier to perform necessary tasks without triggering automated blocking systems.

## Installation

### Prerequisites

- Google Chrome browser
- Python 3.x

### Setup

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/browser-fingerprint-extension.git
   cd browser-fingerprint-extension
   ```

2. Run the setup script:
   - On macOS:
     ```
     chmod +x setup.sh
     ./setup.sh
     ```
   - On Windows:
     ```
     setup.bat
     ```

   This will download the necessary dependencies, including the latest version of FingerprintJS.

3. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked" and select the directory containing this extension

## Usage

1. Click on the extension icon in Chrome to open the popup
2. View your current browser fingerprint information
3. Modify proxy settings and user agent as needed
4. Click "Apply Settings" to update your configuration

## Disclaimer

This tool is intended for legitimate development and testing purposes only. Always respect websites' terms of service and legal requirements when performing web-related tasks.

## Acknowledgements

This project uses [FingerprintJS](https://fingerprintjs.com/), an open-source library for browser fingerprinting.

## License

[MIT License](LICENSE)
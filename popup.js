document.addEventListener('DOMContentLoaded', function() {
  const deviceTypeSelect = document.getElementById('deviceType');
  const userAgentSelect = document.getElementById('userAgent');
  const proxyForm = document.getElementById('proxyForm');
  const browserInfoDiv = document.getElementById('browserInfo');

  // Populate device types
  deviceTypeSelect.addEventListener('change', function() {
    populateUserAgents(this.value);
  });

  function populateUserAgents(deviceType) {
    chrome.runtime.sendMessage({ action: "getUserAgents", deviceType: deviceType }, (response) => {
      userAgentSelect.innerHTML = '';
      response.userAgents.forEach(ua => {
        const option = document.createElement('option');
        option.value = ua.userAgent;
        option.textContent = `${ua.browser} ${ua.version} (${ua.os})`;
        userAgentSelect.appendChild(option);
      });
    });
  }

  // Initial population of user agents
  populateUserAgents('desktop');

  // Handle form submission
  proxyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const host = document.getElementById('proxyHost').value;
    const port = parseInt(document.getElementById('proxyPort').value, 10);
    const userAgent = userAgentSelect.value;

    const config = {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: "http",
          host: host,
          port: port
        },
        bypassList: ["localhost"]
      }
    };

    chrome.runtime.sendMessage({ 
      action: "setProxyAndUserAgent", 
      config: config,
      userAgent: userAgent
    }, (response) => {
      if (response.success) {
        alert("Proxy settings and User Agent updated successfully!");
        displayBrowserFingerprint();
      } else {
        alert("Failed to update settings.");
      }
    });
  });

  // Function to display browser fingerprint using FingerprintJS
  async function displayBrowserFingerprint() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    let infoHTML = '<h2>Browser Fingerprint</h2>';
    infoHTML += `<p><strong>Visitor ID:</strong> ${result.visitorId}</p>`;
    
    for (const [key, value] of Object.entries(result.components)) {
      infoHTML += `<p><strong>${key}:</strong> ${JSON.stringify(value)}</p>`;
    }

    browserInfoDiv.innerHTML = infoHTML;
  }

  // Display initial browser fingerprint
  displayBrowserFingerprint();
});
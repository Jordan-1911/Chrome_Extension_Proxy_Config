document.addEventListener('DOMContentLoaded', function() {
  const deviceTypeSelect = document.getElementById('deviceType');
  const userAgentSelect = document.getElementById('userAgent');
  const proxyForm = document.getElementById('proxyForm');
  const fingerprintInfoDiv = document.getElementById('fingerprintInfo');

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
    
    // Display Headers/User Agent
    infoHTML += '<h3>Headers/User Agent</h3>';
    infoHTML += `<p><strong>User Agent:</strong> ${result.components.userAgent.value}</p>`;

    // Display WebRTC status
    infoHTML += '<h3>WebRTC Status</h3>';
    infoHTML += `<p><strong>WebRTC Enabled:</strong> ${result.components.webRtcSupport ? 'Yes' : 'No'}</p>`;

    // Display Operating System
    infoHTML += '<h3>Operating System</h3>';
    infoHTML += `<p><strong>OS:</strong> ${result.components.os ? result.components.os.value : 'Not available'}</p>`;

    // Display CPU Info
    infoHTML += '<h3>CPU Information</h3>';
    infoHTML += `<p><strong>CPU Cores:</strong> ${result.components.hardwareConcurrency ? result.components.hardwareConcurrency.value : 'Not available'}</p>`;

    // Display other relevant information
    infoHTML += '<h3>Additional Information</h3>';
    infoHTML += `<p><strong>Time Zone:</strong> ${result.components.timezone ? result.components.timezone.value : 'Not available'}</p>`;
    infoHTML += `<p><strong>Screen Resolution:</strong> ${result.components.screenResolution ? result.components.screenResolution.value.join('x') : 'Not available'}</p>`;
    infoHTML += `<p><strong>Color Depth:</strong> ${result.components.colorDepth ? result.components.colorDepth.value : 'Not available'}</p>`;
    infoHTML += `<p><strong>Device Memory:</strong> ${result.components.deviceMemory ? result.components.deviceMemory.value + ' GB' : 'Not available'}</p>`;
    infoHTML += `<p><strong>Languages:</strong> ${result.components.languages ? result.components.languages.value.join(', ') : 'Not available'}</p>`;

    // Display Canvas and WebGL Fingerprints
    infoHTML += '<h3>Fingerprints</h3>';
    infoHTML += `<p><strong>Canvas Fingerprint:</strong> ${result.components.canvas ? result.components.canvas.value : 'Not available'}</p>`;
    infoHTML += `<p><strong>WebGL Vendor:</strong> ${result.components.webGlVendorAndRenderer ? result.components.webGlVendorAndRenderer.value.split('~')[0] : 'Not available'}</p>`;
    infoHTML += `<p><strong>WebGL Renderer:</strong> ${result.components.webGlVendorAndRenderer ? result.components.webGlVendorAndRenderer.value.split('~')[1] : 'Not available'}</p>`;

    // Display Fonts
    infoHTML += '<h3>Fonts</h3>';
    infoHTML += `<p><strong>Installed Fonts:</strong> ${result.components.fonts ? result.components.fonts.value.join(', ') : 'Not available'}</p>`;

    // Display Visitor ID
    infoHTML += '<h3>Visitor ID</h3>';
    infoHTML += `<p><strong>Unique Visitor ID:</strong> ${result.visitorId}</p>`;

    fingerprintInfoDiv.innerHTML = infoHTML;
  }

  // Display initial browser fingerprint
  displayBrowserFingerprint();
});
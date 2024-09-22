document.getElementById('proxyForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const host = document.getElementById('proxyHost').value;
    const port = parseInt(document.getElementById('proxyPort').value, 10);
  
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
  
    chrome.runtime.sendMessage({ action: "setProxy", config: config }, (response) => {
      if (response.success) {
        alert("Proxy settings updated successfully!");
      } else {
        alert("Failed to update proxy settings.");
      }
    });
  });
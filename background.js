chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ proxyConfig: {} });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "setProxy") {
      chrome.proxy.settings.set(
        { value: message.config, scope: "regular" },
        () => {
          sendResponse({ success: true });
        }
      );
      return true;
    }
  });
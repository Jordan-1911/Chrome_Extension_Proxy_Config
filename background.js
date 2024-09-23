const userAgentData = {
  desktop: [],
  mobile: [],
  tablet: []
};

function loadUserAgents() {
  fetch('Desktop_Common_Useragents.json')
    .then(response => response.json())
    .then(data => userAgentData.desktop = data);
  
  fetch('Mobile_Common_Useragents.json')
    .then(response => response.json())
    .then(data => userAgentData.mobile = data);
  
  fetch('iPad_Useragents.json')
    .then(response => response.json())
    .then(data => userAgentData.tablet = data);
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ proxyConfig: {}, userAgent: '' });
  loadUserAgents();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "setProxyAndUserAgent") {
    chrome.proxy.settings.set(
      { value: message.config, scope: "regular" },
      () => {
        chrome.storage.local.set({ userAgent: message.userAgent }, () => {
          updateUserAgentRule(message.userAgent);
          sendResponse({ success: true });
        });
      }
    );
    return true;
  } else if (message.action === "getUserAgents") {
    sendResponse({ userAgents: userAgentData[message.deviceType] });
    return true;
  }
});

function updateUserAgentRule(userAgent) {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [{
      "id": 1,
      "priority": 1,
      "action": {
        "type": "modifyHeaders",
        "requestHeaders": [
          { "header": "User-Agent", "operation": "set", "value": userAgent }
        ]
      },
      "condition": {
        "urlFilter": "*",
        "resourceTypes": ["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"]
      }
    }]
  });
}
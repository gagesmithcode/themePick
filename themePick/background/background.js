/*
 * Project       : ThemePick Extension
 * FileName      : background.js
 * Author        : Gage Smith
 * Description   :
 *
 */

var tabUrl;
var tabId;

var colorFlag = true;
//Listening on port to determine whether the theme is toggled on or off
chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name == "porty");
  port.onMessage.addListener(function (msg) {
    if (msg.state == "enabled") colorFlag = true;
    if (msg.state == "disabled") colorFlag = false;
  });
});
//Add a listener for a function
chrome.tabs.onCreated.addListener(changeColor);

//Enabling web navigation to have the changeColor function fire before loading of the webpage
chrome.webNavigation.onBeforeNavigate.addListener(function () {
  tabQuery();
  changeColor();
});

chrome.webNavigation.onCommitted.addListener(function () {
  tabQuery();
  changeColor();
});
//Take the incoming tab id and check if it is a Blackboard page
//If blackboard then layer the css over it
function changeColor() {
  if (colorFlag) {
    if (
      (tabUrl && tabUrl.indexOf("learn.csuchico.edu") != -1) ||
      (tabUrl && tabUrl.indexOf("shibboleth.csuchico.edu") != -1)
    ) {
      // window.alert("BEFORE");
      chrome.tabs.insertCSS(tabId, {
        file: "styles/blackboard.css",
        allFrames: true,
        runAt: "document_start",
      });
    }
  }
}

//Function to get the current active Url and tab ID
//TODO: make available for only the sites list dynamically
function tabQuery() {
  chrome.tabs.query(
    { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
    function (curTab) {
      if (
        (curTab[0].pendingUrl &&
          curTab[0].pendingUrl.indexOf("csuchico.edu") != -1) ||
        (curTab[0].pendingUrl &&
          curTab[0].pendingUrl.indexOf("shibboleth.csuchico.edu") != -1)
      ) {
        tabUrl = curTab[0].pendingUrl;
        tabId = curTab[0].id;
      }
    }
  );
}

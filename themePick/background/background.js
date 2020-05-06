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
chrome.webNavigation.onBeforeNavigate.addListener(function ({ tabId: tabId }) {
  chrome.tabs.query(
    { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
    function (curTab) {
      if (curTab[0].url && curTab[0].url.indexOf("csuchico.edu") != -1) {
        tabUrl = curTab[0].url;
        tabId = curTab[0].id;
      }
    }
  );
  changeColor();
});

chrome.webNavigation.onCommitted.addListener(function () {
  changeColor();
});
//Take the incoming tab id and check if it is a Blackboard page
//If blackboard then layer the css over it
function changeColor() {
  // var tabUrl = tab.url;
  if (colorFlag) {
    // if (tabUrl && tabUrl.indexOf("learn.csuchico.edu") != -1) {
    if (tabUrl && tabUrl.indexOf("csuchico.edu") != -1) {
      // window.alert("BEFORE");
      chrome.tabs.insertCSS(tabId, {
        file: "styles/blackboard.css",
        allFrames: true,
        runAt: "document_start",
      });
    }
  }
}

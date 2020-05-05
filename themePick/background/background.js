/*
 * Project       : ThemePick Extension
 * FileName      : background.js
 * Author        : Gage Smith
 * Description   :
 *
 */
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

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  if (info.status == "complete" && colorFlag == true) {
    changeColor(tab);
  }
});

//Take the incoming tab id and check if it is a Blackboard page
//If blackboard then layer the css over it
function changeColor(tab) {
  var tabUrl = tab.url;
  if (colorFlag) {
    if (tabUrl && tabUrl.indexOf("learn.csuchico.edu") != -1) {
      chrome.tabs.insertCSS(tab.id, { file: "styles/blackboard.css" });
    }
  }
}


/*
 * Project       : ThemePick Extension
 * FileName      : background.js
 * Author        : Gage Smith
 * Description   :
 *
 */

chrome.runtime.onInstalled.addListener(function () {
  // chrome.storage.sync.set({ color: "#212121" }, function () {
  // });

  //This portion will create the functionallity difference where the user can actually interact with popup.html
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            // pageUrl: {hostEquals: 'developer.chrome.com'}, //This portion says what hosts should be effected by the extension. Need to get to work for all hosts
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});


//Add a listener for a function
chrome.tabs.onCreated.addListener(changeColor);

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (info.status == 'complete') changeColor(tab);
});


//Take the incoming tab id and check if it is a Blackboard page
//If blackboard then layer the css over it
function changeColor(tab) {
  var tabUrl = tab.url;
  if (tabUrl && tabUrl.indexOf("learn.csuchico.edu") != -1) {
    chrome.tabs.insertCSS(tab.id, {file: "styles/blackboard.css"});
  }
  // if (tabUrl && tabUrl.indexOf("google.com") != -1) {
  //   chrome.tabs.insertCSS(tab.id, {file: "mystyles.css"});
  // }
}
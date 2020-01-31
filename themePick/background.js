/*
 * Project       : ThemePick Extension
 * FileName      : background.js
 * Author        : Gage Smith
 * Description   :
 *
*/

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#666666'}, function() {
    console.log("The color is grey.");
  });

//This portion will create the functionallity difference where the user can actually interact with popup.html
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
      ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});

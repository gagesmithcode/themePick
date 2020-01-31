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
});

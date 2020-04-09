/*
 * Project       : ThemePick Extension
 * FileName      : popup.js
 * Author        : Gage Smith
 * Description   :
 *
*/

//this grabs the button from popup.html and requests the color value from storage
//Then it applies that color as the backround of the button
// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

//This should add logic for further user interaction
//This is an "onclick" event for the changecolor functionality of the button
// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//       tabs[0].id,
//       {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };
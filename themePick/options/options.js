/*
 * Project       : ThemePick Extension
 * FileName      : options.js
 * Author        : Gage Smith
 * Description   :
 *
*/
//this portion adds logic to the options html file
let page = document.getElementById('buttonDiv');

//This is a const object of the four color options you can chose from on the page as background colors
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1', '#666666'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
      console.log('color is' + item);
      })
    });
    page.appendChild(button);
  }
}

constructOptions(kButtonColors);

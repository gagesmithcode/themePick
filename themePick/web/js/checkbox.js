function App() {}

App.prototype.setState = function (state) {
  localStorage.setItem("checked", state);
};

App.prototype.getState = function () {
  return localStorage.getItem("checked");
};

function init() {
  var app = new App();
  var state = app.getState();
  //TODO: create a checkbox specifically for other sites 
  var blackboard = document.querySelector("#blackboard");
  var google = document.querySelector("#google");

  if (state == "true") {
    blackboard.checked = true;
  }
  var ref = window.location.href;
  //Making sure that the checkbox event listener only fires on sites.html
  if (ref && ref.indexOf("sites.html") != -1) {
    blackboard.addEventListener("click", function () {
      app.setState(blackboard.checked);
      chrome.tabs.reload();
    });
    //Set up the port to communicate with background.js
    var port = chrome.runtime.connect({ name: "porty" });
    if (blackboard.checked == true) port.postMessage({ state: "enabled" });
    else if (blackboard.checked == false) port.postMessage({ state: "disabled" });
  }
}

init();

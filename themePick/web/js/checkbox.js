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
  var checkbox = document.querySelector("#themeOn");

  if (state == "true") {
    checkbox.checked = true;
  }
  var ref = window.location.href;
  //Making sure that the checkbox event listener only fires on sites.html
  if (ref && ref.indexOf("sites.html") != -1) {
    checkbox.addEventListener("click", function () {
      app.setState(checkbox.checked);
      chrome.tabs.reload();
    });
    var port = chrome.runtime.connect({ name: "porty" });
    if (checkbox.checked == true) port.postMessage({ state: "enabled" });
    else if (checkbox.checked == false) port.postMessage({ state: "disabled" });
  }
}

init();

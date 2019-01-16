const { ipcRenderer } = require("electron");

function openAddWindow() {
  ipcRenderer.send("open-add-window");
}

document
  .getElementById("openAddWindow")
  .addEventListener("click", openAddWindow);

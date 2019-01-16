const { ipcRenderer } = require("electron");

function submitForm(e) {
  e.preventDefault();
  let input = e.target[0];
  ipcRenderer.send("add-todo", input.value);
  input.value = "";
}

document.forms[0].addEventListener("submit", submitForm);

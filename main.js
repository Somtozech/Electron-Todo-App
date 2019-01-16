const { app } = require("electron");
const { join } = require("path");

const Window = require("./window");

let mainWindow;

//create browser window
function createWindow() {
  mainWindow = new Window({ file: join(__dirname, "src", "index.html") });
}

app.on("ready", createWindow);

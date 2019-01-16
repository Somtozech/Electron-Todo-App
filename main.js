const { app, ipcMain } = require("electron");
const { join } = require("path");

const Window = require("./window");

let mainWindow;
let addWindow;

//create main window
function createWindow() {
  mainWindow = new Window({ file: join(__dirname, "src", "index.html") });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

//create Add window
ipcMain.on("open-add-window", () => {
  if (!addWindow) {
    addWindow = new Window({
      file: join(__dirname, "src", "add.html"),
      width: 400,
      height: 300,
      parent: mainWindow
    });
  }

  addWindow.on("closed", () => {
    addWindow = null;
  });
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

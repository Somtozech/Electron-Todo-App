const { app, ipcMain } = require("electron");
const { join } = require("path");

const Window = require("./window");
const DataStore = require("./store");

let mainWindow;
let addWindow;
const todosData = new DataStore({ name: "todos" });

//create main window
function createWindow() {
  mainWindow = new Window({ file: join(__dirname, "src", "index.html") });

  mainWindow.once("show", () => {
    mainWindow.webContents.send("todos", todosData.todos);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

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

  //add todo item and send to the mainwindow
  ipcMain.on("add-todo", (e, todo) => {
    const updatedTodos = todosData.addTodo(todo).todos;
    mainWindow.webContents.send("todos", updatedTodos);
  });

  //delete todo item
  ipcMain.on("delete-todo", (e, todo) => {
    const updatedTodos = todosData.deleteTodo(todo).todos;
    mainWindow.webContents.send("todos", updatedTodos);
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

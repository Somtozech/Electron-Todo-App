const { ipcRenderer } = require("electron");

function openAddWindow() {
  ipcRenderer.send("open-add-window");
}

//delete Todo
function deleteTodo(e) {
  ipcRenderer.send("delete-todo", e.target.previousSibling.textContent);
}

//add todo list to UI
function addTodo() {
  return (e, todos) => {
    const todoList = document.getElementById("todoList");
    const todoItems = todos.reduce((html, todo) => {
      html += `<li class="list-group-item ">${todo}<a class="float-right text-muted close">&times;</a>
              </li>`;
      return html;
    }, "");

    todoList.innerHTML = todoItems;

    document.querySelectorAll(".close").forEach(closeBtn => {
      closeBtn.addEventListener("click", deleteTodo);
    });
  };
}

document
  .getElementById("createTodoBtn")
  .addEventListener("click", openAddWindow);

ipcRenderer.on("todos", addTodo());

const path = require("path");
const fs = require("fs");

class Store {
  constructor(options) {
    options = options || {};
    options.name = options.name || "config";
    options.fileExtension = ".json";
    const defaultCwd = path.join(__dirname);
    options.cwd =
      options.cwd && path.isAbsolute(options.cwd) ? options.cwd : defaultCwd;

    this.path = path.resolve(
      options.cwd,
      `${options.name}${options.fileExtension}`
    );

    this.todos = this.get("todos") || [];
  }

  //creates a datastore(json file) for storing the data
  set(key, value) {
    try {
      let data = { [key]: value };
      data = JSON.stringify(data);
      fs.writeFileSync(this.path, data);
    } catch (err) {
      console.log(err.message);
    }
  }

  //reads data from datastore
  get(key) {
    try {
      let data = fs.readFileSync(this.path, "utf8");
      data = JSON.parse(data);
      return data[key];
    } catch (err) {
      console.log(err.message);
      return undefined;
    }
  }

  saveTodos() {
    this.set("todos", this.todos);

    //this enables chaining with other methods
    return this;
  }

  getTodos() {
    this.todos = this.get("todos") || [];
    return this;
  }

  addTodo(todo) {
    this.todos = [...this.todos, todo];
    return this.saveTodos();
  }

  deleteTodo(todo) {
    this.todos = this.todos.filter(t => t !== todo);

    return this.saveTodos();
  }
}

module.exports = Store;

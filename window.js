const { BrowserWindow } = require("electron");

//default BrowserWindow size
const defaultProps = {
  width: 800,
  height: 500,
  show: false
};

class Window extends BrowserWindow {
  constructor({ file, ...windowSettings }) {
    super({ ...defaultProps, ...windowSettings });

    this.loadURL(`file://${file}`);

    this.once("ready-to-show", () => this.show());
  }
}

module.exports = Window;

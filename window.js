const { BrowserWindow } = require("electron");

//default BrowserWindow size
const defaultProps = {
  width: 800,
  height: 500
};

class Window extends BrowserWindow {
  constructor({ file, ...windowSettings }) {
    super({ ...defaultProps, ...windowSettings });

    this.loadURL(`file://${file}`);
  }
}

module.exports = Window;

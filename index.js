const request = require('request');
const electron = require('electron');
const { app, BrowserWindow } = require('electron');

let win;

function createWindow () {
  let win = new BrowserWindow({ width: 1500, height: 900, icon:'favicon.ico' })
  win.setMenu(null);
  win.loadFile('index.html')
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

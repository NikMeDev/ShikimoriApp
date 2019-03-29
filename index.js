const request = require('request');
const electron = require('electron');
const { ipcMain,app, BrowserWindow } = require('electron');

let win;

function createWindow () {
  let win = new BrowserWindow({ width: 1500, height: 900, icon:'favicon.ico' })
  win.setMenu(null);
  win.loadFile('index.html')
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    pids.forEach(function(pid) {
      // A simple pid lookup
      process.kill( pid );
    });
    app.quit()
  }
});

var pids = [];

ipcMain.on('pid-message', function(event, arg) {
  console.log('Main:', arg);
  pids.push(arg);
});


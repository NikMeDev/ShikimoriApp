const request = require('request');
const child_process = require('child_process');
const discordNode = child_process.fork('discordrpc.js', {detached: true})
const electron = require('electron');
const { ipcRenderer, ipcMain, app, BrowserWindow } = require('electron');

let win;

function createWindow () {
  let win = new BrowserWindow({ width: 1500, height: 900, icon:'favicon.ico' })
  win.setMenu(null);
  win.loadFile('index.html')
  ipcMain.on('redirect-message', function(event, arg) {
    console.log('ID:', arg);
    win.loadURL('https://play.shikimori.org/animes/' + arg + '/video_online/1')
    win.webContents.once('dom-ready', () => {
    win.webContents.executeJavaScript('var x = document.getElementsByClassName("l-top_menu");')
    win.webContents.executeJavaScript('document.body.removeChild(x[0]);')
    win.webContents.executeJavaScript('const { ipcRenderer } = require("electron")')
    win.webContents.executeJavaScript('episodeNow = document.getElementsByClassName("b-video_player")[0]')
    console.log("SHH");
    win.webContents.executeJavaScript('ipcRenderer.send("next-episode", episodeNow.dataset.episode)')
  })
  });
  win.webContents.on('did-navigate-in-page', (event, url) => {
    console.log("УХХ");
    var episodeName = win.webContents.getTitle()
    if (episodeName !== 'index.html') {
      console.log('done')
        console.log("Hmm")
        win.webContents.executeJavaScript('episodeNow = document.getElementsByClassName("b-video_player")[0]')
        win.webContents.executeJavaScript("console.log(episodeNow.dataset.episode);")
        win.webContents.executeJavaScript('ipcRenderer.send("next-episode", episodeNow.dataset.episode)')
    }
  })
  var anime = null;
  ipcMain.on('anime-message', function(event, arg) {
  ipcMain.on('next-episode', function(event, episodeNow) {
    console.log('navigate');
      var episodeName = win.webContents.getTitle()
      console.log(episodeName);
      var episodeFound = episodeName.search(/video_online/);
      episodeFound = episodeFound + 13;
      console.log(episodeFound);
      var episodeSliced = episodeName.slice(episodeFound)
      var episode = episodeSliced.split(' ')[0];
      arg.episode = episodeNow;
      console.log(episode);
      console.log(arg.episode)
      discordNode.send(arg)
  })
  })

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
      if (pids) process.kill( pid );
    });
    app.quit()
  }
});

var pids = [];

pids.push(discordNode.pid);
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// Custom modules
const { initDatabase, getAllBackups, insertBackup, deleteBackup, closeDatabase } = require('./utils/database.js');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: true,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./app/index.html')


  // when the window is ready to show, send the renderBackups event
  mainWindow.webContents.on('did-finish-load', () => {
    // Fetch all backups from the database and send them to the renderer process
    getAllBackups((backupList) => {
      mainWindow.webContents.send('renderBackups', backupList);
    });
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// Hide the menu bar
app.on('browser-window-created', (event, win) => {
  win.setAutoHideMenuBar(true)
})

// This method will be called when Electron has finished
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

try {
  require('electron-reloader')(module)
} catch (_) {}

// database functions
app.on('ready', () => {
  initDatabase();
});

app.on('before-quit', () => {
  closeDatabase();
});

ipcMain.on('deleteBackup', (event, id) => {
  // Call the deleteBackup function with the provided ID
  deleteBackup(id);
  // Send a confirmation message to the renderer process
  event.reply('backupDeleted', id);
});

// ipcMain.on('restoreToBackup', (event, id) => {
//   // Call the deleteBackup function with the provided ID
//   restoreToBackup(id);
//   // Send a confirmation message to the renderer process
//   event.reply('restoredToBackup', id);
// });
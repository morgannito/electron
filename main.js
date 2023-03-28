// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
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
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./app/index.html')

  // Fetch all backups from the database and send them to the renderer process
  getAllBackups((backupList) => {
    mainWindow.webContents.send('renderBackups', backupList);
    console.log('Backups:');
    console.log(backupList);
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// Hide the menu bar
//! commented for development purposes
// app.whenReady().then(() => {
//   // Create an empty menu
//   const menu = Menu.buildFromTemplate([]);
//   // Set the application menu
//   Menu.setApplicationMenu(menu);
// });

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.on('ready', () => {
  initDatabase();
  // insertBackup('2022/04/01', '12:34:56', '10 MB', 'database', '/path/to/backup.db');
  // insertBackup('2022/04/24', '00:00:00', '15 MB', 'asrt', '/path/to/ast.db');
});

// When the app is about to quit, close the database connection
app.on('before-quit', () => {
  closeDatabase();
});

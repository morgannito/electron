const { ipcRenderer } = require('electron')

const settingsLink = document.getElementById('settings-link');
settingsLink.addEventListener('click', (event) => {
  event.preventDefault();
  ipcRenderer.send('change-page', 'settings');
});

const backupLink = document.getElementById('backups-link');
backupLink.addEventListener('click', (event) => {
  event.preventDefault();
  ipcRenderer.send('change-page', 'backups');
});

const homeLink = document.getElementById('home-link');
homeLink.addEventListener('click', (event) => {
  event.preventDefault();
  ipcRenderer.send('change-page', 'home');
});
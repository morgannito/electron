/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

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


const loadingIcon = document.querySelector('.loading-icon');

const backupNowButton = document.createElement('button');
backupNowButton.textContent = 'Backup Now';
backupNowButton.className = 'backup-now';
backupNowButton.addEventListener('click', () => {
  const confirmed = confirm('Are you sure you want to backup your data now?');
  if (confirmed) {
    console.log('psudo backup now ..');
    loadingIcon.classList.add('visible');
    ipcRenderer.send('backup-now');
  }
});
document.querySelector('div.button-boy').appendChild(backupNowButton);


ipcRenderer.on('backup-done', (event) => {
  // loadingIcon.classList.remove('visible');
  console.log('backup done.');
});
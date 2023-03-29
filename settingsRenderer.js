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


const saveChangesButton = document.createElement('button');
saveChangesButton.textContent = 'Save Changes';
saveChangesButton.addEventListener('click', () => {
  const confirmed = confirm('Are you sure you want to save changes?');
  if (confirmed) {
    const locationInput = document.getElementById('location');
    const frequencySelect = document.getElementById('frequency');
    const timeInput = document.getElementById('time');
    const mysqlhostInput = document.getElementById('mysqlhost');
    const mysqlportInput = document.getElementById('mysqlport');
    const mysqluserInput = document.getElementById('mysqluser');
    const mysqldatabaseInput = document.getElementById('mysqldatabase');
    const mysqlpasswordInput = document.getElementById('mysqlpassword');
    const ftphostInput = document.getElementById('ftphost');
    const ftpportInput = document.getElementById('ftpport');
    const ftpuserInput = document.getElementById('ftpuser');
    const ftppasswordInput = document.getElementById('ftppassword');
    const newSettings = {
      location: locationInput.value,
      frequency: frequencySelect.value,
      time: timeInput.value,
      mysqlhost: mysqlhostInput.value,
      mysqlport: mysqlportInput.value,
      mysqluser: mysqluserInput.value,
      mysqldatabase: mysqldatabaseInput.value,
      mysqlpassword: mysqlpasswordInput.value,
      ftphost: ftphostInput.value,
      ftpport: ftpportInput.value,
      ftpuser: ftpuserInput.value,
      ftppassword: ftppasswordInput.value,
    };
    // save changes to JSON file using IPC message
    ipcRenderer.send('save-settings', newSettings);
  }
});
document.querySelector('main').appendChild(saveChangesButton);
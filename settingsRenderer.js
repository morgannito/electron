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
    const newSettings = {
      location: locationInput.value,
      frequency: frequencySelect.value,
      time: timeInput.value
    };
    // save changes to JSON file using IPC message
    ipcRenderer.send('save-settings', newSettings);
  }
});
document.querySelector('main').appendChild(saveChangesButton);
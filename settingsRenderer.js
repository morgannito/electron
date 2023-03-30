// const { ipcRenderer } = require('electron')

// send request to get settings data
ipcRenderer.send('get-settings-data');

// handle response with settings data
ipcRenderer.on('settings-data', (event, settings) => {
  // set the default values in the form inputs
  document.querySelector('#location').value = settings.location;
  document.querySelector('#frequency').value = settings.frequency;
  document.querySelector('#time').value = settings.time;
  document.querySelector('#mysqlhost').value = settings.mysqlhost;
  document.querySelector('#mysqlport').value = settings.mysqlport;
  document.querySelector('#mysqluser').value = settings.mysqluser;
  document.querySelector('#mysqlpassword').value = settings.mysqlpassword;
  document.querySelector('#ftphost').value = settings.ftphost;
  document.querySelector('#ftpport').value = settings.ftpport;
  document.querySelector('#ftpuser').value = settings.ftpuser;
  document.querySelector('#ftppassword').value = settings.ftppassword;
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
document.querySelector('form').appendChild(saveChangesButton);

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
  document.querySelector('#mysqlcommand').value = settings.mysqlcommand;
  document.querySelector('#ftphost').value = settings.ftphost;
  document.querySelector('#ftpport').value = settings.ftpport;
  document.querySelector('#ftpuser').value = settings.ftpuser;
  document.querySelector('#ftppassword').value = settings.ftppassword;
  document.querySelector('#ftpcommand').value = settings.ftpcommand;
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
    const mysqlcommandInput = document.getElementById('mysqlcommand');
    const ftphostInput = document.getElementById('ftphost');
    const ftpportInput = document.getElementById('ftpport');
    const ftpuserInput = document.getElementById('ftpuser');
    const ftppasswordInput = document.getElementById('ftppassword');
    const ftpcommandInput = document.getElementById('ftpcommand');
    const newSettings = {
      location: locationInput.value,
      frequency: frequencySelect.value,
      time: timeInput.value,
      mysqlhost: mysqlhostInput.value,
      mysqlport: mysqlportInput.value,
      mysqluser: mysqluserInput.value,
      mysqlpassword: mysqlpasswordInput.value,
      mysqlcommand: mysqlcommandInput.value,
      ftphost: ftphostInput.value,
      ftpport: ftpportInput.value,
      ftpuser: ftpuserInput.value,
      ftppassword: ftppasswordInput.value,
      ftpcommand: ftpcommandInput.value,
    };
    // save changes to JSON file using IPC message
    ipcRenderer.send('save-settings', newSettings);

  }
});
document.querySelector('form').appendChild(saveChangesButton);


//todo: make this work
//? have to force reload after saving changes to be able to chance the settings again..

const ftpCommandInput = document.querySelector('#ftpcommand');
const ftpSettings = document.querySelector('#ftp-settings');
const mysqlCommandInput = document.querySelector('#mysqlcommand');
const mysqlSettings = document.querySelector('#mysql-settings');

ftpCommandInput.addEventListener('input', () => {
  if (ftpCommandInput.value) {
    ftpSettings.style.display = 'block';
  } else {
    ftpSettings.style.display = 'none';
  }
});

mysqlCommandInput.addEventListener('input', () => {
  if (mysqlCommandInput.value) {
    mysqlSettings.style.display = 'block';
  } else {
    mysqlSettings.style.display = 'none';
  }
});
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



ipcRenderer.on('renderBackups', (event, backupList) => {
  renderBackups(backupList);
});

ipcRenderer.on('backupDeleted', (event, id) => {
  // Find and remove the row with the corresponding ID
  const table = document.getElementById('backupTableBody');
  const row = table.querySelector(`tr[data-id="${id}"]`);
  if (row) {
    table.removeChild(row);
  }
});

function renderBackups(backupList) {
  console.log('backups received rendering...');
  const table = document.getElementById('backupTableBody');
  backupList.forEach((backup) => {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = "#" + backup.id;
    row.appendChild(idCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = backup.date;
    row.appendChild(dateCell);

    const timeCell = document.createElement('td');
    timeCell.textContent = backup.time;
    row.appendChild(timeCell);

    const sizeCell = document.createElement('td');
    sizeCell.textContent = backup.size;
    row.appendChild(sizeCell);

    const typeCell = document.createElement('td');
    typeCell.textContent = backup.type;
    row.appendChild(typeCell);

    const actionCell = document.createElement('td');
    // Add a Delete button to the action cell
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', () => {
      // Show a confirmation dialog before deleting the backup data
      const confirmDelete = confirm('Are you sure you want to delete this backup?');
      if (confirmDelete) {
        // Delete the backup data from the database and remove the table row
        ipcRenderer.send('deleteBackup', backup.id);
      }
    });
    actionCell.appendChild(deleteButton);

    // Add a Restore button to the action cell
    const restoreButton = document.createElement('button');
    restoreButton.textContent = 'Restore';
    restoreButton.className = 'restore';

    // Add an event listener to restore the backup data when the button is clicked
    restoreButton.addEventListener('click', () => {
      const confirmRestore = confirm('Are you sure you want to restore to this version?');
      if (confirmRestore) {
        ipcRenderer.send('restoreToBackup', backup.id);
      console.log(`Restoring backup with ID: ${backup.id}`);
      }
    });

    actionCell.appendChild(restoreButton);

    row.appendChild(actionCell);

    table.appendChild(row);
  });
}

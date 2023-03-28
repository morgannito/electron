/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

// ipcRenderer.on('backups', (event, backups) => {
//     updateUI(backups);
//   });

function renderBackups(backupList) {
    const table = document.getElementById('backupTable');

    backupList.forEach((backup) => {
      const row = document.createElement('tr');

      const idCell = document.createElement('td');
      idCell.textContent = backup.id;
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
      // Add buttons or links for actions here
      row.appendChild(actionCell);

      table.appendChild(row);
    });
  }

  module.exports = { renderBackups, };
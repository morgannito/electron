function renderBackups(backupList) {
    const table = document.getElementById('backupTableBody');
    console.log('backupjs called');
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
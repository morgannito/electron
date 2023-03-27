const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Get the path to the database file
const dbPath = path.join(__dirname, '../database/myeleback.db');


function initDatabase() {
  // Open a database connection
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

  // Create the backups table if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS backups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    time TEXT,
    size TEXT,
    type TEXT,
    location TEXT
  )`, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
}

function insertBackup(date, time, size, type, location) {
  // Open a database connection
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

  // Insert a new row into the backups table
  db.run(`INSERT INTO backups (date, time, size, type, location)
    VALUES (?, ?, ?, ?, ?)`, [date, time, size, type, location], (err) => {
    if (err) {
      console.error(err.message);
    } else {
    console.log('A new backup has been added to the database.');
    }
  });

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
}

module.exports = { initDatabase, insertBackup };
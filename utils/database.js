const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Get the path to the database file
const dbPath = path.join(__dirname, '../database/myeleback.db');

// Open a database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// Create the backups table if it doesn't exist
function initDatabase() {
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
}

// Function to get all backups from the database
function getAllBackups(callback) {
  const sql = 'SELECT * FROM backups ORDER BY id DESC';
  db.all(sql, [], (err, backupList) => {
    if (err) {
      console.error(err.message);
    } else {
      callback(backupList);
    }
  });
}

// Function to insert a new backup into the database
function insertBackup(date, time, size, type, location) {
  const sql = `INSERT INTO backups(date, time, size, type, location) VALUES (?, ?, ?, ?, ?)`;
  const values = [date, time, size, type, location];
  db.run(sql, values, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log(`Inserted backup with ID ${this.lastID}`);
  });
}

// Function to delete a backup from the database
function deleteBackup(id) {
  const sql = `DELETE FROM backups WHERE id = ?`;
  db.run(sql, id, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log(`Deleted backup with ID ${id}`);
  });
}

// Function to close the database connection
function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
}

// Export the database functions for use in other modules
module.exports = { initDatabase, getAllBackups, insertBackup, deleteBackup, closeDatabase };

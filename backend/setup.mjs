import {db} from './db.mjs';
//import sqlite3 from 'sqlite3';

//const db = new sqlite3.Database('database.sqlite');

await db.run('DROP TABLE IF EXISTS users');
await db.run('DROP TABLE IF EXISTS jorunal_entries');
await db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
`);
console.log('users table created');
await db.run(`
CREATE TABLE IF NOT EXISTS journal_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
)
`);
console.log('journal-entries created');

// db.serialize(() => {
//     db.run('DROP TABLE IF EXISTS users');
//     db.run('DROP TABLE IF EXISTS jorunal_entries');
//     db.run(`
//         CREATE TABLE IF NOT EXISTS users (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             username TEXT UNIQUE NOT NULL,
//             password TEXT NOT NULL
//         )
//     `);
//     db.run(`
//         CREATE TABLE IF NOT EXISTS journal_entries (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             userId INTEGER NOT NULL,
//             title TEXT NOT NULL,
//             content TEXT NOT NULL,
//             createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//             FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
//         )
//     `);
// });

// export default db;
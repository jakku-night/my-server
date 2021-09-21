const mysql = require('mysql');
const { promisify } = require('util');

const db = mysql.createPool({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'db'
});

db.getConnection((error) => {
    if (error) {
        console.error("[ERROR]: DATABASE IS NOT CONNECTED!!!");
        console.error(error);
    } else {
        console.log("[SUCCESS]: DATABASE IS CONNECTED!!!");
    }
});

db.query = promisify(db.query);

module.exports = db;
const mysql = require('mysql')

const dbConn = mysql.createConnection({
    host: "localhost",
    database: "Stores",
    user: 'root',
    password: 'Jakarta123@'
})

dbConn.query('SELECT "Database connected!" result', (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result[0].result);
})

module.exports = dbConn
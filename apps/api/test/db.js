// mysql connection 
const mysql = require("mysql2/promise")
require("dotenv").config();

const { MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_SCHEMA,
    MYSQL_CONNECTIONS = 5 } = process.env
const pool = mysql.createPool({
    host: MYSQL_HOST,
    password: MYSQL_PASS,
    database: MYSQL_SCHEMA,
    connectionLimit: Number(MYSQL_CONNECTIONS),
    user: MYSQL_USER
})

function getConnection() {
    return pool;
}

module.exports = { getConnection }
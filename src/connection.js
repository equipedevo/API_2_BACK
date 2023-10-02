require('dotenv').config();

const mysql = require('mysql2');

function CreateConnection(){
    return mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

function EndConnection(conn){
    conn.end();
}

module.exports = {CreateConnection, EndConnection};
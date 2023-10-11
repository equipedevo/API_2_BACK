require("dotenv").config();

const mysql = require("mysql2");

function CreateConnection(dev) {
    if(dev || false) {
        return mysql.createConnection({
            host: process.env.DEV_DATABASE_HOST,
            user: process.env.DEV_DATABASE_USERNAME,
            password: process.env.DEV_DATABASE_PASSWORD,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }
    return mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

function EndConnection(conn) {
    conn.end();
}

module.exports = { CreateConnection, EndConnection };
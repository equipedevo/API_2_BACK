"use strict"

const express = require("express");
// const cors = require("cors");
const mysql = require('mysql2')

const PORT = 4000;
const DB_URL = "mysql://cb56ecbzlkb4mnwsmulo:pscale_pw_4IjntQJQHnGhwpmgqnjwgJyJRmFYWwBfOBSXEt3gbhV@aws.connect.psdb.cloud/api_2?ssl={\"rejectUnauthorized\":true}";

const app = express();
// app.use(
//     cors({ origin: ['https://api-2-back.vercel.app'] })
// );

app.listen(
    PORT,
    function() {
        console.log(`BACK API_2 aberto na porta ${PORT} `);
    }
);

app.get(
    '/',
    function(req, res) {
        res.send('BACK está rodando');
    }
);

app.get(
    '/teste',
    async function(req, res) {        
        const dbConn = mysql.createConnection(DB_URL);

        dbConn.query(
            'SHOW TABLES',
            function(err, rows, fields) {
                if(err) {
                    throw err;
                }
            
                res.send(rows);
                console.log(rows);
            }
        );

        dbConn.end();
    }
);

module.exports = app;
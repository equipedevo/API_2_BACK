"use strict"

require('dotenv').config();
const express = require("express");
// const cors = require("cors");
const mysql = require('mysql2');

const Empresa = require("./rotas/Empresa");
const Funcionario = require("./rotas/Funcionario");

const PORT = process.env.PORT || 3001;

const app = express();
// app.use(
//     cors({ origin: ['https://api-2-back.vercel.app'] })
// );

app.listen(
    PORT,
    function() {
        console.log(`API Hermez aberta na porta ${PORT}`);
    }
);

app.get(
    '/',
    function(req, res) {
        res.send('API Hermez');
    }
);

// Teste de conexão temporario
app.get(
    '/teste',
    async function(req, res) {
        const dbConn = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            ssl: {
                rejectUnauthorized: false
            }
        });
        // const dbConn = mysql.createConnection(DB_URL);

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

app.use("/empresa", Empresa);
app.use("/funcionario", Funcionario);

module.exports = app;
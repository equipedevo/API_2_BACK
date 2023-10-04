"use strict"

require('dotenv').config();
const express = require("express");
// const cors = require("cors");

const Empresa = require("./rotas/Empresa");
const Funcionario = require("./rotas/Funcionario");
const Administrador = require("./rotas/Administrador");
const { CreateConnection, EndConnection } = require('./connection');

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
        const dbConn = CreateConnection();
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

        EndConnection(dbConn);
    }
);

app.use("/empresa", Empresa);
app.use("/funcionario", Funcionario);

module.exports = app;
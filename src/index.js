"use strict"

require('dotenv').config();
const express = require("express");
// const cors = require("cors");

const Empresa = require("./rotas/Empresa");
const Funcionario = require("./rotas/Funcionario");
const Chamado = require("./rotas/Chamado");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(require("body-parser").urlencoded({ extended: false }));
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

app.use("/empresa", Empresa);
app.use("/funcionario", Funcionario);
app.use("/chamado", Chamado);

module.exports = app;
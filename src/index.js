"use strict"

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const Empresa = require("./rotas/Empresa");
const Funcionario = require("./rotas/Funcionario");
const Chamado = require("./rotas/Chamado");
const Chat = require("./rotas/Chat");
const Relatorio = require("./rotas/Relatorio");
const Perguntas = require("./rotas/Perguntas");


const PORT = process.env.PORT || 3001;

const app = express();
app.use(require("body-parser").urlencoded({ extended: false }));
app.use(
    cors({
        origin: "*",
        // origin: [
        //     "https://hermezapi.vercel.app/",
        //     "http://localhost:3000/"
        // ],
        method: ["GET", "POST"]
    })
);
app.use(express.json());

app.listen(
    PORT,
    function () {
        console.log(`API Hermez aberta na porta ${PORT}`);
    }
);

app.get(
    "/",
    function (req, res) {
        res.send("API Hermez");
    }
);

app.use("/empresa", Empresa);
app.use("/funcionario", Funcionario);
app.use("/chamado", Chamado);
app.use("/chat", Chat);
app.use("/relatorio", Relatorio);
app.use("/perguntas", Perguntas);

module.exports = app;
"use strict"

const express = require('express');
const router = express.Router();
const { CreateConnection, EndConnection } = require('../connection');

async function Cadastro(req, res) {
    const dbConn = CreateConnection();
    dbConn.query(
        `INSERT INTO Funcionario(fun_nome, fun_funcao, fun_email, fun_celular, fun_senha, emp_cod) VALUES('${req.post.nome}', '${req.post.funcao}','${req.post.email}','${req.post.celular}', '${req.post.senha}', ${req.post.emp_cod})`,
        function(err, rows, fields) {
            if(err) {
                throw err;
            }
        
            res.status(200).send();
            console.log(rows);
        }
    );

    EndConnection(dbConn);
}

router.post('/cadastro', Cadastro);

router.post(
    '/login',
    function(req, res) {
        throw("Login da empresa não implementado");
    }
);

router.post(
    '/atualizarsenha',
    function(req, res) {
        throw("Atualizar Senha da empresa não implementado");
    }
);

router.post(
    '/deletar',
    function(req, res) {
        throw("Deletar da empresa não implementado");
    }
);

module.exports = router;
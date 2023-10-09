"use strict"

const express = require('express');
const router = express.Router();
const { CreateConnection, EndConnection } = require('../connection');

router.post(
    '/cadastrar',
    function(req, res){
        const nome = req.body.nome;
        const funcao = req.body.funcao;
        const email = req.body.email;
        const celular = req.body.celular;
        const senha = req.body.senha;
        const cargo = req.body.cargo;
        const emp_cod = req.body.emp_cod;

        const dbConn = CreateConnection();
        dbConn.query(
            `INSERT INTO Funcionario(fun_nome, fun_funcao, fun_email, fun_celular, fun_senha, car_cod, emp_cod) VALUES('${nome}', '${funcao}','${email}','${celular}', '${senha}', ${cargo}, ${emp_cod});`,
            function(err, rows, fields) {
                if(err) {
                    res.status(500).send(err);
                    return;
                }
                res.status(200).send(result);
            }
        );

        EndConnection(dbConn);
    }
);

router.post(
    '/login',
    function(req, res) {
        throw("Login do funcionário não implementado");
    }
);

router.post(
    '/atualizarsenha',
    function(req, res) {
        const senha = req.body.senha;
        const codigo = req.body.codigo;

        const dbConn = CreateConnection();
        dbConn.query(
            `UPDATE Funcionario SET fun_senha = '${senha}' WHERE fun_cod = ${codigo};`,
            function(err, rows, fields){
                if(err) {
                    throw err;
                }

                res.status(200).send();
                console.log(rows);
            }
        );

        EndConnection(dbConn);

    }
);

router.post(
    '/deletar',
    function(req, res) {
        const codigo = req.body.codigo;

        const dbConn = CreateConnection();
        dbConn.query(
            `DELETE FROM Funcionario WHERE fun_cod = ${codigo};`,
            function(err, rows, fields){
                if(err) {
                    throw err;
                }
                
                res.status(200).send();
                console.log(rows);
            }
        );

        EndConnection(dbConn);

    }
);

module.exports = router;
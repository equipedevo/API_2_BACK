"use strict"

const express = require('express');
const router = express.Router();
const { CreateConnection, EndConnection } = require('../connection');

router.post(
    '/cadastrar',
    function(req, res){
        const dbConn = CreateConnection();
        dbConn.query(
            `INSERT INTO Funcionario(fun_nome, fun_funcao, fun_email, fun_celular, fun_senha, car_cod, emp_cod) VALUES('${req.post.nome}', '${req.post.funcao}','${req.post.email}','${req.post.celular}', '${req.post.senha}', ${req.post.cargo}, ${req.post.emp_cod});`,
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
        const dbConn = CreateConnection();
        dbConn.query(
            `UPDATE Funcionario SET fun_senha = '${req.post.senha}' WHERE fun_cod = ${codigo};`,
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
        const dbConn = CreateConnection();
        dbConn.query(
            `DELETE FROM Funcionario WHERE fun_cod = ${req.post.codigo};`,
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
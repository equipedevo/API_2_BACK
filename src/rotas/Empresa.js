"use strict"

const express = require('express');
const router = express.Router();

const { CreateConnection, EndConnection } = require('../connection');
const { HashText, TextHashCompare } = require('../bcrypt')

router.post(
    '/cadastro',
    function(req, res) {
        const nomeCompleto = req.body.nomeCompleto;
        const cnpj = req.body.cnpj;
        const senha = HashText(req.body.senha);
        const email = req.body.email;

        const dbConn = createConnection();
        dbConn.query(
            `insert into Empresa('emp_nome', 'emp_cnpj', 'emp_senha', 'emp_email') values('${nomeCompleto}', '${cnpj}', '${senha}', '${email}')`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).send(err);
                    return;
                }
                res.status(200).send(result);
            }
        )
        EndConnection(dbConn);
    }
);

router.post(
    '/login',
    function(req, res) {
        const dbConn = CreateConnection();
        dbConn.query(
            `select emp_senha from Empresa where emp_email = '${req.body.email}'`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).send(err);
                    return;
                }

                if(!result) {
                    res.status(200).send("Não existe uma empresa com esse email no banco de dados.");
                    return;
                }

                TextHashCompare(
                    req.body.senha,
                    result[0].emp_senha,
                    function(result) {
                        res.status(200).send(result);
                    }
                )
            }
        )
        EndConnection(dbConn);
    }
);

// router.post(
//     '/atualizarsenha',
//     function(req, res) {
//         const dbConn = createConnection();
//         dbConn.query(
//             `Atualizar Senha da empresa não implementado`,
//             function(err, result, fields) {
//                 if(err) {
//                     res.status(500).send(err);
//                     return;
//                 }
//                 res.status(200).send(result);
//             }
//         )
//         EndConnection(dbConn);
//     }
// );

// router.post(
//     '/deletar',
//     function(req, res) {
//         const dbConn = createConnection();
//         dbConn.query(
//             `Deletar da empresa não implementado`,
//             function(err, result, fields) {
//                 if(err) {
//                     res.status(500).send(err);
//                     return;
//                 }
//                 res.status(200).send(result);
//             }
//         )
//         EndConnection(dbConn);
//     }
// );

module.exports = router;
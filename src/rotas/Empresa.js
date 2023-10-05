"use strict"

const express = require('express');
const router = express.Router();

const { CreateConnection, EndConnection } = require('../connection');
const { HashText, TextHashCompare } = require('../bcrypt');

function ChecarEmailCadastrado(email) {
    const dbConn = CreateConnection();
    dbConn.query(
        `select * from Empresa where emp_email = ${email}`,
        function(err, result, fields) {
            if(err) {
                return err;
            }

            if(result.length <= 0) {
                return false;
            }
        }
    );
    EndConnection(dbConn);
    next();
}

router.post(
    '/cadastro',
    function(req, res) {
        if(ChecarEmailCadastrado(email)){
            res.status(500).send(`O email '${email}' já está cadastrado.`);
            return;
        }

        HashText(
            req.body.senha,
            function(err, hash) {
                if(err) {
                    res.status(500).send(err);
                    return;
                }

                const nomeCompleto = req.body.nomeCompleto;
                const cnpj = req.body.cnpj;
                const email = req.body.email;

                const dbConn = CreateConnection();
                dbConn.query(
                    `insert into Empresa(emp_nome, emp_cnpj, emp_senha, emp_email) values('${nomeCompleto}', '${cnpj}', '${hash}', '${email}')`,
                    function(err, result, fields) {
                        if(err) {
                            res.status(500).send(err);
                            return
                        }
                        res.status(200).send(result);
                    }
                )
                EndConnection(dbConn);
            }
        )
    }
);

router.post(
    '/login',
    function(req, res) {
        const email = req.body.email;
        const senha = req.body.senha;

        const dbConn = CreateConnection();
        dbConn.query(
            `select * from Empresa where emp_email = '${email}'`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).send(err);
                    return;
                }

                if(result.length <= 0) {
                    res.status(500).send(`Não existe uma empresa com o email '${email}' no banco de dados.`);
                    return;
                }

                TextHashCompare(
                    senha,
                    result[0].emp_senha,
                    function(err, equal){
                        if(err) {
                            res.status(500).send(err);
                            return;
                        }

                        if(!equal) {
                            res.status(500).send("Senha incorreta.");
                            return;
                        }

                        res.status(200).json({
                            nome: result[0].emp_nome,
                            cnpj: result[0].emp_cnpj,
                            email: result[0].emp_email
                        });
                    }
                );
            }
        )
        EndConnection(dbConn);
    }
);

// router.post(
//     '/atualizarsenha',
//     function(req, res) {
//         const dbConn = CreateConnection();
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
//         const dbConn = CreateConnection();
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
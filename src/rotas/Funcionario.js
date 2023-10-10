"use strict"

const express = require('express');
const router = express.Router();

const { CreateConnection, EndConnection } = require('../connection');
const { HashText, TextHashCompare } = require('../bcrypt');

function ChecarEmailCadastrado(email, callback) {
    const dbConn = CreateConnection();
    dbConn.query(
        `select * from Funcionario where fun_email = '${email}'`,
        function(err, result, fields) {
            if(err) {
                console.log(err);
                return true;
            }

            if(result.length <= 0) {
                callback(false);
            }
            callback(true);
        }
    );
    EndConnection(dbConn);
}

router.post(
    '/cadastrar',
    function(req, res) {
        const email = req.body.email;
        ChecarEmailCadastrado(
            email,
            function(ret) {
                if(ret) {
                    res.status(500).send(`O email ${email} já está cadastrado!`);
                    return;
                }

                HashText(
                    req.body.senha,
                    function(err, hash) {
                        if(err) {
                            res.status(500).send(err);
                            return;
                        }
        
                        const nome = req.body.nome;
                        const funcao = req.body.funcao;
                        const celular = req.body.celular;
                        const cargo = req.body.cargo;
                        const emp_cod = req.body.emp_cod;
        
                        const dbConn = CreateConnection();
                        dbConn.query(
                            `INSERT INTO Funcionario(fun_nome, fun_funcao, fun_email, fun_celular, fun_senha, car_cod, emp_cod) VALUES('${nome}', '${funcao}','${email}','${celular}', '${hash}', ${cargo}, ${emp_cod});`,
                            function(err, result, fields) {
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
            }
        );
    }
);

router.post(
    '/login',
    function(req, res) {
        const email = req.body.email;
        
        const dbConn = CreateConnection();
        dbConn.query(
            `SELECT * FROM Funcionario WHERE fun_email = '${email}'`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).send(err);
                    return;
                }

                if(result.length <= 0) {
                    res.status(500).send(`Não existe um funcionário com o e-mail ${email} cadastrado no Banco de Dados.`);
                    return;
                }

                const senha = req.body.senha;
                TextHashCompare(
                    senha,
                    result[0].fun_senha,
                    function(err, equal) {
                        if(err) {
                            res.status(500).send(err);
                            return;
                        }
                        if(!equal) {
                            res.status(500).send('Senha incorreta.');
                            return;
                        }
                        res.status(200).json({
                            nome: result[0].fun_nome,
                            email: result[0].fun_email,
                            funcao: result[0].fun_funcao,
                            celular: result[0].fun_celular,
                            cargo: result[0].car_cod,
                            empresa: result[0].emp_cod
                        });
                    }
                );
            }
        )
        EndConnection(dbConn);
    }
);

// router.post(
//     '/deletar',
//     function(req, res) {
//         const codigo = req.body.codigo;

//         const dbConn = CreateConnection();
//         dbConn.query(
//             `DELETE FROM Funcionario WHERE fun_cod = ${codigo};`,
//             function(err, rows, fields) {
//                 if(err) {
//                     throw err;
//                 }
                
//                 res.status(200).send();
//                 console.log(rows);
//             }
//         );

//         EndConnection(dbConn);

//     }
// );

// router.post(
//     '/atualizarsenha',
//     function(req, res) {
//         const senha = req.body.senha;
//         const codigo = req.body.codigo;

//         const dbConn = CreateConnection();
//         dbConn.query(
//             `UPDATE Funcionario SET fun_senha = '${senha}' WHERE fun_cod = ${codigo};`,
//             function(err, rows, fields) {
//                 if(err) {
//                     throw err;
//                 }

//                 res.status(200).send();
//                 console.log(rows);
//             }
//         );

//         EndConnection(dbConn);

//     }
// );
module.exports = router;
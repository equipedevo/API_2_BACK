"use strict"

const express = require('express');
const router = express.Router();

const { CreateConnection, EndConnection } = require('../connection');
const { HashText, TextHashCompare } = require('../bcrypt');

router.post(
    '/cadastro',
    function(req, res) {
        const email = req.body.email;
        
        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select * from Funcionario where fun_email = '${email}'`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if(result.length > 0) {
                    res.status(400).json({ msg: `Já há um funcionário cadastrado com o e-mail '${email}'.` });
                    EndConnection(dbConn);
                    return;
                }
                
                HashText(
                    req.body.senha,
                    function(err, hash) {
                        if(err) {
                            res.status(500).json({ msg: err });
                            EndConnection(dbConn);
                            return;
                        }
        
                        const nome = req.body.nome;
                        const funcao = req.body.funcao;
                        const celular = req.body.celular;
                        const car_cod = req.body.car_cod;
                        const emp_cod = req.body.emp_cod;
        
                        dbConn.query(
                            `INSERT INTO Funcionario(fun_nome, fun_funcao, fun_email, fun_celular, fun_senha, car_cod, emp_cod) VALUES('${nome}', '${funcao}','${email}','${celular}', '${hash}', ${car_cod}, ${emp_cod});`,
                            function(err, result, fields) {
                                if(err) {
                                    res.status(500).json({ msg: err });
                                    EndConnection(dbConn);
                                    return;
                                }
                                res.status(200).json({ msg: `Funcionário '${nome}' cadastrado com sucesso.` });
                                EndConnection(dbConn);
                            }
                        );
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
        
        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select * from Funcionario where fun_email = '${email}'`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if(result.length <= 0) {
                    res.status(400).json({ msg: `Não existe um funcionário cadastrado com o e-mail '${email}'.` });
                    EndConnection(dbConn);
                    return;
                }

                TextHashCompare(
                    req.body.senha,
                    result[0].fun_senha,
                    function(err, equal) {
                        if(err) {
                            res.status(500).json({ msg: err });
                            EndConnection(dbConn);
                            return;
                        }

                        if(!equal) {
                            res.status(400).json({ msg: 'Senha incorreta.' });
                            EndConnection(dbConn);
                            return;
                        }

                        res.status(200).json({
                            msg: "Login feito com sucesso",
                            fun_cod: result[0].fun_cod,
                            nome: result[0].fun_nome,
                            email: result[0].fun_email,
                            funcao: result[0].fun_funcao,
                            celular: result[0].fun_celular,
                            car_cod: result[0].car_cod,
                            emp_cod: result[0].emp_cod
                        });
                        EndConnection(dbConn);
                    }
                );
            }
        );
    }
);

module.exports = router;
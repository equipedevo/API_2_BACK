"use strict"

const express = require("express");
const router = express.Router();

const { CreateConnection, EndConnection } = require("../connection");
const { HashText, TextHashCompare } = require("../bcrypt");

router.post(
    "/cadastro",
    function(req, res) {
        const email = req.body.email;

        let dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select * from Empresa where emp_email = "${email}"`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }
    
                if(result.length > 0) {
                    res.status(400).json({ msg: `Já há uma empresa cadastrada com o e-mail '${email}'.` });
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
        
                        const razaoSocial = req.body.razaoSocial;
                        const cnpj = req.body.cnpj;
                        
                        dbConn.query(
                            `insert into Empresa(emp_nome, emp_cnpj, emp_senha, emp_email) values("${razaoSocial}", "${cnpj}", "${hash}", "${email}")`,
                            function(err, result, fields) {
                                if(err) {
                                    res.status(500).json({ msg: err });
                                    EndConnection(dbConn);
                                    return;
                                }
                                res.status(200).json({ msg: `Empresa '${razaoSocial}' cadastrada com sucesso.` });
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
    "/login",
    function(req, res) {
        const email = req.body.email;

        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select * from Empresa where emp_email = "${email}"`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if(result.length <= 0) {
                    res.status(400).json({ msg: `Não existe uma empresa cadastrada com o e-mail '${email}'.` });
                    EndConnection(dbConn);
                    return;
                }

                const senha = req.body.senha;
                TextHashCompare(
                    senha,
                    result[0].emp_senha,
                    function(err, equal) {
                        if(err) {
                            res.status(500).json({ msg: err });
                            EndConnection(dbConn);
                            return;
                        }

                        if(!equal) {
                            res.status(400).json({ msg: "Senha incorreta." });
                            EndConnection(dbConn);
                            return;
                        }

                        res.status(200).json({
                            msg: "Login feito com sucesso",
                            emp_cod: result[0].emp_cod,
                            nome: result[0].emp_nome,
                            cnpj: result[0].emp_cnpj,
                            email: result[0].emp_email
                        });
                        EndConnection(dbConn);
                    }
                );
            }
        );
    }
);

router.post(
    "/listar/funcionarios",
    function(req, res) {
        const emp_cod = req.body.emp_cod;
        
        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select fun_nome, fun_funcao, fun_email, fun_celular, car_cod, fun_dataNasc from Funcionario where emp_cod = '${emp_cod}'`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if(result.length <= 0) {
                    res.status(400).json({ msg: `Não há funcionários cadastrados na empresa ${emp_cod}.` });
                    EndConnection(dbConn);
                    return;
                }

                let funcionarios = [];
                result.forEach(funcionario => {
                    funcionarios.push({
                        fun_nome: funcionario.fun_nome,
                        fun_funcao: funcionario.fun_funcao,
                        fun_email: funcionario.fun_email,
                        fun_celular: funcionario.fun_celular,
                        car_cod: funcionario.car_cod,
                        fun_dataNasc: funcionario.fun_dataNasc
                    })
                });
                res.status(200).json({
                    msg: `Funcionários da empresa ${emp_cod}.`,
                    funcionarios: funcionarios
                });
                EndConnection(dbConn);
            }
        );
    }
);

module.exports = router;
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
                    return;
                }
    
                if(result.length > 0) {
                    res.status(200).json({ msg: `O email ${email} já está cadastrado.` });
                    return;
                }

                HashText(
                    req.body.senha,
                    function(err, hash) {
                        if(err) {
                            res.status(500).json({ msg: err });
                            return;
                        }
        
                        const razaoSocial = req.body.razaoSocial;
                        const cnpj = req.body.cnpj;
                        
                        dbConn = CreateConnection(req.query.dev);
                        dbConn.query(
                            `insert into Empresa(emp_nome, emp_cnpj, emp_senha, emp_email) values("${razaoSocial}", "${cnpj}", "${hash}", "${email}")`,
                            function(err, result, fields) {
                                if(err) {
                                    res.status(500).json({ msg: err });
                                    return;
                                }
                                res.status(200).json({ msg: `Empresa ${razaoSocial} cadastrada com sucesso.` });
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
                    return;
                }

                if(result.length <= 0) {
                    res.status(200).json({ msg: `Não existe uma empresa com o e-mail "${email}" no Banco de Dados.` });
                    return;
                }

                const senha = req.body.senha;
                TextHashCompare(
                    senha,
                    result[0].emp_senha,
                    function(err, equal) {
                        if(err) {
                            res.status(500).json({ msg: err });
                            return;
                        }

                        if(!equal) {
                            res.status(200).json({ msg: "Senha incorreta." });
                            return;
                        }

                        res.status(200).json({
                            msg: "Login feito com sucesso",
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

module.exports = router;
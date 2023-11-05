"use strict"

const express = require("express");
const router = express.Router();

const { CreateConnection, EndConnection } = require("../connection");
const { HashText, TextHashCompare } = require("../bcrypt");

router.post(
    "/cadastro",
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
    "/login",
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
                            res.status(400).json({ msg: "Senha incorreta." });
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

router.post(
    "/trocarSenha",
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

                const senha = req.body.senha;
                TextHashCompare(
                    senha,
                    result[0].fun_senha,
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

                        HashText(
                            req.body.novaSenha,
                            function(err, hash) {
                                if(err) {
                                    res.status(500).json({ msg: err });
                                    EndConnection(dbConn);
                                    return;
                                }

                                dbConn.query(
                                    `update Funcionario set fun_senha = '${hash}' where fun_email = '${email}'`,
                                    function(err, result, fields) {
                                        if(err) {
                                            res.status(500).json({ msg: err });
                                            EndConnection(dbConn);
                                            return;
                                        }

                                        if(result.length != 1) {
                                            res.status(200).json({ msg: "Ocorreu um erro, CHAMA O BACK!!!" });
                                            EndConnection(dbConn);
                                            return;
                                        }
        
                                        res.status(200).json({ msg: "Senha alterada com sucesso" });
                                        EndConnection(dbConn);
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }
);

router.post(
    "/pegar",
    function(req, res) {
        const fun_cod = req.body.fun_cod;
        const emp_cod = req.body.emp_cod;

        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select fun_nome, fun_funcao, fun_email, fun_celular from Funcionario where fun_cod = ${fun_cod} and emp_cod = ${emp_cod}`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if(result.length <= 0) {
                    res.status(400).json({ msg: `Não existe um funcionário com o código '${fun_cod}' na empresa '${emp_cod}'.` });
                    EndConnection(dbConn);
                    return;
                }

                res.status(200).json({
                    msg: `Funcionário ${fun_cod} da empresa ${emp_cod}`,
                    fun_nome: result[0].fun_nome,
                    fun_email: result[0].fun_email,
                    fun_funcao: result[0].fun_funcao,
                    fun_celular: result[0].fun_celular
                });
                EndConnection(dbConn);
            }
        );
    }
);

router.post(
    "/atribuirChamado",
    function(req, res) {
        const fun_cod = req.body.fun_cod;
        const cha_cod = req.body.cha_cod;

        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `update Chamado set tec_cod = ${fun_cod} where cha_cod = ${cha_cod};`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                res.status(200).json({ msg: `Chamado ${cha_cod} atribuido ao funcionário ${fun_cod}` });
                EndConnection(dbConn);
            }
        );
    }
);

router.post(
    '/deletar',
    function(req, res){
        const fun_cod = req.body.fun_cod;

        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `delete from Funcionario where fun_cod = ${fun_cod}`,
            function(err, result, fields){
                if(err){
                    res.status(500).json({ msg: err });
                    return;
                }
                res.status(200).json({ msg: "Usuário deletado com sucesso" });
            }
        );
        EndConnection(dbConn);
    }
);

router.post(
    '/atualizar',
    function(req, res){
        const fun_cod = req.body.fun_cod;
        const nome = req.body.nome;
        const email = req.body.email;
        const celular = req.body.celular;
        const funcao = req.body.funcao;
        const cargo = req.body.car_cod;

        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `update Funcionario set fun_nome = '${nome}', fun_funcao = '${funcao}', fun_email = '${email}', fun_celular = '${celular}', car_cod = ${cargo} where fun_cod = ${fun_cod}`,
            function(err, result, fields){
                if(err){
                    res.status(500).json({ msg: err });
                    return;
                }
                if(result.length <= 0){
                    res.status(400).json({ msg: "Não foi possível atualizar dados do funcionário devido algum erro de preenchimento"});
                    return;
                }
                res.status(200).json({
                    msg: "Dados do funcionário atualizados com sucesso!"
                });
            }
        );
        EndConnection(dbConn);
    }
);
module.exports = router;
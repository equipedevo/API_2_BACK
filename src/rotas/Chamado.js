"use strict"

const express = require("express");
const router = express.Router();

const { CreateConnection, EndConnection } = require("../connection");
const { createConnection } = require("mysql2");
const { FirebaseWrapper } = require("../firebase");

//
// ROTA PARA PEGAR TODOS OS CHAMADOS DE UMA EMPRESA
//
router.post(
    "/getTodos",
    function (req, res) {
        const emp_cod = req.body.emp_cod
        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select c.cha_cod, c.cha_desc, c.cha_dataInicio, c.cha_dataFim, c.cha_local, c.cha_titulo, c.cha_prioridade, f.fun_nome, s.sta_nome, tec.fun_nome tecnico, se.ser_nome from Chamado c inner join Funcionario f on c.fun_cod = f.fun_cod left join Funcionario tec on c.tec_cod = tec.fun_cod inner join Status s on c.sta_cod = s.sta_cod inner join Tipo_Servico se on c.ser_cod = se.ser_cod inner join Empresa e on c.emp_cod = e.emp_cod where e.emp_cod = ${emp_cod} order by cha_dataInicio DESC;`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(400).json({ msg: `Essa empresa ainda não possui chamados` });
                    EndConnection(dbConn);
                    return;
                }

                res.status(200).json(result);
                EndConnection(dbConn);
            }
        );

    }
);

//
// ROTA PARA CADASTRAR UM CHAMADO
//
function InsertChamado(dbConn, desc, local, titulo, fun_cod, emp_cod, serv, arq_cod, ct_cod, callback) {
    dbConn.query(
        `Insert into Chamado(
                    cha_desc,
                    cha_dataInicio,
                    cha_local,
                    cha_titulo,
                    fun_cod,
                    sta_cod,
                    cha_prioridade,
                    ser_cod,
                    emp_cod,
                    arq_cod,
                    ct_cod
                )
                values (
                    '${desc}',
                    convert_tz(now(),"+00:00","-03:00"),
                    '${local}',
                    '${titulo}',
                    '${fun_cod}',
                    1,
                    (
                        select ser_prioridade from Tipo_Servico where ser_nome = '${serv}'
                    ),
                    (
                        select ser_cod from Tipo_Servico where ser_nome = '${serv}'
                    ),
                    '${emp_cod}',
                    ${arq_cod},
                    ${ct_cod}
                );`,
        callback
    );
}
router.post(
    "/cadastro",
    require("multer")().single("imagem"),
    async function (req, res) {
        const desc = req.body.desc;
        const local = req.body.local;
        const titulo = req.body.titulo;
        const fun_cod = req.body.fun_cod;
        const emp_cod = req.body.emp_cod;
        const serv = req.body.serv;

        const fbWrapper = new FirebaseWrapper();
        const imgURL = (req.file ? await fbWrapper.StoreImage(req.file, `imagens/chamados/${titulo}`) : "");

        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `insert into Chat(ct_status) values(1);`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }
                //Query para pegar o id da ultima query feita (Chat)
                dbConn.query(
                    `set @n_cod_chat = LAST_INSERT_ID();`,
                    function (err, result, fields) {
                        if (err) {
                            res.status(500).json({ msg: err });
                            EndConnection(dbConn);
                            return;
                        }

                        if (req.file) {
                            dbConn.query(
                                `insert into Arquivo (arq_caminho) values (${imgURL});`,
                                function (err, result, fields) {
                                    if (err) {
                                        res.status(500).send({ msg: err });
                                        EndConnection(dbConn);
                                        return;
                                    }
                                    //Query para pegar o id da ultima query feita (Arquivo)
                                    dbConn.query(
                                        `set @n_cod_arq = LAST_INSERT_ID();`,
                                        function (err, result, fields) {
                                            if (err) {
                                                res.status(500).json({ msg: err });
                                                EndConnection(dbConn);
                                                return;
                                            }

                                            InsertChamado(dbConn, desc, local, titulo, fun_cod, emp_cod, serv, "@n_cod_arq", "@n_cod_chat",
                                                function (err, result, fields) {
                                                    if (err) {
                                                        res.status(500).json({ msg: err });
                                                        EndConnection(dbConn);
                                                        return;
                                                    }

                                                    res.status(200).json({ msg: "Cadastro feito com sucesso" })
                                                    EndConnection(dbConn);
                                                }
                                            )
                                        }
                                    );
                                }
                            );
                        }
                        else {
                            //Query para fazer um insert no chamado
                            InsertChamado(dbConn, desc, local, titulo, fun_cod, emp_cod, serv, "0", "@n_cod_chat",
                                function (err, result, fields) {
                                    if (err) {
                                        res.status(500).json({ msg: err });
                                        EndConnection(dbConn);
                                        return;
                                    }

                                    res.status(200).json({ msg: "Cadastro feito com sucesso" })
                                    EndConnection(dbConn);
                                }
                            )
                        }
                    }
                );
            }
        );
    }
);

//
//ROTA PARA PEGAR UM CHAMADO EM ESPECÍFICO
//
router.post(
    "/pegarUmChamado",
    function (req, res) {
        const emp_cod = req.body.emp_cod;
        const fun_cod = req.body.fun_cod;
        const cha_cod = req.body.cha_cod;

        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select c.cha_cod, c.cha_desc, c.cha_dataInicio, c.cha_dataFim, c.cha_local, c.cha_titulo, c.cha_prioridade, f.fun_nome, s.sta_nome, tec.fun_nome tecnico, se.ser_nome from Chamado c inner join Funcionario f on c.fun_cod = f.fun_cod left join Funcionario tec on c.tec_cod = tec.fun_cod inner join Status s on c.sta_cod = s.sta_cod inner join Tipo_Servico se on c.ser_cod = se.ser_cod inner join Empresa e on c.emp_cod = e.emp_cod where e.emp_cod = ${emp_cod} and c.cha_cod = ${cha_cod} and (tec.fun_cod = ${fun_cod} or c.tec_cod = ${fun_cod});`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(400).json({ msg: `Esse chamado não existe, não pertence a empresa ou o funcionário não possui permissão de vê-lo.` });
                    EndConnection(dbConn);
                    return;
                }

                res.status(200).json({ msg: `Chamada iniciado com sucesso` });
                EndConnection(dbConn);
            }
        );
    }
)

//
//ROTA PARA PEGAR UM CHAMADO COM FILTRO
//
router.post(
    "/getComFiltro",
    function (req, res) {
        //Requisição do campos do front
        const emp_cod = req.body.emp_cod

        const priori = req.body.priori
        // const data = req.body.data
        const func = req.body.func
        const status = req.body.status
        const tipo = req.body.tipo

        //Realização das queries
        const Qprio = (priori != "") ? `c.cha_prioridade = ${priori} and ` : "" // Verifico se o campo está nulo, se não tiver, 
        //é criado um where buscando esse campo, se for nulo o where também vai ser nulo.
        // const Qdata = (data != "") ? `c.cha_dataInicio = '${data}' and ` : ""
        const Qfunc = (func != "") ? `f.fun_nome LIKE '${func}%' and ` : ""
        const Qsta = (status != "") ? `s.sta_nome LIKE '${status}%' and ` : ""
        const Qtip = (tipo != "") ? `se.ser_nome LIKE '${tipo}%' and ` : ""

        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select c.cha_cod, c.cha_desc, c.cha_dataInicio, c.cha_dataFim, c.cha_local, c.cha_titulo, c.cha_prioridade, f.fun_nome, s.sta_nome, tec.fun_nome tecnico, se.ser_nome from Chamado c inner join Funcionario f on c.fun_cod = f.fun_cod left join Funcionario tec on c.tec_cod = tec.fun_cod inner join Status s on c.sta_cod = s.sta_cod inner join Tipo_Servico se on c.ser_cod = se.ser_cod inner join Empresa e on c.emp_cod = e.emp_cod where ${Qprio}${Qfunc}${Qsta}${Qtip}e.emp_cod = ${emp_cod} order by cha_dataInicio DESC`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(400).json({ msg: `Não há nenhum chamado com esses requisitos` });
                    EndConnection(dbConn);
                    return;
                }

                res.status(200).json(result);
                EndConnection(dbConn);
            }
        );

    }
);

//
//ROTA PARA PEGAR OS CHAMADOS DE UM FUNCIONARIO
//
router.post(
    "/getMeus",
    function (req, res) {
        const emp_cod = req.body.emp_cod
        const fun_cod = req.body.fun_cod
        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select c.cha_cod, c.cha_desc, c.cha_dataInicio, c.cha_dataFim, c.cha_local, c.cha_titulo, c.cha_prioridade, s.sta_nome, tec.fun_nome tecnico, se.ser_nome from Chamado c inner join Funcionario f on c.fun_cod = f.fun_cod left join Funcionario tec on c.tec_cod = tec.fun_cod inner join Status s on c.sta_cod = s.sta_cod inner join Tipo_Servico se on c.ser_cod = se.ser_cod inner join Empresa e on c.emp_cod = e.emp_cod where c.emp_cod = ${emp_cod} and c.fun_cod = ${fun_cod} order by cha_dataInicio DESC;`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(400).json({ msg: `Esse chamado não existe` });
                    EndConnection(dbConn);
                    return;
                }

                res.status(200).json(result);
                EndConnection(dbConn);
            }
        );

    }
);

//
//ROTA PARA PEGAR OS CHAMADOS ATRIBUIDOS A UM TECNICO
//
router.post(
    "/getMeusAtribuidos",
    function (req, res) {
        const emp_cod = req.body.emp_cod
        const tec_cod = req.body.tec_cod
        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select c.cha_cod, c.cha_desc, c.cha_dataInicio, c.cha_dataFim, c.cha_local, c.cha_titulo, c.cha_prioridade, s.sta_nome, tec.fun_nome tecnico, se.ser_nome from Chamado c inner join Funcionario f on c.fun_cod = f.fun_cod left join Funcionario tec on c.tec_cod = tec.fun_cod inner join Status s on c.sta_cod = s.sta_cod inner join Tipo_Servico se on c.ser_cod = se.ser_cod inner join Empresa e on c.emp_cod = e.emp_cod where c.emp_cod = ${emp_cod} and c.tec_cod = ${tec_cod} order by cha_dataInicio DESC;`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(400).json({ msg: `O chamado em questão não existe ou não está atribuido a esse técnico` });
                    EndConnection(dbConn);
                    return;
                }

                res.status(200).json(result);
                EndConnection(dbConn);
            }
        );

    }
);

//
//ROTA PARA ATUALIZAR O STATUS DO CHAMADO
//
router.post(
    "/atualizarStatus",
    function (req, res) {
        const sta_cod = req.body.sta_cod
        const cha_cod = req.body.cha_cod
        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `Update Chamado Set sta_cod = ${sta_cod} where cha_cod = ${cha_cod};`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(400).json({ msg: `Esse chamado não existe` });
                    EndConnection(dbConn);
                    return;
                }

                res.status(200).json({ msg: `Status do chamado atualizado com sucesso` });
                EndConnection(dbConn);
            }
        );

    }
);

router.post(
    "/mudarPrioridade",
    function (req, res) {
        const priori = req.body.priori
        const cha_cod = req.body.cha_cod
        const dbConn = createConnection(req.query.dev);
        dbConn.query(
            `Update Chamado Set cha_prioridade = ${priori} where cha_cod = ${cha_cod};`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(400).json({ msg: `Esse chamado não existe` });
                    EndConnection(dbConn);
                    return;
                }

                res.status(200).json({ msg: `Prioridade do chamado atualizado com sucesso` });
                EndConnection(dbConn);
            }
        );
    }
);

module.exports = router;
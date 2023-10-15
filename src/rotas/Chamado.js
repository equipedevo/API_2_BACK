"use strict"

const express = require('express');
const router = express.Router();

const { CreateConnection, EndConnection } = require('../connection');

router.get(
    '/getTodos',
    function (req, res) {
        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select c.cha_cod, c.cha_desc, c.cha_dataInicio, c.cha_dataFim, c.cha_local, c.cha_titulo, c.cha_prioridade, f.fun_nome, s.sta_nome, fu.fun_nome tecnico, se.ser_nome, emp_nome e from Chamado c inner join Funcionario f on c.fun_cod = f.fun_cod left join Funcionario fu on c.tec_cod = fu.fun_cod inner join Status s on c.sta_cod = s.sta_cod inner join Tipo_Servico se on c.ser_cod = se.ser_cod inner join Empresa e on c.emp_cod = e.emp_cod;`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    return;
                }

                res.status(200).json(result);
                EndConnection(dbConn);
            }
        );

    }
);


router.post(
    '/cadastro',
    function (req, res) {
        const desc = req.body.desc
        const local = req.body.local
        const titulo = req.body.titulo
        const codFun = req.body.codFun
        const codEmp = req.body.codEmp

        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `Insert into Chamado(cha_desc, cha_dataInicio, cha_local, cha_titulo, fun_cod, sta_cod, cha_prioridade, ser_cod, emp_cod) values ('${desc}', NOW(), '${local}', '${titulo}','${codFun}', 1, 2, 6, '${codEmp}')`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    return;
                }

                res.status(200).json({ msg: `Chamada iniciado com sucesso` });
                EndConnection(dbConn);
            }
        );
    }
);


module.exports = router;
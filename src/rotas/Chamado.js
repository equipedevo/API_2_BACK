"use strict"

const express = require('express');
const router = express.Router();

const { CreateConnection, EndConnection } = require('../connection');

router.get(
    '/getTodos',
    function (req, res) {
        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select * from Chamado`,
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

        const dbConn = CreateConnection();
        dbConn.query(
            `Insert into Chamado(cha_desc, cha_dataInicio, cha_local, cha_titulo, fun_cod, sta_cod, cha_prioridade, ser_cod, emp_cod) 
            values ('${desc}', NOW(), '${local}', '${titulo}','${codFun}', 1, 2, 6, '${codEmp}')`,
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
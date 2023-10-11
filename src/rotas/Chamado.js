"use strict"

const express = require('express');
const router = express.Router();

const { CreateConnection, EndConnection } = require('../connection');

router.get(
    '/getTodos',
    function (req, res) {
        const dbConn = CreateConnection();
        dbConn.query(
            `select * from Chamado`,
            function (err, rows, fields) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }

                res.status(200).send(rows);
            }
        );

        EndConnection(dbConn);
    }
);


router.post(
    '/cadastro',
    function (req, res) {
        const desc = req.body.desc
        const dataInicio = "2004-11-23 08:24:89"
        const local = req.body.local
        const titulo = req.body.titulo
        const codFun = req.body.codFun
        const codEmp = req.body.codEmp

        const dbConn = CreateConnection();
        dbConn.query(
            `Insert into Chamado(cha_desc, cha_dataInicio, cha_local, cha_titulo, fun_cod, sta_cod, cha_prioridade, ser_cod, emp_cod) 
            values ('${desc}', '${dataInicio}', '${local}', '${titulo}','${codFun}', 1, 2, 1, '${codEmp}')`,
            function (err, rows, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    return;
                }

                res.status(200).json({ msg: `Chamada iniciado com sucesso` });
                EndConnection(dbConn);
            }
        );

        EndConnection(dbConn);
    }
);


module.exports = router;
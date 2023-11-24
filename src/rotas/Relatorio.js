"use strict"

const express = require("express");
const router = express.Router();

const { CreateConnection, EndConnection } = require("../connection");

router.post(
    "/prioridadeNoPeriodo",
    function (req, res) {
        const inicioPeriodo = req.body.inicioPeriodo;
        const fimPeriodo = req.body.fimPeriodo;
        const prioridade = req.body.prioridade;

        let dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select cha_cod from Chamado where (cha_dataInicio >= ${inicioPeriodo}) or (cha_dataFim <= ${fimPeriodo}) and (cha_prioridade = ${prioridade})`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(400).json({ msg: `Nenhum chamado com a prioridade ${prioridade} encontrado no período de ${inicioPeriodo} a ${fimPeriodo}.` });
                    EndConnection(dbConn);
                    return;
                }

                resultado = result.map(res => {return { cha_cod: res.cha_cod }});
                res.status(200).json({
                    msg: `${result.length} chamados com a prioridade ${prioridade} encontrados no período de ${inicioPeriodo} a ${fimPeriodo}.`,
                    chamados: resultado
                });
                EndConnection(dbConn);
            }
        );
    }
);

router.post(
    "/statusNoPeriodo",
    function (req, res) {
        const inicioPeriodo = req.body.inicioPeriodo;
        const fimPeriodo = req.body.fimPeriodo;
        const status = req.body.status;

        let dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select cha_cod from Chamado where (cha_dataInicio >= ${inicioPeriodo}) or (cha_dataFrim <= ${fimPeriodo}) and (sta_cod = ${status})`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(400).json({ msg: `Nenhum chamado com o status ${status} encontrado no período de ${inicioPeriodo} a ${fimPeriodo}.` });
                    EndConnection(dbConn);
                    return;
                }

                resultado = result.map(res => {return { cha_cod: res.cha_cod }});
                res.status(200).json({
                    msg: `${result.length} chamados com o status ${status} encontrados no período de ${inicioPeriodo} a ${fimPeriodo}.`,
                    chamados: resultado
                });
                EndConnection(dbConn);
            }
        );
    }
);

module.exports = router;
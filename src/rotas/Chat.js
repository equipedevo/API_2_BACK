"use strict"

const express = require("express");
const router = express.Router();

const { CreateConnection, EndConnection } = require("../connection");

router.post(
    "/mensagens",
    function(req, res) {
        const cha_cod = req.body.cha_cod;
        const pag = (req.query.pag || 0);

        let dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select msg.msg_texto as texto, arq.arq_caminho as url_arquivo, func.fun_nome, msg.msg_data_envio
                from Mensagem msg inner join Arquivo arq on msg.arq_cod = arq.arq_cod
                    inner join Funcionario func on msg.fun_cod = func.fun_cod
                where ct_cod = ${cha_cod} limit 20 offset ${20 * pag}`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }
    
                if(result.length > 0) {
                    res.status(400).json({ msg: `Nenhuma mensagem encontrada para esse chamado na página '${pag}'.` });
                    EndConnection(dbConn);
                    return;
                }

                let mensagens = [];
                result.forEach(mensagem => {
                    mensagens.push({
                        texto: mensagem.texto,
                        arquivo: mensagem.url_arquivo,
                        remetente: mensagem.fun_nome,
                        dataEnvio: mensagem.dataEnvio
                    })
                });
                res.status(200).json({
                    msg: `Mensagens (${20 * pag}:${20 * pag + 20}) do chamado ${cha_cod}`,
                    mensagens: mensagens
                });
                EndConnection(dbConn);
            }
        );
    }
);

module.exports = router;
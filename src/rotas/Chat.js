"use strict"

const express = require("express");
const router = express.Router();

const { CreateConnection, EndConnection } = require("../connection");

router.post(
    "/novaMensagen",
    function(req, res) {
        const msg_texto = req.post.msg_texto;
        const fun_cod = req.post.fun_cod;
        const ct_cod = req.post.ct_cod;
        const arq_cod = (req.post.arq_cod || null);

        let dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `insert into Mensagem(msg_texto, fun_cod, ct_cod, arq_cod, msg_dataEnv)
                values('${msg_texto}', ${fun_cod}, ${ct_cod}, ${arq_cod}, convert_tz(now(),"+00:00","-03:00"));`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }
                
                res.status(200).json({ msg: `Mensagem incluida no chamado ${ct_cod}.` });
                EndConnection(dbConn);
            }
        );
    }
);

router.post(
    "/mensagens",
    function(req, res) {
        const cha_cod = req.body.cha_cod;
        const pag = (req.body.pag || 0);

        let dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select msg.msg_texto as texto, arq.arq_caminho as url_arquivo, func.fun_nome, msg.msg_dataEnv
                from Mensagem msg inner join Arquivo arq on msg.arq_cod = arq.arq_cod
                    inner join Funcionario func on msg.fun_cod = func.fun_cod
                where ct_cod = ${cha_cod} limit 20 offset ${20 * pag}
                order by msg.msg_dataEnv desc`,
            function(err, result, fields) {
                if(err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }
    
                if(result.length > 0) {
                    res.status(400).json({ msg: `Nenhuma mensagem encontrada para esse chamado na página ${pag}.` });
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
                    msg: `Mensagens [${20 * pag}:${20 * pag + 20}] do chamado ${cha_cod}`,
                    mensagens: mensagens
                });
                EndConnection(dbConn);
            }
        );
    }
);

module.exports = router;
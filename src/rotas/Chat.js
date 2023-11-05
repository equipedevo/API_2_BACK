"use strict"

const express = require("express");
const router = express.Router();

const { CreateConnection, EndConnection } = require("../connection");
const { FirebaseWrapper } = require("../firebase");

function InsertMensagem(dbConn, msg_texto, fun_cod, ct_cod, cod_arq, callback) {
    dbConn.query(
        `insert into Mensagem(msg_texto, fun_cod, ct_cod, arq_cod, msg_dataEnv)
        values('${msg_texto}', ${fun_cod}, ${ct_cod}, ${cod_arq}, convert_tz(now(),"+00:00","-03:00"));`,
        callback
    );
}
router.post(
    "/novaMensagem",
    require('multer')().single('imagem'),
    async function (req, res) {
        const msg_texto = req.body.msg_texto;
        const fun_cod = req.body.fun_cod;
        const ct_cod = req.body.ct_cod;

        const fbWrapper = new FirebaseWrapper();
        const imgURL = (rq.file ? await fbWrapper.StoreImage(req.file, `imagens/chat/${ct_cod}`) : "");

        if (req.file) {
            dbConn.query(
                `insert into Arquivo (arq_caminho) values (${imgURL});`,
                function (err, result, fields) {
                    if (err) {
                        res.status(500).send({ msg: err });
                        EndConnection(dbConn);
                        return;
                    }

                    dbConn.query(
                        `set @n_cod_arq = LAST_INSERT_ID();`,
                        function (err, result, fields) {
                            if (err) {
                                res.status(500).json({ msg: err });
                                EndConnection(dbConn);
                                return;
                            }

                            InsertMensagem(dbConn, msg_texto, fun_cod, ct_cod, "@n_cod_arq",
                                function (err, result, fields) {
                                    if (err) {
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
                }
            );
        }
        else {
            InsertMensagem(dbConn, msg_texto, fun_cod, ct_cod, "0",
                function (err, result, fields) {
                    if (err) {
                        res.status(500).json({ msg: err });
                        EndConnection(dbConn);
                        return;
                    }

                    res.status(200).json({ msg: `Mensagem incluida no chamado ${ct_cod}.` });
                    EndConnection(dbConn);
                }
            );
        }
    }
);

router.post(
    "/mensagens",
    function (req, res) {
        const cha_cod = req.body.cha_cod;
        const pag = (req.body.pag || 0);

        let dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select msg.msg_texto, func.fun_cod, msg.msg_dataEnv, arq.arq_caminho
                from Mensagem msg inner join Funcionario func on msg.fun_cod = func.fun_cod
                    left join Arquivo arq on arq.arq_cod = msg.arq_cod
                where ct_cod = ${cha_cod}
                order by msg.msg_dataEnv desc
                limit 20 offset ${20 * pag};`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(400).json({ msg: `Nenhuma mensagem encontrada para o chamado ${cha_cod} na página ${pag}.` });
                    EndConnection(dbConn);
                    return;
                }

                let mensagens = [];
                result.forEach(mensagem => {
                    mensagens.push({
                        texto: mensagem.msg_texto,
                        arquivo: mensagem.arq_caminho,
                        remetente: mensagem.fun_cod,
                        dataEnvio: mensagem.msg_dataEnv
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
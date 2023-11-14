"use strict"

const express = require("express");
const router = express.Router();

const { CreateConnection, EndConnection } = require("../connection");
const { createConnection } = require("mysql2");

router.post(
    "/getTodas",
    function (req, res) {
        const emp_cod = req.body.emp_cod
        const dbConn = CreateConnection(req.query.dev);
        dbConn.query(
            `select * from Perguntas where e.emp_cod = ${emp_cod};`,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(400).json({ msg: `Essa empresa ainda não possui perguntas` });
                    EndConnection(dbConn);
                    return;
                }

                res.status(200).json(result);
                EndConnection(dbConn);
            }
        );

    }
);

module.exports = router;
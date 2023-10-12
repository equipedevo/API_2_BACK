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


module.exports = router;
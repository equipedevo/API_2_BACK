"use strict"

const express = require('express');
const router = express.Router();
const { CreateConnection, EndConnection } = require('../connection');

router.get(
    '/getTodos',
    function (req, res) {
        const dbConn = CreateConnection();
        dbConn.query(
            `Select * From Chamado`,
            function (err, rows, fields) {
                if (err) {
                    res.status(500).send(err);
                }

                res.status(200).send(rows);
            }
        );

        EndConnection(dbConn);
    }
);


module.exports = router;
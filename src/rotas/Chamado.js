"use strict"

const express = require('express');
const router = express.Router();
const { CreateConnection, EndConnection } = require('../connection');

router.get(
    '/getTodos',
    function (req, res) {
        throw ("Cadastro da empresa não implementado");
    }
);


module.exports = router;
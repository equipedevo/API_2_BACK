"use strict"

const express = require('express');
const router = express.Router();
const { CreateConnection, EndConnection } = require('../connection');

router.post(
    '/cadastro', 
    function(req, res){
        Cadastro(req, res)
    }
)

router.post(
    '/login',
)

router.post(
    '/deletar'
)

module.exports = router;
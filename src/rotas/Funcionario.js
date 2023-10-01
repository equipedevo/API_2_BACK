"use strict"

const express = require('express');
const router = express.Router();

router.post(
    '/cadastro',
    function(req, res) {
        throw("Cadastro da empresa não implementado");
    }
);

router.post(
    '/login',
    function(req, res) {
        throw("Login da empresa não implementado");
    }
);

router.post(
    '/atualizarsenha',
    function(req, res) {
        throw("Atualizar Senha da empresa não implementado");
    }
);

router.post(
    '/deletar',
    function(req, res) {
        throw("Deletar da empresa não implementado");
    }
);

module.exports = router;
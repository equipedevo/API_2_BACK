const express = require('express')

const app = express()
const PORT = 4000

app.listen(
    PORT,
    function() {
        console.log(`BACK API_2 aberto na porta ${PORT} `);
    }
);

app.get(
    '/',
    function(req, res) {
        res.send('BACK está rodando');
    }
);

app.get(
    '/teste',
    function(req, res) {
        res.send('Rota teste');
    }
);

module.exports = app;
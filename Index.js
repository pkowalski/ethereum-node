require('dotenv').config();
const http = require('http');
const express = require('express');
const eth = require('./controllers/EthereumController');


let app = express();
app.server = http.createServer(app);

app.server.listen(8080, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

app.get('/', eth.main)
app.get('/balance', eth.getBalance);

module.exports = app;

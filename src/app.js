require('dotenv').config();

const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());


app.get('/ping', (req, res) => {
    res.send('Pong');
})

module.exports = app;
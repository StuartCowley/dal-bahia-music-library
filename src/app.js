const express = require('express');
const app = express();
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');

app.use(express.json());

app.use(artistRouter);
app.use(albumRouter);

module.exports = app;
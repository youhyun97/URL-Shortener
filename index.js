const express = require('express');
const app = express();
const path = require('path');
const { request } = require('http');

const mongoose = require('./db');
const urlShort = require('./routes/urlshort62');
const urlIndex = require('./routes/index');

// port
var port = process.env.PORT || 8000;
app.listen(port, function(){
    console.log("Express server has started on port " + port)
});

app.use(express.json())
app.use(express.urlencoded({ extends: true}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', urlIndex);
app.use('/urlshort', urlShort);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
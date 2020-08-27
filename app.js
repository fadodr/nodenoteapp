const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const app = express();
const authroutes = require('./routes/auth');
const noteroutes = require('./routes/notes');

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.use('/node/noteapp/api/auth', authroutes);
app.use('/node/noteapp/api/notes', noteroutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.code = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.code).json({
        error : error.message
    })
})

mongoose.connect('mongodb+srv://fadodatabase:playboy10@shop.kqlba.mongodb.net/Notebook?retryWrites=true&w=majority')
.then( result => console.log('conneted'))

module.exports = app;
const mongoose = require('mongoose');

const noteschema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Note', noteschema);
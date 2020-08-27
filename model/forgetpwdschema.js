const mongoose = require('mongoose')


const forgetpwdschema = new mongoose.Schema({
    email : {
        type: String,
        required : true
    },
    token : {
        type : String,
        requiredPaths : true
    }
});

module.exports = mongoose.model('ForgetPassword', forgetpwdschema);
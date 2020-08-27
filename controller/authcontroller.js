const User = require('../model/userschema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Forgetpasword = require('../model/forgetpwdschema');
const randomize = require('randomatic');

exports.signup_user = async ( req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const existinguser = await User.findOne({ email : email});
    if(existinguser){
        res.status(422).json({
            error : "User already exist"
        })
    }
    const hashpwd = await bcrypt.hash(password, 10)
    const createduser = new User({
        name : name,
        email : email,
        password : hashpwd
    });
    try{
        await createduser.save()
         res.status(201).json({
            status : "201",
            message : "New user created",
            createdUser : createduser
        })
    } 
    catch(err){
        res.status(500).json({
            error : err
        })
    }    
}

exports.login_user = async ( req, res , next) => {
    const email = req.body.email;
    const password = req.body.password;

    const existinguser = await User.findOne({ email : email});
    if(!existinguser){
        res.status(422).json({
            error : "User does not exist"
        })
    }
    const isequal = await bcrypt.compare(password, existinguser.password);
    if(!isequal){
        res.status(422).json({
            error : "Incorrect passowrd"
        })
    }
    try{
        const token = await jwt.sign({ id : existinguser._id, email : existinguser.email}, 'fadosecret', { expiresIn : '1h'});
        res.status(200).json({
            message : 'You are logged in',
            tokendata : {
                    token : token,
                    expiresIn : new Date( new Date().getTime() + 7200750).toUTCString()
                },
            user : existinguser
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    }  
}

exports.forget_password = async ( req, res, next) => {
    const email  = req.body.email;

    const existinguser = await User.findOne({ email : email});
    if(!existinguser){
        res.status(500).json({
            message : "User does not exist"
        })
    }
    else{
        const randomcode = randomize('Aa0', 6);
        try{
            const forgetpwd = new Forgetpasword({
                email : existinguser.email,
                token : randomcode
            })
            await forgetpwd.save();
            res.status(200).json({
                message : "Ypu can now rest your password with the given code",
                data : forgetpwd
            })
        }
        catch(err){
            res.status(500).json({
                error : err
            })
        }
    }
}

exports.reset_password = async ( req, res, next ) => {
    const password = req.body.password;
    const token = req.body.token;
    try{
        const getuser = await Forgetpasword.findOne({ token : token });
        const finduser = await User.findOne({ email : getuser.email});
        if(!finduser){
            res.status(422).json({
                message : "No user found with specified token"
            })
        }
        else{
            const hashpwd = await bcrypt.hash(password, 10);
            await User.update({ _id : finduser._id},{ $set : { name : finduser.name , email : finduser.email, password : hashpwd}});
            res.status(200).json({
                message : "password changed"
            })
        }   
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    }
}

exports.refresh_token = async ( req, res, next) => {
    const tokenheader = req.get('Authorization');
    const token = tokenheader.split(' ')[1];

    try{
        const getuser = await jwt.verify(token, 'fadosecret');
        const newtoken = await jwt.sign({ id : getuser.id, email : getuser.email}, 'fadosecret', {expiresIn : '1h'});
        res.status(200).json({
            message : 'New token generated',
            tokendata : {
                token : newtoken,
                expiresIn : new Date( new Date().getTime() + 7200750).toUTCString()
            },
        })
    }
    catch(err){
        res.status(500).json({
            error : err
        })
    }
}
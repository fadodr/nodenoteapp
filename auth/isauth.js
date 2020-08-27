const jwt = require('jsonwebtoken')

module.exports = async ( req, res, next) => {
    const tokenheader = req.get('Authorization');
    if(!tokenheader){
        res.status(500).status({
            error : "You are not logged in"
        })
    }
    const token = tokenheader.split(' ')[1];
    let getuser;
    try{
        getuser = await jwt.verify(token, 'fadosecret');
        if(!getuser){
            res.status(500).json({
                error : "You are not logged in"
            })
        }
        else{
          next(); 
        }    
    }
    catch(err){
        res.status(500).json({
            error : "You are not logged in"
        })
    }
}

const jwt = require('jsonwebtoken');
const BD = require('../config/oracle.js');

exports.verifyToken=(req,res,next) => {
    let token = req.header('token');
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(500).json({
              ok:false,
              err
            });
          
        }
        req.id = decoded.id;
    
    });
    next();

}
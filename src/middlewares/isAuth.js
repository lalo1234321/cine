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
exports.verifyAdmin= async(req,res,next)=>{
    let id = req.id;
    try{
        sql = "select idUser from admin where idUser=:id";
        const admin = await BD.Open(sql,[id],true);
        if(admin.rows.length==1) {
            next();
        } else {
            res.status(500).json({
                ok:false,
                message:'El usuario no es administrador'
            });
        }
    }catch(error) {
        console.log(error)
    }
}
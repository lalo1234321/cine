const bcrypt = require('bcrypt');
const { Router } = require('express');
const {generateValidToken} = require('../services/generateToken');
const router = Router();
const BD = require('../config/oracle.js');

router.post('/login',async (req,res) => {
    let {email,password} = req.body;
    try{
        sql = "select * from users where email = :email";
        let user = await BD.Open(sql,[email],true);
        password = await bcrypt.compare(password,user.rows[0].PASSWORD);
        if (!password || !user) {
            const error = new Error("Credenciales no coinciden!");
            error.statusCode = 500;
            throw error;
        }
        let token = generateValidToken(user);
        res.status(200).json({
            result: 'Las contraseñas coinciden',
            token,
            idUser : user.rows[0].IDUSER
        });
    }catch(error) {
        res.status(500).json({
            message:'Error'
        });
    }
    
    
});



module.exports = router;
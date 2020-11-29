const {Router} = require('express'); 
const router = Router();
const BD = require('../config/oracle.js');
const {verifyToken,verifyAdmin} = require('../middlewares/isAuth');
//corrgir
router.post('/registerGenre',[verifyToken,verifyAdmin],async(req,res)=>{
    let {idGender, name} = req.body;
    try {
        sql = "insert into gender values(:idGender,:name)";
        await BD.Open(sql,[idGender,name],true);
        res.status(200).json({
            ok:true,
            message: 'género creado con éxito en la base de datos'
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
    

    

});

module.exports = router;
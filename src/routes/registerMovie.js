
const {Router} = require('express'); 
const router = Router();
const BD = require('../config/oracle.js');
const {verifyToken,verifyAdmin} = require('../middlewares/isAuth');

router.post('/registerMovie',[verifyToken,verifyAdmin], async (req,res) => {
    let {idGender, duration, name, posterImage} = req.body;

    try {
        sql = "insert into movie values (movie_idMovie_seq.NEXTVAL,:idGender,:duration,:name,:posterImage)";
        await BD.Open(sql,[idGender,duration,name,posterImage],true);
        res.status(200).json({
            ok:true,
            message:'Película registrada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            error
        })
    }


});





module.exports = router;


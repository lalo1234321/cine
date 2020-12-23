
const {Router} = require('express'); 
const router = Router();
const BD = require('../config/oracle.js');
const {verifyToken,verifyAdmin} = require('../middlewares/isAuth');

router.post('/registerCinema',[verifyToken,verifyAdmin], async (req,res) => {
    let {name, location} = req.body;
    // console.log('Afuera del try catch');
    let idAdmin = req.id;
    try {
        sql = "insert into cinema values (cinema_idCinema_seq.NEXTVAL,:idAdmin,:name,:location)";
        await BD.Open(sql,[idAdmin,name,location],true);
        res.status(200).json({
                ok:true,
                message:'Cine registrado exitosamente en la base de datos'
            });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
    


});



module.exports = router;
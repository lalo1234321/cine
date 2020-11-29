const {Router} = require('express'); 
const router = Router();
const BD = require('../config/oracle.js');
const {verifyToken,verifyAdmin} = require('../middlewares/isAuth');
//corrgir
router.post('/registerGenre',[verifyToken,verifyAdmin],(req,res)=>{
    let message = req.body.message;
    res.status(200).json({
        ok:true,
        message
    });

});

module.exports = router;
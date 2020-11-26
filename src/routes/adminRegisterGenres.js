const {Router} = require('express'); 
const router = Router();
const BD = require('../config/oracle.js');
const {verifyToken} = require('../middlewares/isAuth');
//corrgir
router.post('/registerGenre',[verifyToken],(req,res)=>{
    let message = req.body.message;
    res.status(200).json({
        ok:true,
        message
    });

});

module.exports = router;
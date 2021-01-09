

const {Router} = require('express'); 
const router = Router();
const BD = require('../config/oracle.js');
const {verifyToken,verifyAdmin} = require('../middlewares/isAuth');


router.post('/buyTicket', [verifyToken], (req, res) => {
    


});



module.exports = router;
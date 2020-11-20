const jwt = require('jsonwebtoken');
const BD = require('../config/oracle.js');

exports.verifyAdmin=(req,res,next) => {
    let token = req.header('token');
    


}
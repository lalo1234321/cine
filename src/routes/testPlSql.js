
const {Router} = require('express');
const router = Router();
const oracledb = require('oracledb');
const BD = require('../config/oracle.js');

// let connection;

//   try {
//     connection = await oracledb.getConnection( {
//       user          : "hr",
//       password      : mypw,
//       connectString : "localhost/orclpdb1"
//     });



router.get('/plsql', async(req,res) => {
    let plsql = `BEGIN
	DBMS_OUTPUT.PUT_LINE('HOLA MUNDO');
    END;`;
    try {
        let result = await BD.Open(`BEGIN
        :ret := myfunc();
      END;`,
     {
       ret: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 }
     });
     console.log(result.outBinds);
    
        
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;

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
    try {
        // let result = await BD.Open(
        //     `BEGIN
        //         :propiedad := myfunc();
        //     END;`,
        // {
        // propiedad: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 }
        // });


        // let result = await BD.Open(
        //     `BEGIN
        //         myproc(:id, :varios, :p);
        //     END;
        //     `
        // ,{
        //     id : 3,
        //     varios: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
        //     p : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 }
        // })

        let result = await BD.Open(
            `BEGIN
            procMovie(:nameMovie, :IDMOVIE, :DURATION, :MOVIENAME, :POSTERIMAGE, :GENDERNAME );
            END;
            `
        ,{
            nameMovie : 'Scary Movie 3',
            IDMOVIE: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            DURATION : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            MOVIENAME : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            POSTERIMAGE : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            GENDERNAME : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 }
        })

     console.log(result.outBinds);
     res.status(200).json({
         registros: result.outBinds
     });
        
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
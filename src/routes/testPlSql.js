
const {Router} = require('express');
const router = Router();
const oracledb = require('oracledb');
const BD = require('../config/oracle.js');
const cors = require('cors');
// let connection;

//   try {
//     connection = await oracledb.getConnection( {
//       user          : "hr",
//       password      : mypw,
//       connectString : "localhost/orclpdb1"
//     });

// borrar

router.get('/dummy', (req,res) => {
    res.status(200).json({
        nombre: 'Ation',
        edad: 40,
        correo: 'elburro123@gmail.com',
        imagenDePerfil:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Donkey_%281246936%29.jpg/250px-Donkey_%281246936%29.jpg'
    });
});

router.get('/testing', (req,res) => {
    res.status(200).json({
        nombre: 'lalo',
        edad: 30,
        correo: '123@gmail.com',
        imagenDePerfil:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Donkey_%281246936%29.jpg/250px-Donkey_%281246936%29.jpg'
    });
});

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

        // let result = await BD.Open(
        //     `BEGIN
        //     procMovie(:nameMovie, :IDMOVIE, :DURATION, :MOVIENAME, :POSTERIMAGE, :GENDERNAME );
        //     END;
        //     `
        // ,{
        //     nameMovie : 'Scary Movie 3',
        //     IDMOVIE: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
        //     DURATION : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
        //     MOVIENAME : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
        //     POSTERIMAGE : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
        //     GENDERNAME : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 }
        // })


        let result = await BD.Open(
            `BEGIN
            procClient(:emailClient, :IDUSER, :FIRSTNAME, :LASTNAME, :AGE, :EMAIL, :IDCLIENT );
            END;
            `
        ,{
            emailClient : 'registro1@gmail.com',
            IDUSER: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            FIRSTNAME : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            LASTNAME : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            AGE : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            EMAIL : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            IDCLIENT : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 }
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
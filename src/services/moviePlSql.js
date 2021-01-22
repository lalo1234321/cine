const oracledb = require('oracledb');
const BD = require('../config/oracle.js');


exports.getMovieByName = async(name) => {
    try{
        let result = await BD.Open(
            `BEGIN
            procMovie(:nameMovie, :IDMOVIE, :DURATION, :MOVIENAME, :POSTERIMAGE, :GENDERNAME );
            END;
            `
        ,{
            nameMovie : name,
            IDMOVIE: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            DURATION : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            MOVIENAME : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            POSTERIMAGE : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            GENDERNAME : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 }
        })

        return result;
    }catch(error) {

        return error
    }

}
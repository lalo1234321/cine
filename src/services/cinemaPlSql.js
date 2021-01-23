const oracledb = require('oracledb');
const BD = require('../config/oracle.js');


exports.getCinemaDataByNameAndLocation = async(name,location) => {
    try{
        let result = await BD.Open(
            `BEGIN
                procCinema(:nameCinema, :locationCinema, :IDCINEMA, :NAME, :LOCATION, :LOBBIES, :SEATSPERLOBBY );
            END;
            `
        ,{
            nameCinema : name,
            locationCinema : location,
            IDCINEMA: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            NAME : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            LOCATION : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            LOBBIES : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            SEATSPERLOBBY : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 }
        })

        return result;
    }catch(error) {

        return error
    }
}
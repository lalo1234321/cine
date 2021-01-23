const oracledb = require('oracledb');
const BD = require('../config/oracle.js');


exports.getClientByEmail = async() => {
    try {
        let result = await BD.Open(
            `BEGIN
            procClient(:emailClient, :IDUSER, :FIRSTNAME, :LASTNAME, :AGE, :EMAIL, :IDCLIENT, :PREMIUM );
            END;
            `
        ,{
            emailClient : 'registro1@gmail.com',
            IDUSER: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            FIRSTNAME : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            LASTNAME : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            AGE : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            EMAIL : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            IDCLIENT : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            PREMIUM : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 }
        });
        return result;
    }catch(error) {
        return error;
    }



}
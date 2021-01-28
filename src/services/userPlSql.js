const oracledb = require('oracledb');
const BD = require('../config/oracle.js');


exports.getClientByEmail = async(email) => {
    try {
        let result = await BD.Open(
            `BEGIN
            procClient(:emailClient, :IDUSER, :FIRSTNAME, :LASTNAME, :AGE, :EMAIL, :IDCLIENT, :PREMIUM );
            END;
            `
        ,{
            emailClient : email,
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

exports.getClientById = async(id) => {

    try {
        let result = await BD.Open(
            `BEGIN
            procClientId(:id, :IDUSER, :FIRSTNAME, :LASTNAME, :AGE, :EMAIL, :IDCLIENT, :PREMIUM );
            END;
            `
        ,{
            id,
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

exports.updateData = async(id, firstName, lastName, edad) => {
    try{
        let result = await BD.Open(
            `BEGIN
                :nombreNuevo := updateName(:id, :firstName);
                :apellidoNuevo := updateLastName(:id, :lastName);
                :edadNueva := updateAge(:id, :edad);
            END;
            `
        ,{
            id,
            firstName,
            lastName,
            edad,
            nombreNuevo : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            apellidoNuevo : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            edadNueva : { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 }
        },true);
        return result;

    }catch(error) {
        return error;
    }


}


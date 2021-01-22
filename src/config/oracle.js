const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
cns = {
    user: process.env.BD,
    password: process.env.BD_PASSWORD ,
    connectString: `localhost/${process.env.SERVICE_NAME}`
}



async function Open(sql,binds,autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, {autoCommit});
    cnn.release();
    return result;
}

const getConnection = () => {
    return oracledb.getConnection(cns);
}

const resultOracle = async(sql,binds) => {
    const result = await cns.execute(
        sql,
        binds,
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

}


module.exports = { Open, getConnection,resultOracle};
const oracledb = require('oracledb');


cns = {
    user: process.env.BD,
    password: process.env.BD_PASSWORD ,
    connectString: "localhost/orcl"
}

async function Open(sql,binds,autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, {autoCommit});
    cnn.release();
    return result;
}

exports.Open = Open;
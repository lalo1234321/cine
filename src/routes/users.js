const { Router } = require('express');
const bcrypt = require('bcrypt');
const router = Router();
const BD = require('../config/oracle.js');
const {verifyToken,verifyAdmin} = require('../middlewares/isAuth');
const { route } = require('./login.js');
const {getClientByEmail, getClientById} = require('../services/userPlSql');
var LogRegisterAdmin = require('debug')('register:registerAdmin'),
LogDecreaseSequenceNumber = require('debug')('register:decreaseSequenceNumber'),
LogRegisterClient = require('debug')('register:registerClient'),
LogGetClients = require('debug')('register:getClients'),
LogGetClientById = require('debug')('register:getClientById'),
LogGetClientByEmail = require('debug')('register:getClientByEmail'),
LogGetAdmins = require('debug')('register:getAdmins');


router.get('/',(req,res) => {
    res.status(200).json({
        message:'Se pudo conectar correctamente',
        

    });
});

router.post('/registerClient',async (req,res) => {
    //2,'Duck','Worth',20,'duckworth19@gmail.com','password1'
    let {firstname, lastname, age, email, password} = req.body;
    password = bcrypt.hashSync(password,5);
    let idUser;
    try {
        sql = "insert into users(idUser,firstName,lastName,age,email,password) values (user_idUser_seq.NEXTVAL,:firstname,:lastname,:age,:email,:password)";
        await BD.Open(sql,[firstname,lastname,age,email,password],true);
        result =  await UserQuery(email);
        LogRegisterClient('result: ', result);
        await clientRegistration(result.rows[0].IDUSER);
        LogRegisterClient('result.rows: ', result.rows);
        res.status(200).json({
        resultado:'Información grabada en la base de datos',
        hint:result.rows[0].IDUSER

        });
    } catch (error) {
        LogRegisterClient(error);
        decreaseSequenceNumber();
        res.status(500).json({
            error
        });
    }   
});

router.post('/registerAdmin',async (req,res)=>{
    let {firstname, lastname, age, email, password} = req.body;
    password = bcrypt.hashSync(password,5);
    let result;
    try{
        sql = "insert into users(idUser,firstName,lastName,age,email,password) values (user_idUser_seq.NEXTVAL,:firstname,:lastname,:age,:email,:password)";
        await BD.Open(sql,[firstname,lastname,age,email,password],true);
        result = await UserQuery(email);
        LogRegisterAdmin('result: ', result);
        await adminRegistration(result.rows[0].IDUSER);
        LogRegisterAdmin('result.rows: ', result.rows);
        res.status(200).json({
        resultado:'Información grabada en la base de datos',
        hint:result.rows[0].IDUSER

        }); 
    }catch (error){
        LogRegisterAdmin(error);
        decreaseSequenceNumber();        
        res.status(500).json({
            error
        });
    }
});


//Usuarios registrados
router.get('/getClients',[verifyToken,verifyAdmin], async (req, res) => {
    sql = "select * from allClients";
    let result = await BD.Open(sql, [], true);
   
    LogGetClients('result: ', result);
    res.json({
        Registros:result.rows
    });
});

//cliente por id
router.get('/getClientById/:idClient',[verifyToken,verifyAdmin], async (req, res) => {
    let idClient = req.params.idClient;
    // sql = "select * from allClients WHERE idClient=:idClient";
    // let result = await BD.Open(sql, [idClient], true);
    let result = await getClientById(idClient);
    LogGetClientById('result: ', result);
    res.json({
        Registros:result.outBinds
    });
});

router.get('/getClientByEmail/:email',[verifyToken,verifyAdmin], async (req, res) => {
    let email = req.params.email;
    // sql = "select u.idUser,u.firstName, u.age, u.email,c.idClient from users u, client c where u.idUser=c.idUser and u.email=:email";
    // let result = await BD.Open(sql, [email], true);
    let result = await getClientByEmail(email);
    LogGetClientByEmail('resut: ', result);
    res.json({
        Registros:result.outBinds
    });
});



router.get('/getAdmins',[verifyToken,verifyAdmin], async (req, res) => {
    sql = "select * from allAdmins";
    let result = await BD.Open(sql, [], true);
    LogGetAdmins('result: ', result);
    res.json({
        Registros:result.rows
    });
});

async function clientRegistration  (idUser){
    let idClient = idUser;
    sql = "insert into client(idClient, idUser, premium) values (:idClient,:idUser,default)";
    await BD.Open(sql,[idClient,idUser],true);
    return true; 
}

async function adminRegistration(idUser){
    let idAdmin = idUser;
    sql = "insert into admin(idAdmin, idUser) values (:idAdmin,:idUser)";
    await BD.Open(sql,[idAdmin,idUser],true);
    return true; 
}
async function UserQuery (email) {
    sql = "select * from users where email=:email"
    let result = await BD.Open(sql,[email],true);

    return result;
}
//This function is triggered when a register with a repeated email is inserted
const decreaseSequenceNumber = async () => {
    try {
        LogDecreaseSequenceNumber('\nALTER SEQUENCE user_idUser_seq INCREMENT BY -1');
        let connection = await BD.getConnection();
        sql = "ALTER SEQUENCE user_idUser_seq INCREMENT BY -1";
        await connection.execute(sql);
        sql = "SELECT user_idUser_seq.NEXTVAL FROM dual";
        await connection.execute(sql);
        sql = "ALTER SEQUENCE user_idUser_seq INCREMENT BY 1";
        await connection.execute(sql);
        await connection.close();
    }catch(e) {
        LogDecreaseSequenceNumber('Error: \n', e);
    }
}

module.exports = router;


// select u.idUser,u.firstName, u.age, u.email,c.idClient from users u, client c where u.idUser=c.idUser and u.email='registro1@gmail.com';
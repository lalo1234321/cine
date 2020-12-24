const { Router } = require('express');
const bcrypt = require('bcrypt');
const router = Router();
const BD = require('../config/oracle.js');
const {verifyToken,verifyAdmin} = require('../middlewares/isAuth');
const { route } = require('./login.js');


router.get('/',(req,res) => {
    res.status(200).json({
        message:'Se pudo conectar correctamente',
        

    });
});

router.post('/registerClient',async (req,res) => {
    //2,'Duck','Worth',20,'duckworth19@gmail.com','password1'
    let {firstname, lastname, age, email, password} = req.body;
    password = bcrypt.hashSync(password,5);
    console.log(password);
    let idUser;
    try {
        sql = "insert into users(idUser,firstName,lastName,age,email,password) values (user_idUser_seq.NEXTVAL,:firstname,:lastname,:age,:email,:password)";
        await BD.Open(sql,[firstname,lastname,age,email,password],true);
        result =  await UserQuery(email);
        await clientRegistration(result.rows[0][0]);
        res.status(200).json({
        resultado:'Información grabada en la base de datos',
        hint:result.rows[0][0]

        });
    } catch (error) {
        res.status(500).json({
            message:'Usuario existente, intente con un nuevo correo'
        });
    }   
});

router.post('/registerAdmin',async (req,res)=>{
    let {firstname, lastname, age, email, password} = req.body;
    password = bcrypt.hashSync(password,5);
    console.log(password);
    let result;
    try{
        console.log('antes de sql');
        sql = "insert into users(idUser,firstName,lastName,age,email,password) values (user_idUser_seq.NEXTVAL,:firstname,:lastname,:age,:email,:password)";
        await BD.Open(sql,[firstname,lastname,age,email,password],true);
        console.log('despues del open');
        result = await UserQuery(email);
        console.log(result.rows[0][1]);
        await adminRegistration(result.rows[0][0]);
        res.status(200).json({
        resultado:'Información grabada en la base de datos',
        hint:result.rows[0][0]

        }); 
    }catch (error){
        res.status(500).json({
            message:'Admin existente, intente con un nuevo Usuario'
        });
    }
});


//Usuarios registrados
router.get('/getClients',[verifyToken,verifyAdmin], async (req, res) => {
    sql = "select u.idUser,u.firstName,u.lastName,u.age,u.email,c.idClient,c.premium from users u inner join client c on u.iduser = c.iduser";
    let result = await BD.Open(sql, [], true);
    res.json({
        Registros:result.rows
    });
});

//cliente por id
router.get('/getClientById/:idClient',[verifyToken,verifyAdmin], async (req, res) => {
    let idClient = req.params.idClient;
    console.log(idClient);
    sql = "select u.idUser, u.firstName, u.age, u.email, c.idClient from users u join client c on (u.idUser=c.idUser) where c.idClient=:idClient";
    let result = await BD.Open(sql, [idClient], true);
    res.json({
        Registros:result.rows
    });
});

router.get('/getClientByEmail/:email',[verifyToken,verifyAdmin], async (req, res) => {
    let email = req.params.email;
    sql = "select u.idUser,u.firstName, u.age, u.email,c.idClient from users u, client c where u.idUser=c.idUser and u.email=:email";
    let result = await BD.Open(sql, [email], true);
    res.json({
        Registros:result.rows
    });
});



router.get('/getAdmins', async (req, res) => {
    sql = "select * from users inner join admin on users.iduser = admin.iduser";
    let result = await BD.Open(sql, [], true);
    res.json({
        Registros:result.rows
    });
});

async function clientRegistration  (idUser){
    let idClient = idUser;
    sql = "insert into client(idClient, idUser, premium) values (:idClient,:idUser,default)";
    await BD.Open(sql,[idClient,idUser],true);
    console.log('ok');
    return true; 
}

    async function adminRegistration(idUser){
    let idAdmin = idUser;
    sql = "insert into admin(idAdmin, idUser) values (:idAdmin,:idUser)";
    await BD.Open(sql,[idAdmin,idUser],true);
    console.log('ok');
    return true; 
}
async function UserQuery (email) {
    sql = "select * from users where email=:email"
    let result = await BD.Open(sql,[email],true);

    return result;
}
module.exports = router;


// select u.idUser,u.firstName, u.age, u.email,c.idClient from users u, client c where u.idUser=c.idUser and u.email='registro1@gmail.com';
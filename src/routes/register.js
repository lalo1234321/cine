const { Router } = require('express');
const router = Router();
const BD = require('../config/oracle.js');

router.get('/',(req,res) => {
    res.status(200).json({
        message:'Se pudo conectar correctamente',
        

    });
});

router.post('/registerUser',async (req,res) => {
    //2,'Duck','Worth',20,'duckworth19@gmail.com','password1'
    const {firstname, lastname, age, email, password} = req.body;
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

//Usuarios registrados
router.get('/getUsers', async (req, res) => {
    sql = "select * from users inner join client on users.iduser = client.iduser";
    let result = await BD.Open(sql, [], true);
    res.json({
        Registros:result.rows
    });
    /*sql = "select * from users  inner join client  on users.iduser = client.iduser";
    let result = await BD.Open(sql, [], true);
    //console.log(result.rows);
    res.json({
        Registros:result.rows
    });*/
});

async function clientRegistration  (idUser){
    let idClient = idUser;
    sql = "insert into client(idClient, idUser, premium) values (:idClient,:idUser,default)";
    await BD.Open(sql,[idClient,idUser],true);
    console.log('ok');
    return true; 
}
async function UserQuery (email) {
    sql = "select * from users where email=:email"
    let result = await BD.Open(sql,[email],true);

    return result;
}
module.exports = router;
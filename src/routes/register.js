const { Router } = require('express');
const router = Router();
const BD = require('../config/oracle.js');

router.get('/',(req,res) => {
    res.status(200).json({
        message:'Se pudo conectar correctamente'
    });
});

router.post('/registerUser',async (req,res) => {
    //2,'Duck','Worth',20,'duckworth19@gmail.com','password1'
    let {idUser, name, lastname, age, email, password,idClient} = req.body;
    let idUserAux = idUser;
    let idClientAux = idClient;
    
    try {
        sql = "insert into users values (:idUser,:name,:lastname,:age,:email,:password)";
        await BD.Open(sql,[idUser,name,lastname,age,email,password],true);
        a(idClientAux,idUserAux);
        res.status(200).json({
        resultado:'Información grabada en la base de datos'
        });
    } catch (error) {
        res.json({
            message:'Usuario existente, intente con un nuevo correo'
        });
    }   
});

//Usuarios registrados
router.get('/getUsers', async (req, res) => {
    sql = "select * from users  inner join client  on users.iduser = client.iduser";
    let result = await BD.Open(sql, [], true);
    //console.log(result.rows);
    res.json({
        Registros:result.rows
    });
});

async function a  (idClient,idUser){
    sql = "insert into client values (:idClient,:idUser,default)";
    await BD.Open(sql,[idClient,idUser],true);
    console.log('ok');
    return true; 
}

module.exports = router;
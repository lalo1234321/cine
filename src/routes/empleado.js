<<<<<<< HEAD
const { json } = require('body-parser');
const { Router } = require('express');
const router = Router();
const BD = require('../config/oracle.js');

router.get('/',(req,res) => {
    res.status(200).json({
        ok:true
    });
});

//READ
router.get('/getUsers', async (req, res) => {
    sql = "select * from empleados";
    //sql = "";
    let result = await BD.Open(sql, [], true);
    console.log(result.rows);
    res.json({
        Empleados:result.rows
         
    });
});


   

router.post('/addUser', async (req, res) => {
    const { idempleado, nombre, edad, sueldo } = req.body;

    sql = "insert into empleados(idempleado , nombre, edad, sueldo) values (:idempleado, :nombre, :edad, :sueldo)";

    await BD.Open(sql, [idempleado , nombre, edad, sueldo], true);

    res.status(200).json({
        "ok" : true
    });
});

//UPDATE
router.put("/updateUser/:id", async (req, res) => {
    const { nombre, edad, sueldo } = req.body;
    const id = req.params.id;
    sql = "update empleados set nombre=:nombre, edad=:edad, sueldo=:sueldo where idempleado=:id";

    await BD.Open(sql, [nombre, edad, sueldo,id], true);

    res.status(200).json({
        Message:'Cambios realizaodos en la BD' 
    });

});


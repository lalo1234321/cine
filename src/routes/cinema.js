
const {Router} = require('express'); 
const { format } = require('morgan');
const router = Router();
const BD = require('../config/oracle.js');
const {verifyToken,verifyAdmin} = require('../middlewares/isAuth');
const LogRegisterCinema = require('debug')('registerCinema:registerCinema');

router.post('/registerCinema',[verifyToken,verifyAdmin], async (req,res) => {
    let {name, location, numberOfLobbies, numberOfSeatPerLobby} = req.body;
    // console.log('Afuera del try catch');
    // console.log('registerCinema numberOfSeatPerLobby: ', numberOfSeatPerLobby);
    let idAdmin = req.id;
    let idCinema;
    try {
        sql = "insert into cinema values (cinema_idCinema_seq.NEXTVAL,:idAdmin,:name,:location)";
        await BD.Open(sql,[idAdmin,name,location],true);
        idCinema = await cinemaQuery(name,location);
        LogRegisterCinema('idCinema: ', idCinema);
        await createLobby(numberOfLobbies, numberOfSeatPerLobby, idCinema);
        res.status(200).json({
            ok:true,
            message:'Cine registrado exitosamente en la base de datos'
        });
    } catch (error) {
        LogRegisterCinema(error);
        res.status(500).json({
            error
        });
    }
});


router.get('/getAllCinemasData',[verifyToken,verifyAdmin],async(req,res) => {
    sql ="select c.idCinema, c.name, c.location ,count(distinct(l.idLobby))  lobbies , count(distinct(s.idSeat))/count(distinct(l.idLobby))  seatsPerLobby from cinema c join lobby l on(c.idCinema=l.idCinema) join seat s on(l.idLobby=s.idLobby)  group by c.idCinema, c.name, c.location ORDER BY c.idCinema";
    try{
        let result = await BD.Open(sql, [], true);
        res.status(200).json({
            Registros:result.rows
        });
    } catch(error) {
        res.status(500).json({
            ok:false,
            message:error
        });
    }
});

router.get('/getCinemaData/:name/:location',[verifyToken,verifyAdmin], async(req,res) => {
    let {name, location} = req.params
    console.log(name);
    console.log(location);
    sql ="select c.idCinema, c.name, c.location ,count(distinct(l.idLobby))  lobbies , count(distinct(s.idSeat))/count(distinct(l.idLobby))  seatsPerLobby from cinema c join lobby l on(c.idCinema=l.idCinema) join seat s on(l.idLobby=s.idLobby) group by c.idCinema, c.name, c.location HAVING c.name=:name AND c.location=:location";
    try {
        let result = await BD.Open(sql,[name,location], true);
        res.status(200).json({
            Registros : result.rows 
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            message:error
        });
    }
});

const createLobby =  async (numberOfLobbies, numberOfSeatPerLobby, idCinema) => {
    let result;
    let idLobby;
    for(let i = 1;i<=numberOfLobbies;i++) {        
        try {
            
            // console.log('antes del primer insert');
            sql1 =  "insert into lobby values (lobby_idLobby_seq.NEXTVAL,:idCinema,:i)";
            result = await BD.Open(sql1,[idCinema,i],true);
                      
            // console.log('Despues del primer insert');
        } catch (error) {
            console.log('Falló algo en la creación de las salas');
        } 
        
        idLobby = await obtainLastInsertLobby();
        await createSeats(idLobby, numberOfSeatPerLobby); 
        // console.log('fuera del segundo ciclo');
        // console.log('numberOfSeatPerLobby: ', numberOfSeatPerLobby);
        
    
        
    }     
};


const cinemaQuery = async (name, location) => {
    sql = "select idCinema from cinema where name=:name AND location=:location";
    const result = await BD.Open(sql,[name,location],true);
    // console.log(result.rows[0][0]);
    return result.rows[0][0];
};

const obtainLastInsertLobby = async() => {
    sql = "select * from(select * from lobby order by idLobby desc) where rownum=1";
    let result = await BD.Open(sql,[],true);
    console.log(result.rows[0][0]);
    return result.rows[0][0];
}

const createSeats = async (idLobby,numberOfSeatPerLobby) => {
    for(let j=1;j<=numberOfSeatPerLobby;j++){
                    
        //console.log(`Dentro del ciclo interno ${j}`);
        try{
            sql2 = "insert into seat values (seat_idSeat_seq.NEXTVAL,:idLobby,:j)";
            await BD.Open(sql2,[idLobby,j],true);                    
        } catch(err) {
            console.log(`Falló en la creación del asiento ${j}`);
        }
} 
}

module.exports = router;

// insert into seat values (seat_idSeat_seq.NEXTVAL,4,1);

//select c.idCinema, c.name, c.location ,count(l.idLobby) from cinema c join lobby l on (c.idCinema=l.idCinema) group by c.location;
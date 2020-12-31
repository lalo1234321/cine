

const {Router} = require('express'); 
const router = Router();
const BD = require('../config/oracle.js');
const {verifyToken,verifyAdmin} = require('../middlewares/isAuth');


router.post('/registerMovieLobby',[verifyToken,verifyAdmin], async (req,res) => {
    let {name,location,lobbyNumber,movieName,schedule} = req.body;
    let idCinema = await obtainIdCinema(name,location);
    let idLobby = await obtainIdLobby(idCinema,lobbyNumber);
    let idMovie = await obtainIdMovie(movieName);
    console.log(schedule);
    sql = "insert into movie_lobby values (:idMovie,:idLobby,TO_DATE(:schedule, 'yyyy/mm/dd hh24:mi:ss'))";
    try {
        await BD.Open(sql,[idMovie, idLobby, schedule],true);
        res.status(200).json({
            ok:true,
            message: 'El registro se ha guardado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            error
        });
    }
    

});

router.get('/getMovieLobbyInCinemaDate/:name/:location/:schedule',[verifyToken], async(req,res) => {
    let {name, location,schedule} = req.params;
    let idCinema = await obtainIdCinema(name, location);
    let sql = "select ml.idMovie,l.lobbyNumber,TO_CHAR(ml.schedule,'HH:MM'),m.name,m.posterImage,m.duration from movie_lobby ml JOIN movie m ON (ml.idMovie=m.idMovie) JOIN lobby l ON (ml.idLobby=l.idLobby) WHERE ml.idLobby IN (select idLobby from lobby WHERE idCinema=:idCinema) AND TO_CHAR(ml.schedule,'YYYY-MM-DD')=:schedule";
    try {
        let result = await BD.Open(sql,[idCinema,schedule],true);
        res.status(200).json({
            registros:result.rows
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            error
        });
    }
});

const obtainIdCinema = async(name,location) => {
    sql = "select idCinema from cinema where name=:name AND location=:location";
    let id;
    try {
        let result = await BD.Open(sql,[name,location],true);
        id = result.rows[0][0];
    } catch (error) {
        return error
    }
    
    return id;
    
}


const obtainIdLobby = async(idCinema, lobbyNumber) => {
    sql = "select idLobby from lobby where idCinema=:idCinema AND lobbyNumber=:lobbyNumber";
    let id;
    try {
        let result = await BD.Open(sql,[idCinema,lobbyNumber],true);
        id = result.rows[0][0];
    } catch (error) {
        return error
    }
    
    return id;

}


const obtainIdMovie = async(movieName) => {
    sql = "select idMovie from movie WHERE name=:movieName";
    let id;
    try {
        let result = await BD.Open(sql,[movieName],true);
        id = result.rows[0][0];
    } catch (error) {
        return error
    }
    return id;
}

module.exports = router;
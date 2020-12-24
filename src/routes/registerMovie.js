
const {Router} = require('express'); 
const router = Router();
const BD = require('../config/oracle.js');
const {verifyToken,verifyAdmin} = require('../middlewares/isAuth');
const { route } = require('./login.js');

router.post('/registerMovie',[verifyToken,verifyAdmin], async (req,res) => {
    let {idGender, duration, name, posterImage} = req.body;

    try {
        sql = "insert into movie values (movie_idMovie_seq.NEXTVAL,:idGender,:duration,:name,:posterImage)";
        await BD.Open(sql,[idGender,duration,name,posterImage],true);
        res.status(200).json({
            ok:true,
            message:'Película registrada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            error
        })
    }


});

router.get('/getMovieByName/:name',[verifyToken,verifyAdmin], async (req,res) => {
    let name = req.params.name;
    console.log(name);
    sql = "select m.idMovie, m.duration, m.name, m.posterImage,g.name from movie m join gender g using (idGender) where m.name=:name";
    let result = await BD.Open(sql,[name],true);
    res.json({
        Registros:result.rows
    });
});

router.get('/getAllMovies',[verifyToken,verifyAdmin], async (req, res) => {
    sql = "select m.idMovie, m.duration, m.name, m.posterImage,g.name from movie m inner join gender g on (m.idgender=g.idGender)";
    let result = await BD.Open(sql, [], true);
    res.json({
        Registros:result.rows
    });
});



module.exports = router;
//select m.idMovie, m.duration, m.name, m.posterImage, g.name from movie m join gender g using (idGender) where m.name='Risa1';

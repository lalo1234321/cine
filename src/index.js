const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();
//imports
//const empleado = require('./routes/empleado');
const users = require('./routes/users');
const login = require('./routes/login');
const genre = require('./routes/gender');
const movie = require('./routes/movie');
const cinema = require('./routes/cinema');
const movieLobby = require('./routes/movieLobby');
//settings
app.set('port', process.env.PORT);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
//app.use(empleado);
app.use(users);
app.use(login);
app.use(genre);
app.use(movie);
app.use(cinema);
app.use(movieLobby);
//run
app.listen(app.get('port'), () => {
    console.log(`Server on Port ${process.env.PORT}`);
})
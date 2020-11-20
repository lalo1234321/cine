const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();
//imports
//const empleado = require('./routes/empleado');
const register = require('./routes/register');

//settings
app.set('port', 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
//app.use(empleado);
app.use(register);



//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
})
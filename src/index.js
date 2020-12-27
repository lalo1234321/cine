const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();
//settings
app.set('port', process.env.PORT);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
require('./routes/index')(app);
//run
app.listen(app.get('port'), () => {
    console.log(`Server on Port ${process.env.PORT}`);
})
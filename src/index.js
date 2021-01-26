const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();
const testPlSlq = require('./routes/testPlSql.js');
//settings
app.set('port', process.env.PORT);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(testPlSlq);

// let corsOptions = {
//     origin: 'http://192.168.100.6:3000',
//     optionsSuccessStatus: 200, // For legacy browser support
//     methods: "GET, PUT"
// }
app.use(cors());



//routes
require('./routes/index')(app);
//run
app.listen(app.get('port'), () => {
    console.log(`Server on Port ${process.env.PORT}`);
})
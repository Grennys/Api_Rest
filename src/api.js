const express = require('express');
const morgan = require('morgan');
const app =  express();

//Configuraciones del puerto
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //entender los json
app.use(express.json()); 

//Rutas
app.use('/admi',require('./rutas/rutas_web'));
app.use(require('./rutas/rutas_movil'));


module.exports = app;
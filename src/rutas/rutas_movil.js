const { Router } = require('express');
const rutas = Router();

const fs = require('fs');
const data = fs.readFileSync('src/Base_datos/productos.json');
const myData = JSON.parse (data);

//Libreria que nos falicita el manejo de los datos
const under = require('underscore');





module.exports = rutas;
const { Router } = require('express');
const rutas = Router();

const fs = require('fs');
const data = fs.readFileSync('src/Base_datos/productos.json');
const myData = JSON.parse (data);

//Libreria que nos falicita el manejo de los datos
const under = require('underscore');

let Eprodcuto = myData;


//Eliminar un producto
rutas.delete('/productos/:sku', (req, res ) => {
    const { sku } = req.params;
    Eprodcuto = Eprodcuto.filter(Eprodcuto => Eprodcuto.sku != req.params.sku);
    const nuevoP_json = JSON.stringify(Eprodcuto);
    fs.writeFileSync('src/Base_datos/productos.json', nuevoP_json);
    res.send('¡Se eliminó el producto satisfactoriamente!');
});


module.exports = rutas;





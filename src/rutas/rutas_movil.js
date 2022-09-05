const { Router } = require('express');
const rutas = Router();

const fs = require('fs');
const data = fs.readFileSync('src/Base_datos/productos.json');
const myData = JSON.parse (data);

//Libreria que nos falicita el manejo de los datos
const under = require('underscore');


//Resumen de compra
rutas.post('/resumen', (req, res ) => {      
    
    let ArrayResumen = [];    
    let precio_final = 0;
    let total_compra = 0;

    under.each(myData, (producto,i) =>{    
        under.each(req.body, (sku, i) => {
            if(producto.sku == sku){                   
                precio_final = (producto.precio - (producto.precio * producto.descuento) + (producto.precio + producto.iva));
                total_compra =  precio_final + total_compra;            
                ArrayResumen.push({
                    "sku:": producto.sku, "Nombre: ": producto.nombre, "Precio_final": precio_final,"total_compra: ": total_compra            
                });                         
            }                          
        });
    });         
    res.json(ArrayResumen);
    
});


module.exports = rutas;
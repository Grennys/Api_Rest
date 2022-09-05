const { Router } = require('express');
const rutas = Router();

const fs = require('fs');
const data = fs.readFileSync('src/Base_datos/productos.json');
const myData = JSON.parse (data);

//Libreria que nos falicita el manejo de los datos
const under = require('underscore');



//Listar producto
rutas.get('/producto', (req, res) =>{            
    
    const dataString = JSON.stringify(myData);          
    let array =  JSON.parse(dataString);    
    var ArrayData = [];    
    let precio_final = 0;

    under.each(array, (producto,i) =>{     
        precio_final = (producto.precio - (producto.precio * producto.descuento) + (producto.precio + producto.iva));
        if(producto.inventario > 0){
            ArrayData.push({
                "nombre: ": producto.nombre, "sku: ": producto.sku, "url: ": producto.url, "marca: ": producto.marca,"precio total: ": precio_final
            });
        }        
    });              
    
    res.json(ArrayData);    
    
});

module.exports = rutas;
const { Router } = require('express');
const rutas = Router();

const fs = require('fs');
const data = fs.readFileSync('src/Base_datos/productos.json');
const myData = JSON.parse (data);

//Libreria que nos falicita el manejo de los datos
const under = require('underscore');

//Consultar productos
rutas.get('/producto/:sku', (req, res) =>{            
    const { sku } = req.params;    
    const dataString = JSON.stringify(myData);          
    let array =  JSON.parse(dataString);    
    var ArrayData = [];        

    under.each(array, (producto,i) =>{     
        precio_final = (producto.precio - (producto.precio * producto.descuento) + (producto.precio + producto.iva));        
        if(producto.sku == sku){
            ArrayData.push({
                "sku: ": producto.sku,"Nombre: ": producto.nombre, "Precio: ": producto.precio, 
                "Url: ": producto.url, "Marca: ": producto.marca, "Descripción: ": producto.descripcion,
                "Iva: ": producto.iva, "Desceunto: ": producto.descuento,"precio final: ": precio_final
            });
        }        
    });                  
    res.json(ArrayData);        
});



module.exports = rutas;
const { Router } = require('express');
const rutas = Router();

const fs = require('fs');
const data = fs.readFileSync('src/Base_datos/productos.json');
const myData = JSON.parse (data);

//Libreria que nos falicita el manejo de los datos
const under = require('underscore');




//Consultar productos por sku
rutas.get('/productos/:sku', (req, res ) => {    
    const { sku } = req.params;    
    under.each(myData, (producto,i) =>{
        if(producto.sku == sku){                
            res.json(producto);        
        }             
    });     
});

//Listar productos
rutas.get('/productos', (req, res) =>{            
    
    const dataString = JSON.stringify(myData);          
    let array =  JSON.parse(dataString);    
    var ArrayData = [];        

    under.each(array, (producto,i) =>{             
        ArrayData.push({
            "nombre: ": producto.nombre, "sku: ": producto.sku, "precio: " : producto.precio,
            "url: ": producto.url, "marca: ": producto.marca, "iva: ": producto.iva,
            "iventario: ": producto.inventario
        }); 
    });              
    res.json(ArrayData);

});





module.exports = rutas;





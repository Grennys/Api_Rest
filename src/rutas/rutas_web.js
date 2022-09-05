const { Router } = require('express');
const rutas = Router();

const fs = require('fs');
const data = fs.readFileSync('src/Base_datos/productos.json');
const myData = JSON.parse (data);

//Libreria que nos falicita el manejo de los datos
const under = require('underscore');





//Ordenes de compra
rutas.get('/ordenes', (req, res) =>{       
    const fs = require('fs');    
    const data = fs.readFileSync('src/Base_datos/ordenes.json');
    const myOrdenes = JSON.parse (data);                  
    
    let arrayCompra = [];    

    under.each(myOrdenes, (orden,i) =>{            
        under.each(myData, (producto, j) => {
            if(orden.productos[i] = producto.sku  ){       
                arrayCompra.push({
                    orden,"Nombre":producto.nombre, "Sku":producto.sku, "marca":producto.marca,"url": producto.url    
                }); 
            }                          
        });        
    });          
    res.json(arrayCompra);
    
});

module.exports = rutas;





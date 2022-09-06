const { Router } = require('express');
const rutas = Router();

const fs = require('fs');
const data = fs.readFileSync('src/Base_datos/productos.json');
const myData = JSON.parse (data);

//Libreria que nos falicita el manejo de los datos
const under = require('underscore');


let compras = myOrdenes;


//Comprar
rutas.post('/comprar', (req, res ) => {          

    let arrayId = [];
    const { nombre, apellido, productos } = req.body;    
    arrayId.push(req.body);
    let numero_orden = compras.length + 1;
        
    var precio_final = 0;
    var total_compra = 0;

    under.each(myData, (producto,i) =>{    
        under.each(req.body, (sku, j) => {
            if(producto.sku == sku[i]){                   
                precio_final = (producto.precio - (producto.precio * producto.descuento) + (producto.precio + producto.iva));
                total_compra =  precio_final + total_compra;                     
            }                          
        });                
    });          
    
    
    if ( nombre, apellido, productos ) {                
        let NuevoP = {
            numero_orden, nombre, apellido, productos, total_compra,
        };
        compras.push(NuevoP);
        const nuevoP_json =  JSON.stringify(compras);
        fs.writeFileSync('src/Base_datos/ordenes.json', nuevoP_json, 'utf-8');
        res.send('¡compra satisfactoria! Número de la orden:' + numero_orden);        
    } else {
        res.status(500).json({error: 'Todos los campos son requeridos.'});
    } 
    

//Consultar productos
rutas.get('/producto/:sku', (req, res) =>{            
    const { sku } = req.params;    
    const dataString = JSON.stringify(myData);          
    let array =  JSON.parse(dataString);    
    var ArrayData = [];        


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
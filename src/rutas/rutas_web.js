const { Router } = require('express');
const rutas = Router();

const fs = require('fs');
const data = fs.readFileSync('src/Base_datos/productos.json');
const myData = JSON.parse (data);

//Libreria que nos falicita el manejo de los datos
const under = require('underscore');


let Nprodcuto = myData;



//Post agregar un producto
rutas.post('/productos', (req, res ) => {  
    var date = new Date(); 
    var fecha = date.toLocaleDateString();   
    const { sku, nombre,precio,url,marca,descripcion,iva,descuento,inventario } = req.body;    
    if ( sku && nombre && precio && url && marca && descripcion && iva && descuento && inventario ) {                
        let NuevoP = {
            sku,nombre,precio, url, marca, descripcion, iva, descuento, inventario, fecha
        };
        Nprodcuto.push(NuevoP);
        const nuevoP_json =  JSON.stringify(Nprodcuto);
        fs.writeFileSync('src/Base_datos/productos.json', nuevoP_json, 'utf-8');
        res.send('¡Se insertó el producto satisfactoriamente!');
    } else {
        res.status(500).json({error: 'Todos los campos son requeridos.'});
    }
});




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





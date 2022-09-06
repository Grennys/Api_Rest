const { Router } = require('express');
const rutas = Router();

const fs = require('fs');
const data = fs.readFileSync('src/Base_datos/productos.json');
const myData = JSON.parse (data);

//Libreria que nos falicita el manejo de los datos
const under = require('underscore');

let Eprodcuto = myData;

let Nprodcuto = myData;

//Ruta para actulizar 
rutas.put('/productos/:id', (req, res ) => {   
    let Nprodcuto = myData;    
    const { id } = req.params;                
    var date = new Date(); 
    var fecha = date.toLocaleDateString();       
    const { sku, nombre,precio,url,marca,descripcion,iva,descuento,inventario } = req.body;    
    if ( sku && nombre && precio && url && marca && descripcion && iva && descuento && inventario ) {                
        under.each(myData, (producto,i) =>{  
            console.log(id, producto.sku);
            if(producto.sku == id){                                 
                Nprodcuto = Nprodcuto.filter(Nprodcuto => Nprodcuto.sku != req.params.id);
                const nuevoP_json = JSON.stringify(Nprodcuto);
                fs.writeFileSync('src/Base_datos/productos.json', nuevoP_json);
            }                      
        });  

        let NuevoP = {
            sku, 
            nombre,
            precio,
            url,
            marca,
            descripcion,
            iva,
            descuento,
            inventario,
            fecha
        };
        Nprodcuto.push(NuevoP);
        const nuevoP_json =  JSON.stringify(Nprodcuto);
        fs.writeFileSync('src/Base_datos/productos.json', nuevoP_json, 'utf-8');{
            res.send('El producto se actualizo satisfactoriamente');
        }            
    } else {
        res.status(500).json({error: 'Todos los campos son requeridos.'});
    }           
});

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


//Eliminar un producto
rutas.delete('/productos/:sku', (req, res ) => {
    const { sku } = req.params;
    Eprodcuto = Eprodcuto.filter(Eprodcuto => Eprodcuto.sku != req.params.sku);
    const nuevoP_json = JSON.stringify(Eprodcuto);
    fs.writeFileSync('src/Base_datos/productos.json', nuevoP_json);
    res.send('¡Se eliminó el producto satisfactoriamente!');
});



module.exports = rutas;





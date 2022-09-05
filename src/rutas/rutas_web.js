const { Router } = require('express');
const rutas = Router();

const fs = require('fs');
const data = fs.readFileSync('src/Base_datos/productos.json');
const myData = JSON.parse (data);

//Libreria que nos falicita el manejo de los datos
const under = require('underscore');



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



module.exports = rutas;





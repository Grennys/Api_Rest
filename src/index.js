
const app = require('./api');

//Escucha en el puerto 3000
app.listen( app.get('port'), () => { 
    console.log(`Servidor corriendo en puerto: `, app.get('port') );
});
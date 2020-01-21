'use strict'

const mongoose = require('mongoose');
const app = require('./app');

let port = 3800;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://user:user@managment-api-ucjal.gcp.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('La conexion a la Base de datos se ha realizado correctamente!!');
        app.listen(port, ()=>{
            console.log(`Servidor corriendo en el puerto ${port}`);
        })
    }).catch(err => {
        console.log(err);
    });
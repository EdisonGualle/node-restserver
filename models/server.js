const express = require('express');
var cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.userPath = '/api/user';


        //Middlewares
        this.middlewares();

        //Rutas de nu aplicacion
        this.routes();
    }

    //metodos
    routes(){
        this.app.use(this.userPath,require('../routes/users'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());


        //Directorio Publico
        this.app.use(express.static('public'));
    }


}


module.exports = Server; 

const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        //Conectar a base de datos
        this.conectarDB();
        
        //Middlewares
        this.middlewares();

        //Rutas de nu aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }


    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());


        //Directorio Publico
        this.app.use(express.static('public'));
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

}


module.exports = Server; 
const express = require('express');
var cors = require('cors');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/user';

        
    //middlewares
        this.middlewares();
        //rutas de apliccion
        this.routes();
    }

    middlewares(){
        //Cors
        this.app.use(cors());

        //parseo lectura del body
        this.app.use( express.json());

        //directior publico
        this.app.use( express.static('public'));
    }

    routes() {
        
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;
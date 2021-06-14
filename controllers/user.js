const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrytjs = require('bcryptjs');

const usuariosGet = async(req, res = response) => {

    const { limite = 5, desde = 0} = req.query;
    const query = {
        estado:true
    }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
     total,
      usuarios
    });
}

const usuariosPost = async (req, res) => {

    const {nombre , correo, password , rol}  = req.body;
    const usuario = new  Usuario({nombre , correo, password , rol});
    

    // encriptar contraseña
    const salt = bcrytjs.genSaltSync();
    usuario.password = bcrytjs.hashSync(password , salt);

    //guardar db
    await usuario.save();

    res.status(201).json({
        usuario
    });
}


const usuariosPut = async(req, res) => {
    const id = req.params.id;
    const {password , google,correo, _id, ...resto} = req.body

    //TODO validar contra bd
    if(password){
            // encriptar contraseña
    const salt = bcrytjs.genSaltSync();
    resto.password = bcrytjs.hashSync(password , salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json(
        usuario
    );
}

const usuariosDelete = async(req, res) => {
    const {id} = req.params;

    //cambiar status del usuario
    const usuario = await Usuario.findByIdAndUpdate(id , {estado: false});
    res.json(usuario);
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
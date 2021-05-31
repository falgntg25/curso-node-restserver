const Role = require('../models/role');      
const Usuario = require('../models/usuario');


const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
           if( !existeRol) {
                  throw new Error('El rol' + rol + ' no esta registrada en la bd'); 
           }
   }
   
   const emailValido = async (correo = '') =>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail) {    
            throw new Error('El correo ya esta registrado')

    }
   }
   const existeUsuarioPorId = async (id ) =>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {    
            throw new Error('El id no existe')

    }
   }

   module.exports = {
       esRolValido,
       emailValido,
       existeUsuarioPorId
   }
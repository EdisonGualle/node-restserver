const Role = require('../models/role');
const User = require('../models/user');


const esRoleValido = async(rol ='') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
            throw new Error(`El rol ${rol} no esta registado en la base de datos`)
    }
}

const emailExiste = async( correo = '') =>{ 
    const cExiste = await (User.findOne({correo}));
    if(cExiste){
        throw new Error(`El correo ${correo}, ya esta registrado`);
    }

}

const existeUsuarioPorId = async(id) => { 
    const existeUsuario = await User.findById(id);
    if(!existeUsuario){
        throw new Error(`El id no existe`);
    }

}





module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}
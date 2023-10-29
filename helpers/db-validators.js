const { Categoria, User, Producto } = require('../models');
const Role = require('../models/role');



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
//Validadores personalizados de categorias
let validationDone = false;

const existeCategoriaPorId = async (id) => {
    if (validationDone) {
        return; // No se hace la validación si ya se realizó una vez
    }

    validationDone = true; // Marcar que la validación se ha realizado

    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
}

//Productos

const existeProductoPorId = async (id) => {
    if (validationDone) {
        return; // No se hace la validación si ya se realizó una vez
    }

    validationDone = true; // Marcar que la validación se ha realizado

    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}
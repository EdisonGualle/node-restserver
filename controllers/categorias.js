const { response } = require("express");
const {Categoria} = require('../models');




//getCategorias - paginado - total - populate
const getCategorias  =  async(req, res = response) =>{ 

    const {limite = 1, desde = 0 } = req.query;
    const query = {estado: true};

    //Permite mandar un arreglo con todas las promesas que se ejecuten
    const [totalCategorias, categorias]= await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('user','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        totalCategorias,
        categorias
    });

}


//ObtenerCategoria - pupulate {}
const getCategoria = async (req, res = response) => { 
    const {id} = req.params;
    const categoria = await Categoria.findById(id)
        .populate('user', 'nombre');

    res.json(categoria);
}



//Crear Categoria 
const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar 
    const data= { 
        nombre,
        user: req.user._id
    } 

    const categoria = new Categoria( data);

    //Guardar DB
    await categoria.save();

    res.status(201).json(data);
}

//actualizarCategoria
const putCategoria = async( req, res = response) =>{
    
    const {id}= req.params;
    const {estado, user, ...data} = req.body;
    
    data.nombre= data.nombre.toUpperCase();
    data.user= req.user._id;

    const categoria =  await Categoria.findByIdAndUpdate(id, data, {new:true});
    
    res.json(categoria);
}

//borrar Categoria - estado:False
const deleteCategoria = async (req, res = response) =>{

    const {id} = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(categoriaBorrada);
}




module.exports = {
    crearCategoria,
    getCategorias,
    getCategoria,
    putCategoria,
    deleteCategoria
}
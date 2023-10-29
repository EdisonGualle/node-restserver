const { response } = require("express");
const {Producto} = require('../models');




//getProducto - paginado - total - populate
const getProductos  =  async(req, res = response) =>{ 

    const {limite = 1, desde = 0 } = req.query;
    const query = {estado: true};

    //Permite mandar un arreglo con todas las promesas que se ejecuten
    const [totalProducto, productos ]= await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('user','nombre')
            .populate('categoria','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        totalProducto,
        productos
    });
}


//ObtenerCategoria - pupulate {}
const getProducto = async (req, res = response) => { 
    const {id} = req.params;
    const producto = await Producto.findById(id)
        .populate('user', 'nombre')
        .populate('categoria', 'nombre');
    res.json(producto);
}



//Crear Categoria 
const crearProducto = async(req, res = response) => {

    const {estado, user, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre:body.nombre});

    if(productoDB){
        return res.status(400).json({
            msg:`El producto ${productoDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar 
    const data= {
        ...body,
        nombre: body.nombre.toUpperCase(),
        user: req.user._id
    } 

    const producto = new Producto(data);

    //Guardar DB
    await producto.save();

    res.status(201).json(producto);
}

//actualizarCategoria
const putProducto = async( req, res = response) =>{
    
    const {id}= req.params;
    const {estado, user, ...data} = req.body;
    if(data.nombre){
        data.nombre= data.nombre.toUpperCase();
    }

    data.user= req.user._id;

    const producto =  await Producto.findByIdAndUpdate(id, data, {new:true});
    
    res.json(producto);
}

//borrar Categoria - estado:False
const deleteProducto = async (req, res = response) =>{

    const {id} = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(productoBorrado);
}


module.exports = {
    crearProducto,
    getProductos,
    getProducto,
    putProducto,
    deleteProducto
}
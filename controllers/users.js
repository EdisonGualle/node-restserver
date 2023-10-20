const{response, request} = require('express');
const bcrytjs = require('bcryptjs');

const User = require('../models/user.js');


const usersGet = async(req, res =response) =>{  
    const {limite = 1, desde = 0 } = req.query;
    const query = {estado: true};

    //Permite mandar un arreglo con todas las promesas que se ejecuten
    const [totalRegistros, users]= await Promise.all([
        User.countDocuments(query),
        User.find(query)
    //+validar que solamente sean numeros
    .skip(Number(desde))
    .limit(Number(limite))
    ]);

    const totalRegistos = await User.countDocuments(query);
    res.json({
        totalRegistos,
        users
    });
}

const usersPost =  async (req, res = response) => {

   
    const{nombre, correo, password, rol}= req.body;
    const user = new User({nombre, correo, password, rol});

    //Encriptar la contrasela
    const salt = bcrytjs.genSaltSync();
    user.password=bcrytjs.hashSync(password, salt);

    //Guardar en DB
    await user.save();


    res.json({
        user
    })
}

const usersPut =  async (req, res = response) => {

    const {id} = req.params;
    const {_id,password, google,correo, ...resto} = req.body;

    //Todo validar contra base de datos 
    if(password){
         //Encriptar la contrasela
    const salt = bcrytjs.genSaltSync();
    resto.password=bcrytjs.hashSync(password, salt);
    }

    //findByIdAndUpdate encuentra y actualiza la informacion
    const user = await User.findByIdAndUpdate(id, resto);


    res.json(user)
}


const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    })
}


const usersDelete =  async (req, res = response) => {

    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, {estado: false})


    res.json({
        user
    })
}



module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete
}
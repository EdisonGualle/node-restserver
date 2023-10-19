const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User=require('../models/user');

const validarJWT =async (req = request, res = response, next) =>{ 
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay toquen en la petición'
        });
    }

    try {
        const {uid}= jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer el usuario que corresponde al uid
        const user= await User.findById(uid);
        
        if(!user){
            return res.status(401).json({
                msg:'Token no valido - usuario no existe en DB'
            })
        }

        //Verificar si el uid tiene estado en true 
        if(!user.estado){
            return res.status(401).json({
                msg:'Token no valido - usuario con estado false'
            })
        }

        req.user= user;

        next();  
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no válido'
        })
    }
    

}

module.exports ={
    validarJWT
}
const { response } = require("express");

const adminRole = (req, res= response, next) =>{

    if(!req.user){
        return res.status(500).json({
            msg: 'Se requiere verificar el role sin validar el token primero'
        });
    }

    const {rol, nombre}= req.user;

    if(rol!== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es administrador - no puede hacer esto`
        });
    }

    next();
}

const tieneRol =(... roles ) =>{
    return (req, res= response, next) => {
        
    if(!req.user){
        return res.status(500).json({
            msg: 'Se requiere verificar el role sin validar el token primero'
        });
    }

    if(!roles.includes(req.user.rol)){
        return res.status(401).json({
            msg: `El servio requiere uno de estos roles ${roles}`
        })
    }


        next();
    }
}

module.exports={
    adminRole,
    tieneRol
}
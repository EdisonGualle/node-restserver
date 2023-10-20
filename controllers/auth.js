const {response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => { 

    const {correo, password} = req.body;
    try {

        //Verificar si el email existe
        const user = await User.findOne({correo});
        if(!user){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }
        //Si el usuario esta acivo 
        if(!user.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado:false'
            })
        }

        //Verificar la constrase;a
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT(user.id);
 
        res.json({
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const googleSingIn = async (req, res = response) =>{
    
    const {id_token} = req.body;

    try {
        const { nombre, img, correo } = await googleVerify(id_token);
        
        let user = await User.findOne({correo});
        
        if(!user){
            //Tocar crearlo
            const data ={ 
                nombre,
                correo,
                password: 'Rod',
                rol: 'USER_ROLE',
                img,
                google: true
            };
            user = new User(data);
            await user.save();
        }

        //Si el usuario en base DB
        if(!user.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }
        //Generar el JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.error('Error en googleSingIn:', error);
        res.status(400).json({
            ok: false,
            msg: 'Token de google no valido'
        })
    }


}



module.exports = {
    login,
    googleSingIn
}
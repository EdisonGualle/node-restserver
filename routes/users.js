
const {Router}= require('express');
const { check } = require('express-validator');


const {validarCampos} = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste,existeUsuarioPorId } = require('../helpers/db-validators');


const { usersGet, 
        usersPut, 
        usersPost, 
        usersDelete, 
        usersPatch } = require('../controllers/users');

const router = Router();


router.get('/', usersGet);

router.put('/:id',[
        check('id', 'No es una ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRoleValido),
        validarCampos
],
usersPut);

router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser mas de 6 letras').isLength(6),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
        check('rol').custom(esRoleValido),
        validarCampos
] , usersPost);

router.patch('/', usersPatch);

router.delete('/:id', [
        check('id', 'No es una ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
], usersDelete);




module.exports=router;
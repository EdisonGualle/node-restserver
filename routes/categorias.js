const {Router}= require('express');
const { check } = require('express-validator');

const {validarCampos, validarJWT, adminRole} = require('../middlewares');

const { crearCategoria, 
        getCategorias, 
        getCategoria, 
        putCategoria,
        deleteCategoria} = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();
/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - public
router.get('/',getCategorias);

// Obtener una categoria por id- public
router.get('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
    ], getCategoria);

// Crear Categoria - privado con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ], crearCategoria );

// Actualizar un registo por id - con cualquier token valido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], putCategoria);

// Borrar una categoria - admin
router.delete('/:id',[
    validarJWT,
    adminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
] ,deleteCategoria);



module.exports=router;

const {Router}= require('express');
const { check } = require('express-validator');

const {validarCampos, validarJWT, adminRole} = require('../middlewares');

const { crearProducto, 
        getProductos, 
        getProducto, 
        putProducto,
        deleteProducto} = require('../controllers/productos');
const { existeProductoPorId } = require('../helpers/db-validators');

const router = Router();
/**
 * {{url}}/api/Productos
 */

// Obtener todas las Productos - public
router.get('/',getProductos);

// Obtener una Producto por id- public
router.get('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
    ], getProducto);

// Crear Producto - privado con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeProductoPorId),
    validarCampos
    ], crearProducto );

// Actualizar un registo por id - con cualquier token valido
router.put('/:id',[
    validarJWT,
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], putProducto);

// Borrar una Producto - admin
router.delete('/:id',[
    validarJWT,
    adminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
] ,deleteProducto);


module.exports=router;

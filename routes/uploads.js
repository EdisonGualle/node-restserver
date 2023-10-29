const {Router}= require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImg, mostrarImagen, actualizarImgCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');


const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom ( c => coleccionesPermitidas(c, ['users', 'productos'])),
    validarCampos
], actualizarImgCloudinary)
// ], actualizarImg)

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom ( c => coleccionesPermitidas(c, ['users', 'productos'])),
    validarCampos
], mostrarImagen)

module.exports = router;
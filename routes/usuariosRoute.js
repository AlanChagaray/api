import express from 'express';
import { body, param } from 'express-validator';
import { search, get, post, remove, put } from '../controllers/usuariosController.js'
import { handleValidation } from '../middleware/handleValidation.js';
import { validarToken } from '../middleware/validarToken.js';
import { handleRol } from '../middleware/handleRol.js';


const router = express.Router();

router.get('/', 
    validarToken, 
    handleRol('administrador', 'ventas'), 
    search
);

router.get('/:idusuario', validarToken, handleRol('administrador'),
    param('idusuario')
        .isNumeric().withMessage('Campo debe ser numerico.'), 
    handleValidation,  get);

router.post('/', 
    validarToken,
    [ 
    body('nombre')
        .notEmpty().withMessage('Campo requerido.'), 
    body('apellido')
        .notEmpty().withMessage('Campo requerido.'), 
    body('usuario')
        .notEmpty().withMessage('Campo requerido.'), 
    body('password')
        .notEmpty().withMessage('Campo requerido.'), 
    body('email')
        .notEmpty().withMessage('Campo requerido.')
        .isEmail().withMessage("Formato incorrecto."), 
    ], 
    handleValidation, 
    post);

router.delete('/:idusuario', 
    param('idusuario')
        .isEmpty().withMessage('Campo requerido.') 
        .isNumeric().withMessage('Campo debe ser numerico.'), 
    handleValidation,  
    remove);

router.put('/', [ 
    body('idusuario')
        .notEmpty().withMessage('Campo requerido.') 
        .isNumeric().withMessage('Campo debe ser numerico.') 
    ], handleValidation, put);

export default router;

import express from 'express';
import { body , param } from 'express-validator';
import {search, getById , post , put , deleteById} from '../controllers/clienteController.js'
import { handleValidation } from '../middleware/handleValidation.js';
import { validarToken } from '../middleware/validarToken.js';
import { handleRol } from '../middleware/handleRol.js';


const router = express.Router();

router.get('/', search);

router.get('/:idcliente', 
    param('idcliente')
        .isNumeric().withMessage('Campo debe ser numerico.'), 
    handleValidation,  getById);

router.post('/', validarToken, handleRol('administrador'),
    [ 
    body('nombre')
        .notEmpty().withMessage('Campo requerido.'), 
    body('apellido')
        .notEmpty().withMessage('Campo requerido.'), 
    body('documento')
        .notEmpty().withMessage('Campo requerido.') 
        .isLength({min:8, max:8}).withMessage('Campo debe contener 8 caracteres.'), 
    body('telefono')
        .notEmpty().withMessage('Campo requerido.')
        .isInt().withMessage('Campo debe ser numerico.'), 
    body('email')
        .notEmpty().withMessage('Campo requerido.')
        .isEmail().withMessage("Formato incorrecto."), 
    ], handleValidation, post);

router.delete('/:idcliente', 
    param('idcliente')
        .isEmpty().withMessage('Campo requerido.') 
        .isNumeric().withMessage('Campo debe ser numerico.'), 
    handleValidation,  deleteById);

router.put('/', [ 
    body('idcliente')
        .notEmpty().withMessage('Campo requerido.') 
        .isNumeric().withMessage('Campo debe ser numerico.'), 
    body('nombre')
        .notEmpty().withMessage('Campo requerido.'),
    body('apellido')
        .notEmpty().withMessage('Campo requerido.'), 
    body('documento')
        .notEmpty().withMessage('Campo requerido.') 
        .isLength({min:8, max:8}).withMessage('Campo estrictamente 8 caracteres.'), 
    body('telefono')
        .notEmpty().withMessage('Campo requerido.')
        .isInt().withMessage('Campo debe ser numerico.'), 
    body('email')
        .notEmpty().withMessage('Campo requerido.')
        .isEmail().withMessage("Formato incorrecto."), 
    ], handleValidation, put);

export default router;

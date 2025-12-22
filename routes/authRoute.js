import express from 'express';
import { activate, login , post, recoveryPassword} from '../controllers/authController.js';
import { body, param } from 'express-validator';
import { handleValidation } from '../middleware/handleValidation.js';

const router = express.Router();

router.post('/',
    body('usuario')
        .notEmpty().withMessage('Campo requerido.'), 
    body('password')
        .notEmpty().withMessage('Campo requerido.'),
    handleValidation, 
    login
);

router.post('/add',
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
    body('empresa')
        .notEmpty().withMessage('Campo requerido.'), 
    ], 
    handleValidation, 
    post
);

router.post('/:token', param('token'), activate);

router.post('/', 
    body('email')
        .notEmpty().withMessage('Campo requerido.')
        .isEmail().withMessage("Formato incorrecto."),
recoveryPassword);

// router.post('/', body('email'), changePassword);

export default router;

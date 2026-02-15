import { HttpRouter } from '../infrastructure/http/httpRouter';
import { search, getById, post, remove, put , createUserByAdmin, setPasswordAndActivateUser, updatePassword} from '../controllers/usersController';
import { validarToken } from '../middleware/validarToken';
import { handleRol } from '../middleware/handleRol';
import { handleValidation } from '../middleware/handleValidation';

const router = new HttpRouter();

router.get('/', validarToken, search);

router.get('/:id', validarToken, handleRol('administrador'),handleValidation, getById);

router.post('/', validarToken, handleValidation, post);

router.post('/admin', validarToken, handleRol('administrador'), handleValidation, createUserByAdmin);

router.post('/activate', setPasswordAndActivateUser);

router.put('/recovery', updatePassword); 

router.put('/', validarToken, handleValidation, put);

router.delete('/:id', validarToken, handleValidation, remove);

export default router;

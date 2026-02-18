import { HttpRouter } from '../infrastructure/http/httpRouter';
import { search, getById, post, remove, put} from '../controllers/productsController';
import { validarToken } from '../middleware/validarToken';
import { handleRol } from '../middleware/handleRol';
import { handleValidation } from '../middleware/handleValidation';

const router = new HttpRouter();

router.get('/', validarToken, search);

router.get('/:id', validarToken, handleRol('administrador'),handleValidation, getById);

router.post('/', validarToken, handleValidation, post);

router.put('/:id', validarToken,  handleRol('administrador'), handleValidation, put);

router.delete('/:id', validarToken, handleRol('administrador'), handleValidation, remove);

export default router;

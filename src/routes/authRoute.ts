import { HttpRouter } from '../infrastructure/http/httpRouter';
import { handleValidation } from '../middleware/handleValidation';
import { activate, login , post, recoveryPassword} from '../controllers/authController';

const router = new HttpRouter();

router.post('/',handleValidation,login);

router.post('/add',handleValidation,post);

router.post('/activate/:token', activate);

router.post('/recovery',recoveryPassword);

export default router;
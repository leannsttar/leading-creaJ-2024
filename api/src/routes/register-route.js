import { Router } from 'express';
import { signup } from '../controllers/register-controller.js';
import { auth, perfil } from '../../middleware/auth.js';

const router = Router();

router.post('/signup', signup);
router.get('/', auth, perfil);

export default router;

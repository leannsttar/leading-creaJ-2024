import { Router } from 'express';
import { signup } from '../controllers/register-controller';

const router = Router();

router.post('/signup', signup);

export default router;

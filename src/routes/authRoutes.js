import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.post(
    '/register',
    upload.none(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    validateRequest,
    AuthController.register, 
);

router.post(
    '/login',
    upload.none(),
    body('email').isEmail(),
    body('password').notEmpty(),
    validateRequest,
    AuthController.login
);

export default router;

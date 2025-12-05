import { Router } from 'express';
import { authController } from '../controllers/authController';

export const authRouter = Router();

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
authRouter.get('/logout', authController.logout);
authRouter.get('/refresh', authController.refresh);
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { ordersController } from '../controllers/ordersController';

export const ordersRouter = Router();

ordersRouter.get('/', authMiddleware, ordersController.getOrders);
ordersRouter.get('/users/:userId', authMiddleware, ordersController.getUserOrders);
ordersRouter.post('/:userId', authMiddleware, ordersController.createOrder);
ordersRouter.get('/:orderId', authMiddleware, ordersController.getOrder);
// ordersRouter.get('/:orderId/users/:userId', authMiddleware, ordersController.getUserOrder);
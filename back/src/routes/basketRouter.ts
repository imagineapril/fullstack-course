import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { BasketController } from '../controllers/basketController';

export const basketRouter = Router();

basketRouter.get('/:userId', authMiddleware, BasketController.getBasketByUserId);
basketRouter.post('/:userId/add', authMiddleware, BasketController.addProductByUserId);
basketRouter.patch('/:userId/product', authMiddleware, BasketController.changeProductAmountByUserId);
basketRouter.delete('/:userId/product/:productId', authMiddleware, BasketController.deleteProductByUserId);
import { Router } from 'express';
import { CategoriesController } from '../controllers/categoriesController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

export const categoriesRouter = Router();

categoriesRouter.get('/', authMiddleware, CategoriesController.getCategories);
categoriesRouter.post('/', authMiddleware, roleMiddleware, CategoriesController.createCategory);
categoriesRouter.get('/:id', authMiddleware, CategoriesController.getCategoryById);
categoriesRouter.patch('/:id', authMiddleware, roleMiddleware, CategoriesController.patchCategoryById);
categoriesRouter.delete('/:id', authMiddleware, roleMiddleware,CategoriesController.deleteCategoryById);
categoriesRouter.get('/:id/products', authMiddleware, CategoriesController.getProductsByCategoryId);
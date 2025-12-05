"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const express_1 = require("express");
const categoriesController_1 = require("../controllers/categoriesController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
exports.categoriesRouter = (0, express_1.Router)();
exports.categoriesRouter.get('/', authMiddleware_1.authMiddleware, categoriesController_1.CategoriesController.getCategories);
exports.categoriesRouter.post('/', authMiddleware_1.authMiddleware, roleMiddleware_1.roleMiddleware, categoriesController_1.CategoriesController.createCategory);
exports.categoriesRouter.get('/:id', authMiddleware_1.authMiddleware, categoriesController_1.CategoriesController.getCategoryById);
exports.categoriesRouter.patch('/:id', authMiddleware_1.authMiddleware, roleMiddleware_1.roleMiddleware, categoriesController_1.CategoriesController.patchCategoryById);
exports.categoriesRouter.delete('/:id', authMiddleware_1.authMiddleware, roleMiddleware_1.roleMiddleware, categoriesController_1.CategoriesController.deleteCategoryById);
exports.categoriesRouter.get('/:id/products', authMiddleware_1.authMiddleware, categoriesController_1.CategoriesController.getProductsByCategoryId);
//# sourceMappingURL=categoriesRouter.js.map
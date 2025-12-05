"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basketRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const basketController_1 = require("../controllers/basketController");
exports.basketRouter = (0, express_1.Router)();
exports.basketRouter.get('/:userId', authMiddleware_1.authMiddleware, basketController_1.BasketController.getBasketByUserId);
exports.basketRouter.post('/:userId/add', authMiddleware_1.authMiddleware, basketController_1.BasketController.addProductByUserId);
exports.basketRouter.patch('/:userId/product', authMiddleware_1.authMiddleware, basketController_1.BasketController.changeProductAmountByUserId);
exports.basketRouter.delete('/:userId/product/:productId', authMiddleware_1.authMiddleware, basketController_1.BasketController.deleteProductByUserId);
//# sourceMappingURL=basketRouter.js.map
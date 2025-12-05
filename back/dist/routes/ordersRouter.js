"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const ordersController_1 = require("../controllers/ordersController");
exports.ordersRouter = (0, express_1.Router)();
exports.ordersRouter.get('/', authMiddleware_1.authMiddleware, ordersController_1.ordersController.getOrders);
exports.ordersRouter.get('/users/:userId', authMiddleware_1.authMiddleware, ordersController_1.ordersController.getUserOrders);
exports.ordersRouter.post('/:userId', authMiddleware_1.authMiddleware, ordersController_1.ordersController.createOrder);
exports.ordersRouter.get('/:orderId', authMiddleware_1.authMiddleware, ordersController_1.ordersController.getOrder);
// ordersRouter.get('/:orderId/users/:userId', authMiddleware, ordersController.getUserOrder);
//# sourceMappingURL=ordersRouter.js.map
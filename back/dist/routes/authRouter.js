"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/registration', authController_1.authController.registration);
exports.authRouter.post('/login', authController_1.authController.login);
exports.authRouter.get('/logout', authController_1.authController.logout);
exports.authRouter.get('/refresh', authController_1.authController.refresh);
//# sourceMappingURL=authRouter.js.map
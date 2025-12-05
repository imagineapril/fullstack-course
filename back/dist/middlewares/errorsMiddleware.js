"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsMiddleware = void 0;
const errors_1 = require("../errors");
const errorsMiddleware = (error, request, response, next) => {
    errors_1.ErrorHandler.errorProcessing(error, response);
};
exports.errorsMiddleware = errorsMiddleware;
//# sourceMappingURL=errorsMiddleware.js.map
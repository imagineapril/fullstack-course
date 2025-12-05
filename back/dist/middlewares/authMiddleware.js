"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const getAccessTokenFromRequest_1 = require("../utils/getAccessTokenFromRequest");
const errors_1 = require("../errors");
const tokenService_1 = require("../service/tokenService");
const authMiddleware = (request, response, next) => {
    try {
        const accessToken = (0, getAccessTokenFromRequest_1.getAccessTokenFromrequest)(request);
        if (!accessToken) {
            throw new errors_1.AuthorizationError();
        }
        tokenService_1.TokenService.validateAccessToken(accessToken);
        next();
    }
    catch (error) {
        errors_1.ErrorHandler.errorProcessing(error, response);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map
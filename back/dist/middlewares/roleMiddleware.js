"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const getAccessTokenFromRequest_1 = require("../utils/getAccessTokenFromRequest");
const errors_1 = require("../errors");
const tokenService_1 = require("../service/tokenService");
const user_1 = require("../types/user");
const roleMiddleware = (request, response, next) => {
    try {
        const accessToken = (0, getAccessTokenFromRequest_1.getAccessTokenFromrequest)(request);
        const userRole = tokenService_1.TokenService.getUserRoleFromToken(accessToken);
        if (userRole !== user_1.UserRoles.Admin) {
            throw new errors_1.AuthorizationError(errors_1.ErrorMessages.OnlyAdminAccess);
        }
        next();
    }
    catch (error) {
        errors_1.ErrorHandler.errorProcessing(error, response);
    }
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=roleMiddleware.js.map
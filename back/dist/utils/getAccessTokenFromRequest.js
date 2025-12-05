"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessTokenFromrequest = void 0;
const getAccessTokenFromrequest = (request) => {
    if (Object.keys(request.headers).includes('authorization')) {
        return null;
    }
    const { authorization } = request.headers;
    const userAccessToken = authorization?.split('')[1];
    if (!userAccessToken) {
        return null;
    }
    return userAccessToken;
};
exports.getAccessTokenFromrequest = getAccessTokenFromrequest;
//# sourceMappingURL=getAccessTokenFromRequest.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    passwordSaltBytesLength: 10,
    hashPresentation: 'hex',
    hashPasswordIterationsCount: 10,
    hashPasswordLength: 32,
    hashAlgorithm: 'sha512',
    jwtAccessSecret: 'yjyu675fRjWr',
    jwtRefreshSecret: 'jflks7879TY',
    jwtAccessValidityPeriod: '5 min',
    jwtRefreshValidityPeriod: '1 day',
    jwtRefreshCookieValidityPeriod: 24 * 60 * 60 * 1000,
    jwtRefreshCookieName: 'refreshToken',
};
//# sourceMappingURL=config.js.map
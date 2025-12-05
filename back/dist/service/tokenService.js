"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const config_1 = require("../config");
const db_1 = require("../db");
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    static generateTokens(payload) {
        const {} = config_1.config;
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.jwtAccessSecret, { expiresIn: config_1.config.jwtAccessValidityPeriod });
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.config.jwtRefreshSecret, { expiresIn: config_1.config.jwtRefreshValidityPeriod });
        return {
            accessToken,
            refreshToken,
        };
    }
    static async removeRefreshToken(token) {
        try {
            await (0, db_1.dbQuery)('delete from refresh_tokens where refresh_token=$1', [token]);
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.CannotRemoveRefreshToken);
        }
    }
    static async saveRefreshToken(token, userId) {
        try {
            await (0, db_1.dbQuery)('insert into refresh_tokens(refresh_token, user_id) values($1, $2)', [token, userId]);
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.CannotSaveRefreshToken);
        }
    }
    static validateRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, config_1.config.jwtRefreshSecret);
        }
        catch (error) {
            console.error(error);
            throw new errors_1.AuthorizationError(errors_1.ErrorMessages.SessionExpired);
        }
    }
    static validateAccessToken(token) {
        try {
            jsonwebtoken_1.default.verify(token, config_1.config.jwtAccessSecret);
        }
        catch (error) {
            console.error(error);
            throw new errors_1.AuthorizationError(errors_1.ErrorMessages.InvalidAccessToken);
        }
    }
    static async findRefreshToken(token) {
        try {
            const { rows } = await (0, db_1.dbQuery)('select refresh_token from refresh_tokens where refresh_token=$1', [token]);
            return rows[0]?.refresh_token ?? null;
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.DBFindRefreshTokenError);
        }
    }
    static getUserRoleFromToken(token) {
        const userData = jsonwebtoken_1.default.verify(token, config_1.config.jwtAccessSecret);
        return userData.role;
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=tokenService.js.map
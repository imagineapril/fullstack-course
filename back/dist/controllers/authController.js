"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const errors_1 = require("../errors");
const userService_1 = require("../service/userService");
const User_1 = require("../model/User");
const getAccessTokenFromRequest_1 = require("../utils/getAccessTokenFromRequest");
const tokenService_1 = require("../service/tokenService");
const config_1 = require("../config");
const messages_1 = require("../locales/messages");
class authController {
    static async registration(request, response) {
        const { email, password } = request.body;
        const errors = {};
        if (!email) {
            errors.email = errors_1.ErrorMessages.EmptyEmail;
        }
        if (!password) {
            errors.password = errors_1.ErrorMessages.EmptyPassword;
        }
        if (!email || !password) {
            throw new errors_1.ValidationError(errors);
        }
        if (password.length < 6) {
            errors.password = errors_1.ErrorMessages.PasswordLess6;
        }
        const emailRegex = new RegExp(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/);
        if (!emailRegex.test(email)) {
            errors.email = errors_1.ErrorMessages.IncorrectEmail;
        }
        if (Object.keys(errors).length) {
            throw new errors_1.ValidationError(errors);
        }
        await userService_1.UserService.checkIsUserCreated(email);
        const salt = userService_1.UserService.generateSalt();
        const hashPassword = userService_1.UserService.hashPassword(password, salt);
        const newUser = new User_1.User({ email, password: hashPassword, public_key: salt });
        const newUserId = await userService_1.UserService.saveUser(newUser);
        response.status(errors_1.HttpCodes.Created).send({ id: newUserId });
    }
    ;
    static async login(request, response) {
        const { email, password } = request.body;
        const userAccessToken = (0, getAccessTokenFromRequest_1.getAccessTokenFromrequest)(request);
        if (userAccessToken) {
            throw new errors_1.AlreadyAuthorizedError();
        }
        const errors = {};
        if (!email) {
            errors.email = errors_1.ErrorMessages.EmptyEmail;
        }
        if (!password) {
            errors.password = errors_1.ErrorMessages.EmptyPassword;
        }
        if (!email || !password) {
            throw new errors_1.ValidationError(errors);
        }
        const emailRegex = new RegExp(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/);
        if (!emailRegex.test(email)) {
            errors.email = errors_1.ErrorMessages.IncorrectEmail;
        }
        if (Object.keys(errors).length) {
            throw new errors_1.ValidationError(errors);
        }
        const createdUser = await userService_1.UserService.findUserByEmail(email);
        if (!createdUser) {
            errors.email = errors_1.ErrorMessages.UserNotCreated;
            throw new errors_1.ValidationError(errors);
        }
        if (!userService_1.UserService.checkPasswordsEqual(createdUser.password, password, createdUser.public_key)) {
            throw new errors_1.AuthorizationError(errors_1.ErrorMessages.InvalidPassword);
        }
        const { accessToken, refreshToken } = tokenService_1.TokenService.generateTokens({ email, userId: createdUser.id, role: createdUser.role });
        await tokenService_1.TokenService.removeRefreshToken(refreshToken);
        await tokenService_1.TokenService.saveRefreshToken(refreshToken, createdUser.id);
        response.cookie(config_1.config.jwtRefreshCookieName, refreshToken, {
            maxAge: config_1.config.jwtRefreshCookieValidityPeriod,
            path: '/',
            domain: 'localhost',
            sameSite: 'lax',
        });
        response.status(200).send({ token: accessToken });
    }
    ;
    static async logout(request, response) {
        const { refreshToken } = request.cookies;
        await tokenService_1.TokenService.removeRefreshToken(refreshToken);
        response.clearCookie(config_1.config.jwtRefreshCookieName);
        response.status(200).send({ message: messages_1.Messages.SuccessLogout });
    }
    ;
    static async refresh(request, response) {
        const { refreshToken } = request.cookies;
        if (!refreshToken) {
            throw new errors_1.AuthorizationError(errors_1.ErrorMessages.HaveNoRefreshToken);
        }
        const tokenPayload = tokenService_1.TokenService.validateRefreshToken(refreshToken);
        const currentUser = await userService_1.UserService.findUserByEmail(tokenPayload.email);
        const refreshTokenFromBD = await tokenService_1.TokenService.findRefreshToken(refreshToken);
        if (!currentUser || !refreshTokenFromBD) {
            throw new errors_1.AuthorizationError(errors_1.ErrorMessages.SessionExpired);
        }
        const newTokens = tokenService_1.TokenService.generateTokens({
            email: tokenPayload.email,
            userId: tokenPayload.id,
            role: tokenPayload.role,
        });
        await tokenService_1.TokenService.removeRefreshToken(refreshToken);
        await tokenService_1.TokenService.saveRefreshToken(newTokens.refreshToken, currentUser.id);
        response.cookie(config_1.config.jwtRefreshCookieName, refreshToken, {
            maxAge: config_1.config.jwtRefreshCookieValidityPeriod,
            path: '/',
            domain: 'localhost',
            sameSite: 'lax',
        });
        response.status(200).send({ token: newTokens.accessToken });
    }
    ;
}
exports.authController = authController;
//# sourceMappingURL=authController.js.map
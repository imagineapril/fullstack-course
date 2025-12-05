"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const config_1 = require("../config");
const errors_1 = require("../errors");
const db_1 = require("../db");
const User_1 = require("../model/User");
const BasketService_1 = require("./BasketService");
class UserService {
    static generateSalt() {
        const { passwordSaltBytesLength, hashPresentation } = config_1.config;
        return node_crypto_1.default.randomBytes(passwordSaltBytesLength).toString(hashPresentation);
    }
    static hashPassword(password, salt) {
        const { hashPasswordIterationsCount, hashPasswordLength, hashAlgorithm, hashPresentation } = config_1.config;
        return node_crypto_1.default.pbkdf2Sync(password, salt, hashPasswordIterationsCount, hashPasswordLength, hashAlgorithm).toString(hashPresentation);
    }
    static async saveUser(newUser) {
        const { email, password, public_key, role } = newUser;
        try {
            await (0, db_1.dbQuery)('BEGIN');
            const dbResponse = await (0, db_1.dbQuery)('insert into users(email, password, public_key, role) values($1, $2, $3, $4) returning id', [email, password, public_key, role]);
            const userId = dbResponse.rows[0].id;
            await BasketService_1.BasketService.createBasketForUserId(userId);
            await (0, db_1.dbQuery)('COMMIT');
            return dbResponse.rows[0].id;
        }
        catch (error) {
            console.log("Error from UserService:createUser. Error: ", error);
            await (0, db_1.dbQuery)('ROLLBACK');
            throw new errors_1.DBError(errors_1.ErrorMessages.CreateUserError);
        }
    }
    static async checkIsUserCreated(email) {
        const { count } = await (0, db_1.dbQuery)("select * from users where email=$1", [email]);
        if (count > 0) {
            throw new errors_1.AlreadRegisteredError();
        }
    }
    static async findUserByEmail(email) {
        try {
            const dbResponse = await (0, db_1.dbQuery)('select * from users where email=$1', [email]);
            if (dbResponse.count) {
                return new User_1.User(dbResponse.rows[0]);
            }
            return null;
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError();
        }
    }
    static checkPasswordsEqual(userDbPassword, candidatePassword, salt) {
        return this.hashPassword(candidatePassword, salt) === userDbPassword;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const user_1 = require("../types/user");
class User {
    email;
    password;
    id;
    public_key;
    role;
    constructor(params) {
        this.email = params.email;
        this.password = params.password;
        this.public_key = params.public_key;
        this.role = params.role ?? user_1.UserRoles.User;
        this.id = params?.id ?? null;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map
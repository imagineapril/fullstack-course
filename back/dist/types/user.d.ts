import type * as core from 'express-serve-static-core';
export interface IUserErrors {
    email?: string;
    password?: string;
    role?: string;
    registered?: string;
}
export interface IUser {
    email: string;
    password: string;
    id?: number | null;
    public_key: string;
    role?: UserRoles;
}
export declare enum UserRoles {
    Admin = "admin",
    User = "user"
}
export interface IUserIdParam extends core.ParamsDictionary {
    userId: string;
}
//# sourceMappingURL=user.d.ts.map
import { IUser, UserRoles } from "../types/user";
export declare class User implements IUser {
    email: string;
    password: string;
    id: number | null;
    public_key: string;
    role?: UserRoles;
    constructor(params: IUser);
}
//# sourceMappingURL=User.d.ts.map
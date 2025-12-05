import { IUser } from '../types/user';
export declare class UserService {
    static generateSalt(): string;
    static hashPassword(password: string, salt: string): string;
    static saveUser(newUser: IUser): Promise<number>;
    static checkIsUserCreated(email: string): Promise<void>;
    static findUserByEmail(email: string): Promise<IUser | null>;
    static checkPasswordsEqual(userDbPassword: string, candidatePassword: string, salt: string): boolean;
}
//# sourceMappingURL=userService.d.ts.map
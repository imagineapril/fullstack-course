import { ITokenPayload, ITokens } from "../types/token";
import { type JwtPayload } from 'jsonwebtoken';
export declare class TokenService {
    static generateTokens(payload: ITokenPayload): ITokens;
    static removeRefreshToken(token: string): Promise<void>;
    static saveRefreshToken(token: string, userId: number): Promise<void>;
    static validateRefreshToken(token: string): string | JwtPayload | null;
    static validateAccessToken(token: string): void;
    static findRefreshToken(token: string): Promise<string | null>;
    static getUserRoleFromToken(token: string): string;
}
//# sourceMappingURL=tokenService.d.ts.map
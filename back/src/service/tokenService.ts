import { config } from "../config";
import { dbQuery } from "../db";
import { AuthorizationError, DBError, ErrorMessages } from "../errors";
import { IRefreshToken, ITokenPayload, ITokens } from "../types/token";
import jwt, { type JwtPayload} from 'jsonwebtoken';

export class TokenService {
  static generateTokens(payload: ITokenPayload): ITokens {
    const {} = config;
    const accessToken = jwt.sign(payload, config.jwtAccessSecret, {expiresIn: config.jwtAccessValidityPeriod});
    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, {expiresIn: config.jwtRefreshValidityPeriod});

    return {
      accessToken,
      refreshToken,
    }
  }

  static async removeRefreshToken(token: string): Promise<void> {
    try {
      await dbQuery('delete from refresh_tokens where refresh_token=$1', [token]);
    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.CannotRemoveRefreshToken)
    }
  }

  static async saveRefreshToken(token: string, userId: number): Promise<void> {
    try {
      await dbQuery('insert into refresh_tokens(refresh_token, user_id) values($1, $2)', [token, userId])
    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.CannotSaveRefreshToken)
    }
  }

  static validateRefreshToken(token: string): string | JwtPayload | null {
    try {
      return jwt.verify(token, config.jwtRefreshSecret);
    } catch(error) {
      console.error(error);
      throw new AuthorizationError(ErrorMessages.SessionExpired)

    }
  }

  static validateAccessToken(token: string): void {
    try {
      jwt.verify(token, config.jwtAccessSecret)

    } catch(error) {
      console.error(error);
      throw new AuthorizationError(ErrorMessages.InvalidAccessToken);
    }
  }

  static async findRefreshToken(token: string): Promise<string | null> {
    try {
      const { rows } = await dbQuery<IRefreshToken>('select refresh_token from refresh_tokens where refresh_token=$1', [token]);
      return rows[0]?.refresh_token ?? null;
    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.DBFindRefreshTokenError);

    }
  }

  static getUserRoleFromToken(token: string): string {
    const userData = jwt.verify(token, config.jwtAccessSecret) as JwtPayload;
    return userData.role;
  }
}
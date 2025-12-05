import { UserRoles } from "./user";

export interface ITokenPayload {
  userId: number,
  email: string,
  role: UserRoles,
}

export interface ITokens {
  accessToken: string,
  refreshToken: string,
}

export interface IRefreshToken {
  id: number,
  refresh_token: string,
}
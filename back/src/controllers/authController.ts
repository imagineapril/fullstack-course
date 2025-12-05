import { type Request, Response } from "express";
import { CustomRequets } from "../types/common";
import { CreateUserPayload } from "./create-user";
import { IUser, IUserErrors } from "../types/user";
import { AlreadyAuthorizedError, AuthorizationError, ErrorMessages, HttpCodes, ValidationError } from "../errors";
import { UserService } from "../service/userService";
import { User } from "../model/User";
import { LoginUserPayload } from "./loginController";
import { getAccessTokenFromrequest } from "../utils/getAccessTokenFromRequest";
import { TokenService } from "../service/tokenService";
import { config } from "../config";
import { Messages } from "../locales/messages";
import { JwtPayload } from "jsonwebtoken";

export class authController {
  static async registration(request: CustomRequets<CreateUserPayload>, response: Response<Pick<IUser, 'id'>>) {
    const { email, password } = request.body;

    const errors: IUserErrors = {};

    if (!email) {
      errors.email = ErrorMessages.EmptyEmail;
    }

    if (!password) {
      errors.password = ErrorMessages.EmptyPassword;
    }

    if (!email || !password) {
      throw new ValidationError(errors);
    }

    if (password.length < 6 ) {
      errors.password = ErrorMessages.PasswordLess6;
    }

    const emailRegex = new RegExp(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/);
    if (!emailRegex.test(email)) {
      errors.email = ErrorMessages.IncorrectEmail;
    }

    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    await UserService.checkIsUserCreated(email);

    const salt = UserService.generateSalt();
    const hashPassword = UserService.hashPassword(password, salt);
    const newUser = new User({ email, password: hashPassword, public_key: salt });

    const newUserId = await UserService.saveUser(newUser);
    response.status(HttpCodes.Created).send({ id: newUserId });
  };

  static async login(request: CustomRequets<LoginUserPayload>, response: Response) {
    const { email, password } = request.body;
    const userAccessToken = getAccessTokenFromrequest(request);
    if(userAccessToken) {
      throw new AlreadyAuthorizedError();
    }

    const errors: IUserErrors = {};

    if (!email) {
      errors.email = ErrorMessages.EmptyEmail;
    }

    if (!password) {
      errors.password = ErrorMessages.EmptyPassword;
    }

    if (!email || !password) {
      throw new ValidationError(errors);
    }

    const emailRegex = new RegExp(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/);
    if (!emailRegex.test(email)) {
      errors.email = ErrorMessages.IncorrectEmail;
    }

    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    const createdUser = await UserService.findUserByEmail(email);

    if(!createdUser) {
      errors.email = ErrorMessages.UserNotCreated;
      throw new ValidationError(errors);
    }

    if(!UserService.checkPasswordsEqual(createdUser.password, password, createdUser.public_key)) {
      throw new AuthorizationError(ErrorMessages.InvalidPassword)
    }

    const { accessToken, refreshToken } = TokenService.generateTokens({ email, userId: createdUser.id!, role: createdUser.role!});

    await TokenService.removeRefreshToken(refreshToken);
    await TokenService.saveRefreshToken(refreshToken, createdUser.id!);

    response.cookie(config.jwtRefreshCookieName, refreshToken, {
      maxAge: config.jwtRefreshCookieValidityPeriod,
      path: '/',
      domain: 'localhost',
      sameSite: 'lax',
    })
    response.status(200).send({ token: accessToken });
  };

  static async logout(request: Request, response: Response) {
    const { refreshToken } = request.cookies;
    await TokenService.removeRefreshToken(refreshToken);
    response.clearCookie(config.jwtRefreshCookieName);
    response.status(200).send({ message: Messages.SuccessLogout});
  };

  static async refresh(request: Request, response: Response) {
    const { refreshToken } = request.cookies;

    if(!refreshToken) {
      throw new AuthorizationError(ErrorMessages.HaveNoRefreshToken);
    }

    const tokenPayload = TokenService.validateRefreshToken(refreshToken) as JwtPayload;
     const currentUser = await UserService.findUserByEmail(tokenPayload.email);
     const refreshTokenFromBD = await TokenService.findRefreshToken(refreshToken);

     if(!currentUser || !refreshTokenFromBD) {
      throw new AuthorizationError(ErrorMessages.SessionExpired);
     }

     const newTokens = TokenService.generateTokens({
      email: tokenPayload.email,
      userId: tokenPayload.id!,
      role: tokenPayload.role!,
     })

     await TokenService.removeRefreshToken(refreshToken);
     await TokenService.saveRefreshToken(newTokens.refreshToken, currentUser.id!);

    response.cookie(config.jwtRefreshCookieName, refreshToken, {
      maxAge: config.jwtRefreshCookieValidityPeriod,
      path: '/',
      domain: 'localhost',
      sameSite: 'lax',
    })

    response.status(200).send({ token: newTokens.accessToken});
  };
}
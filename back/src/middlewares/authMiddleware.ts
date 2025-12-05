import { request, type NextFunction, type Request, type Response } from "express";
import { getAccessTokenFromrequest } from "../utils/getAccessTokenFromRequest";
import { ApplicationErrors, AuthorizationError, ErrorHandler } from "../errors";
import { TokenService } from "../service/tokenService";

export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  try {
    const accessToken = getAccessTokenFromrequest(request);
    if (!accessToken) {
      throw new AuthorizationError();
    }

    TokenService.validateAccessToken(accessToken);
    next();

  } catch(error) {
    ErrorHandler.errorProcessing(error as ApplicationErrors, response);
  }
}
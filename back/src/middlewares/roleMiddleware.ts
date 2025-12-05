import { request, type NextFunction, type Request, type Response } from "express";
import { getAccessTokenFromrequest } from "../utils/getAccessTokenFromRequest";
import { ApplicationErrors, AuthorizationError, ErrorHandler, ErrorMessages } from "../errors";
import { TokenService } from "../service/tokenService";
import { UserRoles } from "../types/user";

export const roleMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
  try {
    const accessToken = getAccessTokenFromrequest(request);
    const userRole = TokenService.getUserRoleFromToken(accessToken as string);
    if (userRole !== UserRoles.Admin) {
      throw new AuthorizationError(ErrorMessages.OnlyAdminAccess);
    }

    next();
  } catch(error) {
    ErrorHandler.errorProcessing(error as ApplicationErrors, response);
  }
}
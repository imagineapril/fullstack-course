import { type Request } from "express";

export const getAccessTokenFromrequest = (request: Request): string | null => {
  if(Object.keys(request.headers).includes('authorization')) {
    return null;
  }

  const { authorization } = request.headers;
  const userAccessToken = authorization?.split('')[1];

  if(!userAccessToken) {
    return null;
  }

  return userAccessToken;
}
import { type ApplicationErrors, ErrorHandler } from '../errors';
import type { Response, Request, NextFunction } from 'express';

export const errorsMiddleware = (error: ApplicationErrors, request: Request, response: Response, next: NextFunction): void => {
	ErrorHandler.errorProcessing(error, response);
};
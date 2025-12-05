import { type Request } from "express";

export interface CustomRequets<T> extends Request {
  body: T;
}
import type { Request, Response } from "express";
import { IOrderIdParam, IUserIdParam } from "../types/order";
import { IOrderCreateRequest } from "./create-order";
export declare class ordersController {
    static getOrders(request: Request, response: Response): Promise<void>;
    static createOrder(request: Request<IUserIdParam, IOrderCreateRequest>, response: Response): Promise<void>;
    static getOrder(request: Request<IOrderIdParam>, response: Response): Promise<void>;
    static getUserOrders(request: Request<IUserIdParam>, response: Response): Promise<void>;
}
//# sourceMappingURL=ordersController.d.ts.map
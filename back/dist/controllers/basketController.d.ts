import type { Request, Response } from "express";
import { IUserIdParam } from "../types/user";
import { IBasketAddProductRequest } from "./create-product-in-basket";
import { IBasketDeleteProductParams } from "../types/basket";
export declare class BasketController {
    static getBasketByUserId(request: Request<IUserIdParam>, response: Response): Promise<void>;
    static addProductByUserId(request: Request<IUserIdParam, IBasketAddProductRequest>, response: Response): Promise<void>;
    static deleteProductByUserId(request: Request<IBasketDeleteProductParams>, response: Response): Promise<void>;
    static changeProductAmountByUserId(request: Request<IUserIdParam, Pick<IBasketAddProductRequest, "amount" | "productId">>, response: Response): Promise<void>;
}
//# sourceMappingURL=basketController.d.ts.map
import { IProduct } from "../types/product";
export declare class BasketService {
    static createBasketForUserId(userId: number): Promise<void>;
    static findbasketIdByUserId(userId: string): Promise<number>;
    static getProductsByBasketId(basketId: number): Promise<IProduct[]>;
    static addProductToBasket(basketId: number, productId: number, amount: number): Promise<void>;
    static deleteProductFromBasket(basketId: number, productId: string): Promise<void>;
    static changeProductAmount(basketId: number, productId: number, amount: number): Promise<void>;
}
//# sourceMappingURL=BasketService.d.ts.map
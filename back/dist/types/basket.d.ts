import type * as core from 'express-serve-static-core';
export interface IBasket {
    id: number;
    userId: number;
}
export interface IBasketErrors {
    emptyProductId?: string;
    emptyAmount?: string;
}
export interface IBasketDeleteProductParams extends core.ParamsDictionary {
    userId: string;
    productId: string;
}
//# sourceMappingURL=basket.d.ts.map
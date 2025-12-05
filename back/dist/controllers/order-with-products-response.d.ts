import { IProduct } from "../types/product";
export interface IOrderWithProducts {
    id: number;
    address: string;
    created: string;
    user_id: number;
    products: IProduct[];
}
//# sourceMappingURL=order-with-products-response.d.ts.map
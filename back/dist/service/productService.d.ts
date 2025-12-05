import { CreateProductPayload } from "../controllers/create-product";
import { IProduct, IProductCreatedResponse } from "../types/product";
export declare class ProductService {
    static getAllProducts(): Promise<IProduct[]>;
    static createProduct(params: CreateProductPayload): Promise<IProductCreatedResponse>;
}
//# sourceMappingURL=productService.d.ts.map
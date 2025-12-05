import { CreateCategoryPayload } from "../controllers/create-category";
import { ICategory, ICategoryCreateResponse, ICategoryCreateRequest } from "../types/category";
export declare class CategoryService {
    static getAllCategories(): Promise<ICategory[]>;
    static createCategory(params: CreateCategoryPayload): Promise<ICategoryCreateResponse>;
    static findCategoryById(id: number): Promise<ICategory>;
    static patchCategory(id: number, params: Partial<ICategoryCreateRequest>): Promise<ICategory>;
    static deleteCategory(id: number): Promise<void>;
    static getProductsByCategoryId(categoryId: number): Promise<any[]>;
}
//# sourceMappingURL=categoryService.d.ts.map
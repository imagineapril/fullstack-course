import type { Response, Request } from "express";
import { CustomRequets } from "../types/common";
import { ICategory, ICategoryCreateRequest, ICategoryCreateResponse, ICategoryIdParam } from "../types/category";
import { CreateCategoryPayload } from "./create-category";
export declare class CategoriesController {
    static getCategories(request: Request, response: Response<ICategory[]>): Promise<void>;
    static createCategory(request: CustomRequets<CreateCategoryPayload>, response: Response<ICategoryCreateResponse>): Promise<void>;
    static getCategoryById(req: Request<ICategoryIdParam>, res: Response): Promise<Response<ICategory>>;
    static patchCategoryById(request: Request<ICategoryIdParam, object, Partial<ICategoryCreateRequest>>, response: Response): Promise<Response<void>>;
    static deleteCategoryById(request: Request<ICategoryIdParam, object, Partial<ICategoryCreateRequest>>, response: Response): Promise<Response<void>>;
    static getProductsByCategoryId(request: Request<ICategoryIdParam>, response: Response): Promise<void>;
}
//# sourceMappingURL=categoriesController.d.ts.map
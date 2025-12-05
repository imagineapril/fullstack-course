import type { Response, Request } from "express";
import { CustomRequets } from "../types/common";
import { CategoryService } from "../service/categoryService";
import { ICategory, ICategoryCreateRequest, ICategoryCreateResponse, ICategoryErrors, ICategoryIdParam } from "../types/category";
import { CreateCategoryPayload } from "./create-category";
import { ErrorMessages, ValidationError } from "../errors";


export class CategoriesController {
  static async getCategories(request: Request, response: Response<ICategory[]>) {
    const categories = await CategoryService.getAllCategories();
    response.status(200).send(categories);
  };
  static async createCategory(request: CustomRequets<CreateCategoryPayload>, response: Response<ICategoryCreateResponse>) {
    const { title, description } = request.body;
    const errors: ICategoryErrors = {};

    if(!title) {
      errors.title = ErrorMessages.EmptyCategoryTitle;
    }

    if(!description) {
      errors.title = ErrorMessages.EmptyCategoryDescription;
    }

    if(Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    const newCategoryId = await CategoryService.createCategory({ title, description})
    response.status(201).send(newCategoryId);
  };

  static async getCategoryById(req: Request<ICategoryIdParam>, res: Response): Promise<Response<ICategory>> {
		const { id } = req.params;

		const category = await CategoryService.findCategoryById(id);

		return res.status(200).send(category);
	};

  static async patchCategoryById(request: Request<ICategoryIdParam, object, Partial<ICategoryCreateRequest>>, response: Response): Promise<Response<void>> {
    const { id } = request.params;
    const { title, description } = request.body;
    const errors: ICategoryErrors = {};

    const updateData: Partial<ICategoryCreateRequest> = {};

    if (title !== undefined) {
      updateData.title = title;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (Object.keys(updateData).length === 0) {
      errors.title = ErrorMessages.EmptyPatchData;
      return response.status(400).send();
    }

    await CategoryService.patchCategory(id, updateData);

    return response.status(204).end();
  };

  static async deleteCategoryById(request: Request<ICategoryIdParam, object, Partial<ICategoryCreateRequest>>, response: Response): Promise<Response<void>> {
    const { id } = request.params;
		await CategoryService.deleteCategory(id);
		return response.status(204).end();
  };

  static async getProductsByCategoryId(request: Request<ICategoryIdParam>, response: Response) {
    const { id } = request.params;
    if (!id) {
      const errors: ICategoryErrors = {};
      errors.title = ErrorMessages.NoCategoryId;
      throw new ValidationError(errors);
    }

    const products = await CategoryService.getProductsByCategoryId(id);
    response.status(200).send(products);
  };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const categoryService_1 = require("../service/categoryService");
const errors_1 = require("../errors");
class CategoriesController {
    static async getCategories(request, response) {
        const categories = await categoryService_1.CategoryService.getAllCategories();
        response.status(200).send(categories);
    }
    ;
    static async createCategory(request, response) {
        const { title, description } = request.body;
        const errors = {};
        if (!title) {
            errors.title = errors_1.ErrorMessages.EmptyCategoryTitle;
        }
        if (!description) {
            errors.title = errors_1.ErrorMessages.EmptyCategoryDescription;
        }
        if (Object.keys(errors).length) {
            throw new errors_1.ValidationError(errors);
        }
        const newCategoryId = await categoryService_1.CategoryService.createCategory({ title, description });
        response.status(201).send(newCategoryId);
    }
    ;
    static async getCategoryById(req, res) {
        const { id } = req.params;
        const category = await categoryService_1.CategoryService.findCategoryById(id);
        return res.status(200).send(category);
    }
    ;
    static async patchCategoryById(request, response) {
        const { id } = request.params;
        const { title, description } = request.body;
        const errors = {};
        const updateData = {};
        if (title !== undefined) {
            updateData.title = title;
        }
        if (description !== undefined) {
            updateData.description = description;
        }
        if (Object.keys(updateData).length === 0) {
            errors.title = errors_1.ErrorMessages.EmptyPatchData;
            return response.status(400).send();
        }
        await categoryService_1.CategoryService.patchCategory(id, updateData);
        return response.status(204).end();
    }
    ;
    static async deleteCategoryById(request, response) {
        const { id } = request.params;
        await categoryService_1.CategoryService.deleteCategory(id);
        return response.status(204).end();
    }
    ;
    static async getProductsByCategoryId(request, response) {
        const { id } = request.params;
        if (!id) {
            const errors = {};
            errors.title = errors_1.ErrorMessages.NoCategoryId;
            throw new errors_1.ValidationError(errors);
        }
        const products = await categoryService_1.CategoryService.getProductsByCategoryId(id);
        response.status(200).send(products);
    }
    ;
}
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categoriesController.js.map
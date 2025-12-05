"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const db_1 = require("../db");
const errors_1 = require("../errors");
class CategoryService {
    static async getAllCategories() {
        try {
            const dbResponse = await (0, db_1.dbQuery)('select * from categories');
            return dbResponse.rows;
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.DBGetCategoriesError);
        }
    }
    static async createCategory(params) {
        const isExistedCategory = await (0, db_1.dbQuery)('select * from categories where title = $1 or description = $2', [params.title, params.description]);
        if (isExistedCategory.count) {
            const errors = { alredayCreated: errors_1.ErrorMessages.AlreadyCreatedCategory };
            throw new errors_1.ValidationError(errors);
        }
        const { rows } = await (0, db_1.dbQuery)('insert into categories(title, description) values($1, $2) returning id', [params.title, params.description]);
        return rows[0];
    }
    static async findCategoryById(id) {
        const dbResponse = await (0, db_1.dbQuery)('select * from categories where id = $1', [id]);
        if (dbResponse.count === 0 || !dbResponse.rows[0]) {
            const errors = { noExistedCategory: errors_1.ErrorMessages.NotExistedCategory };
            throw new errors_1.ValidationError(errors);
        }
        return dbResponse.rows[0];
    }
    static async patchCategory(id, params) {
        await this.findCategoryById(id);
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;
        if (params.title !== undefined) {
            updateFields.push(`title = $${paramIndex}`);
            updateValues.push(params.title);
            paramIndex++;
        }
        if (params.description !== undefined) {
            updateFields.push(`description = $${paramIndex}`);
            updateValues.push(params.description);
            paramIndex++;
        }
        updateValues.push(id);
        try {
            const { rows } = await (0, db_1.dbQuery)(`update categories set ${updateFields.join(', ')} where id = $${paramIndex} returning *`, updateValues);
            return rows[0];
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.CannotPatchCategory);
        }
    }
    static async deleteCategory(id) {
        await this.findCategoryById(id);
        await (0, db_1.dbQuery)('delete from categories where id=$1', [id]);
    }
    static async getProductsByCategoryId(categoryId) {
        try {
            const dbResponse = await (0, db_1.dbQuery)('select * from goods where category_id = $1 order by id', [categoryId]);
            return dbResponse.rows;
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.CannotGetProductsByCategoryId);
        }
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=categoryService.js.map
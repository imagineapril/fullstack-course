"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const db_1 = require("../db");
const errors_1 = require("../errors");
class ProductService {
    static async getAllProducts() {
        try {
            const dbResponse = await (0, db_1.dbQuery)(`select p.*, c.title as category_title
         from goods p
         left join categories c on p.category_id = c.id
         order by p.id`);
            return dbResponse.rows;
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.DBGetProductsError);
        }
    }
    static async createProduct(params) {
        const categoryCheck = await (0, db_1.dbQuery)('select id from categories where id = $1', [params.category_id]);
        if (categoryCheck.count === 0) {
            const errors = { noExisted: errors_1.ErrorMessages.NotExistedCategory };
            throw new errors_1.ValidationError(errors);
        }
        const isExistedProduct = await (0, db_1.dbQuery)('select * from products where title = $1', [params.title]);
        if (isExistedProduct.count) {
            const errors = { alreadyCreated: errors_1.ErrorMessages.AlreadyExistedProduct };
            throw new errors_1.ValidationError(errors);
        }
        try {
            const { rows } = await (0, db_1.dbQuery)('insert into goods(title, description, price, category_id) values($1, $2, $3, $4) returning id', [params.title, params.description, params.price, params.category_id]);
            return rows[0];
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.DBError);
        }
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=productService.js.map
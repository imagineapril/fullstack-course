"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketService = void 0;
const db_1 = require("../db");
const errors_1 = require("../errors");
class BasketService {
    static async createBasketForUserId(userId) {
        try {
            await (0, db_1.dbQuery)('Insert into baskets(user_id) values ($1)', [userId]);
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.CannotCreateBasketForUser);
        }
    }
    static async findbasketIdByUserId(userId) {
        const dbResponse = await (0, db_1.dbQuery)('select id from baskets where user_id = $1', [userId]);
        if (dbResponse.count === 0) {
            throw new errors_1.DBError(errors_1.ErrorMessages.BasketNotFound);
        }
        return dbResponse.rows[0].id;
    }
    static async getProductsByBasketId(basketId) {
        try {
            const dbResponse = await (0, db_1.dbQuery)('select t1.product_id as id, t1.amount, t2.title, t2.description, t2.img_url, t2.price, t2.category_id as categoryId from baskets_products as t1 join goods as t2 on t1."product_id" = t2."id" where t1.id = $1 ', [basketId]);
            return dbResponse.rows;
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.CannotGetProductsFromBasket);
        }
    }
    static async addProductToBasket(basketId, productId, amount) {
        try {
            await (0, db_1.dbQuery)('insert into baskets_products(basket_id, product_od, amount) values($1, $2, $3)', [basketId, productId, amount]);
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.CannotAddProductToBasket);
        }
    }
    static async deleteProductFromBasket(basketId, productId) {
        await (0, db_1.dbQuery)('delete from baskets_products where basket_id = $1 and product_id = $2', [basketId, productId]);
    }
    static async changeProductAmount(basketId, productId, amount) {
        try {
            await (0, db_1.dbQuery)('update baskets_products set amount = $1 where basket_id = $2 and product_id = $3', [amount, basketId, productId]);
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.CannotChangeProductAmount);
        }
    }
}
exports.BasketService = BasketService;
//# sourceMappingURL=BasketService.js.map
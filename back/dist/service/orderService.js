"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const db_1 = require("../db");
const errors_1 = require("../errors");
const createProductsToOrderSQLQuery_1 = require("../utils/createProductsToOrderSQLQuery");
const BasketService_1 = require("./BasketService");
class OrderService {
    static async createOrder(userId, address, phoneNumber, products) {
        try {
            await (0, db_1.dbQuery)('BEGIN');
            const orderDbResponse = await (0, db_1.dbQuery)('insert into orders(phone_number, address, user_id) values($1, $2, $3) returning id', [phoneNumber, address, userId]);
            const orderId = orderDbResponse.rows[0].id;
            const createProductsSQLQuery = (0, createProductsToOrderSQLQuery_1.createProductsToOrderSQLQuery)(orderId, products);
            await (0, db_1.dbQuery)(createProductsSQLQuery);
            const basketId = await BasketService_1.BasketService.findbasketIdByUserId(userId);
            await (0, db_1.dbQuery)('delete from baskets_products where basket_id = $1', [basketId]);
            await (0, db_1.dbQuery)('COMMIT');
            return orderId;
        }
        catch (error) {
            console.error(error);
            await (0, db_1.dbQuery)('ROLLBACK');
            throw new errors_1.DBError(errors_1.ErrorMessages.CreateOrderError);
        }
    }
    static async getAllOrders() {
        try {
            const dbResponse = await (0, db_1.dbQuery)('select * from orders');
            return dbResponse.rows;
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.CannotGetAllOrders);
        }
    }
    static async getOrderById(orderId) {
        try {
            const dbResponse = await (0, db_1.dbQuery)('select * from orders where id = $1', [orderId]);
            return dbResponse.rows[0];
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.CannotGetOrder);
        }
    }
    static async getUserOrdersById(userId) {
        try {
            const dbResponse = await (0, db_1.dbQuery)('select * from orders where user_id = $1', [userId]);
            return dbResponse.rows;
        }
        catch (error) {
            console.error(error);
            throw new errors_1.DBError(errors_1.ErrorMessages.CannotGetUserOrders);
        }
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=orderService.js.map
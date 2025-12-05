"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductsToOrderSQLQuery = void 0;
const createProductsToOrderSQLQuery = (orderId, products) => {
    return products.map(product => {
        return `insert into orders_products(order_id, product_id, amount) values(${orderId}, ${product.id}, ${product.amount})`;
    }).join('; \n');
};
exports.createProductsToOrderSQLQuery = createProductsToOrderSQLQuery;
//# sourceMappingURL=createProductsToOrderSQLQuery.js.map
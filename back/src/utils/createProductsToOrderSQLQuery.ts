import { IProductRequestData } from "../controllers/create-order";

export const createProductsToOrderSQLQuery = (orderId: number, products: IProductRequestData[]) => {
  return products.map(product => {
    return `insert into orders_products(order_id, product_id, amount) values(${orderId}, ${product.id}, ${product.amount})`
  }).join('; \n');
};
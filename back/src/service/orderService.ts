import { IProductRequestData } from "../controllers/create-order";
import { IOrderWithProducts } from "../controllers/order-with-products-response";
import { dbQuery } from "../db";
import { DBError, ErrorMessages } from "../errors";
import { IOrder } from "../types/order";
import { IProduct } from "../types/product";
import { createProductsToOrderSQLQuery } from "../utils/createProductsToOrderSQLQuery";
import { BasketService } from "./BasketService";

export class OrderService {
  static async createOrder(userId: string, address: string, phoneNumber: string, products: IProductRequestData[]): Promise<number> {
    try {
      await dbQuery('BEGIN');
      const orderDbResponse = await dbQuery('insert into orders(phone_number, address, user_id) values($1, $2, $3) returning id', [phoneNumber, address, userId]);

      const orderId = orderDbResponse.rows[0]!.id;

      const createProductsSQLQuery = createProductsToOrderSQLQuery(orderId, products);
      await dbQuery(createProductsSQLQuery);

      const basketId = await BasketService.findbasketIdByUserId(userId);
      await dbQuery('delete from baskets_products where basket_id = $1', [basketId]);
      await dbQuery('COMMIT');
      return orderId;

    } catch(error) {
      console.error(error);
      await dbQuery('ROLLBACK');
      throw new DBError(ErrorMessages.CreateOrderError)
    }
  }

  static async getAllOrders(): Promise<IOrder[]> {
    try {
      const dbResponse = await dbQuery<IOrder>('select * from orders');
      return dbResponse.rows;
    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.CannotGetAllOrders)
    }
  }

  static async getOrderById(orderId: string): Promise<IOrder> {
    try {
      const dbResponse = await dbQuery<IOrder>('select * from orders where id = $1', [orderId]);
      return dbResponse.rows[0]!;
    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.CannotGetOrder)
    }
  }

  static async getUserOrdersById(userId: string): Promise<IOrder[]> {
    try {
      const dbResponse = await dbQuery<IOrder>('select * from orders where user_id = $1', [userId]);
      return dbResponse.rows;
    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.CannotGetUserOrders)
    }
  }

  // static async getUserOrderByUserId(userId: string, orderId: string): Promise<IOrderWithProducts> {
  //   try{
  //     const orderResponse = await dbQuery<IOrder>('select * from orders where user_id = $1', [userId]);
  //     const orderProducts = await dbQuery<IProduct>('select * from orders_products where order_id = $2', [orderId]);
  //     return { ...orderProducts.rows[0], products: orderProducts.rows }

  //   } catch(error) {
  //     console.error(error);
  //     throw new DBError(ErrorMessages.CannotGetUserOrder)
  //   }

  // }
}
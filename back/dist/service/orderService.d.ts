import { IProductRequestData } from "../controllers/create-order";
import { IOrder } from "../types/order";
export declare class OrderService {
    static createOrder(userId: string, address: string, phoneNumber: string, products: IProductRequestData[]): Promise<number>;
    static getAllOrders(): Promise<IOrder[]>;
    static getOrderById(orderId: string): Promise<IOrder>;
    static getUserOrdersById(userId: string): Promise<IOrder[]>;
}
//# sourceMappingURL=orderService.d.ts.map
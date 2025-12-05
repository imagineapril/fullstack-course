import type { Request, Response } from "express";
import { IOrderErrors, IOrderIdParam, IUserIdParam } from "../types/order";
import { DBError, ErrorMessages, ValidationError } from "../errors";
import { IOrderCreateRequest } from "./create-order";
import { OrderService } from "../service/orderService";

export class ordersController {
  static async getOrders(request: Request, response: Response) {
    const orders = await OrderService.getAllOrders();

    const ordersDto = orders.map((order) => ({
      id: order.id,
      address: order.address,
      created: order.created,
      phoneNumber: order['phone_number'],
      orderId: order['user_id'],
    }))
    response.status(200).send(ordersDto);
  }

  static async createOrder(request: Request<IUserIdParam, IOrderCreateRequest>, response: Response) {
    const { userId } = request.params;
    const { products, phoneNumber, address } = request.body;

    const errors: IOrderErrors = {};

    if(!products || products.length === 0) {
      errors.empryProducts = ErrorMessages.EmptyOrderProducts;
    }

    if(!address) {
      errors.emptyAddress = ErrorMessages.EmptyOrderAddress;
    }

    if(!phoneNumber) {
      errors.emptyPhoneNumber = ErrorMessages.EmptyOrderPhoneNumber;
    }

    if(Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    const createdOrderId = await OrderService.createOrder(userId, address, phoneNumber, products);
    response.status(201).send({ createdOrderId: createdOrderId});
  }

  static async getOrder(request: Request<IOrderIdParam>, response: Response) {
    const { orderId } = request.params;
    const order = await OrderService.getOrderById(orderId);
    if(!order) {
      throw new DBError(ErrorMessages.HaveNoOrderById);
    }
    response.status(200).send(order);
  }

  static async getUserOrders(request: Request<IUserIdParam>, response: Response) {
    const { userId } = request.params;
    const userOrders = await OrderService.getUserOrdersById(userId);
    response.status(200).send(userOrders);
  }

  // static async getUserOrder(request: Request<IUserIdParam | IOrderIdParam>, response: Response) {
  //   const { userId, orderId } = request.params;
  //   const userOrder = await OrderService.getUserOrderByUserId(userId, orderId);
  //   response.status(200).send(userOrder)
  // }
}
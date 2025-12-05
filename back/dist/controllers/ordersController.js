"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersController = void 0;
const errors_1 = require("../errors");
const orderService_1 = require("../service/orderService");
class ordersController {
    static async getOrders(request, response) {
        const orders = await orderService_1.OrderService.getAllOrders();
        const ordersDto = orders.map((order) => ({
            id: order.id,
            address: order.address,
            created: order.created,
            phoneNumber: order['phone_number'],
            orderId: order['user_id'],
        }));
        response.status(200).send(ordersDto);
    }
    static async createOrder(request, response) {
        const { userId } = request.params;
        const { products, phoneNumber, address } = request.body;
        const errors = {};
        if (!products || products.length === 0) {
            errors.empryProducts = errors_1.ErrorMessages.EmptyOrderProducts;
        }
        if (!address) {
            errors.emptyAddress = errors_1.ErrorMessages.EmptyOrderAddress;
        }
        if (!phoneNumber) {
            errors.emptyPhoneNumber = errors_1.ErrorMessages.EmptyOrderPhoneNumber;
        }
        if (Object.keys(errors).length) {
            throw new errors_1.ValidationError(errors);
        }
        const createdOrderId = await orderService_1.OrderService.createOrder(userId, address, phoneNumber, products);
        response.status(201).send({ createdOrderId: createdOrderId });
    }
    static async getOrder(request, response) {
        const { orderId } = request.params;
        const order = await orderService_1.OrderService.getOrderById(orderId);
        if (!order) {
            throw new errors_1.DBError(errors_1.ErrorMessages.HaveNoOrderById);
        }
        response.status(200).send(order);
    }
    static async getUserOrders(request, response) {
        const { userId } = request.params;
        const userOrders = await orderService_1.OrderService.getUserOrdersById(userId);
        response.status(200).send(userOrders);
    }
}
exports.ordersController = ordersController;
//# sourceMappingURL=ordersController.js.map
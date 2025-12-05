"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketController = void 0;
const BasketService_1 = require("../service/BasketService");
const errors_1 = require("../errors");
class BasketController {
    static async getBasketByUserId(request, response) {
        const { userId } = request.params;
        const basketId = await BasketService_1.BasketService.findbasketIdByUserId(userId);
        const productsInBasket = await BasketService_1.BasketService.getProductsByBasketId(basketId);
        const productsDto = productsInBasket.map((product) => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            //@ts-expect-error types postgres
            imgUrl: product["img_url"],
            categoryId: product["category_id"],
            amount: product.amount,
        }));
        response.status(200).send({ products: productsDto });
    }
    static async addProductByUserId(request, response) {
        const { userId } = request.params;
        const { productId, amount } = request.body;
        const errors = {};
        if (productId === undefined) {
            errors.emptyProductId = errors_1.ErrorMessages.EmptyProductId;
        }
        if (amount === undefined) {
            errors.emptyAmount = errors_1.ErrorMessages.EmptyAmount;
        }
        if (Object.keys(errors).length) {
            throw new errors_1.ValidationError(errors);
        }
        const basketId = await BasketService_1.BasketService.findbasketIdByUserId(userId);
        const productsInBasket = await BasketService_1.BasketService.addProductToBasket(basketId, productId, amount);
        response.status(204).send({ basketId });
    }
    static async deleteProductByUserId(request, response) {
        const { userId, productId } = request.params;
        const errors = {};
        if (productId === undefined) {
            errors.emptyProductId = errors_1.ErrorMessages.EmptyProductId;
        }
        if (Object.keys(errors).length) {
            throw new errors_1.ValidationError(errors);
        }
        const basketId = await BasketService_1.BasketService.findbasketIdByUserId(userId);
        await BasketService_1.BasketService.deleteProductFromBasket(basketId, productId);
        response.status(204).send({ id: basketId });
    }
    static async changeProductAmountByUserId(request, response) {
        const { userId } = request.params;
        const { productId, amount } = request.body;
        const errors = {};
        if (productId === undefined) {
            errors.emptyProductId = errors_1.ErrorMessages.EmptyProductId;
        }
        if (amount === undefined) {
            errors.emptyAmount = errors_1.ErrorMessages.EmptyAmount;
        }
        if (Object.keys(errors).length) {
            throw new errors_1.ValidationError(errors);
        }
        const basketId = await BasketService_1.BasketService.findbasketIdByUserId(userId);
        await BasketService_1.BasketService.changeProductAmount(basketId, productId, amount);
        response.status(200).send({ basketId });
    }
}
exports.BasketController = BasketController;
//# sourceMappingURL=basketController.js.map
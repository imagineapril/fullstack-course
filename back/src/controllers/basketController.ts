import type { Request, Response } from "express";
import { IUserIdParam } from "../types/user";
import { BasketService } from "../service/BasketService";
import { IBasketAddProductRequest } from "./create-product-in-basket";
import { IBasketDeleteProductParams, IBasketErrors } from "../types/basket";
import { DBError, ErrorMessages, ValidationError } from "../errors";

export class BasketController {
  static async getBasketByUserId(request: Request<IUserIdParam>, response: Response) {
    const { userId } = request.params;

    const basketId = await BasketService.findbasketIdByUserId(userId);
    const productsInBasket = await BasketService.getProductsByBasketId(basketId);

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

  static async addProductByUserId(request: Request<IUserIdParam, IBasketAddProductRequest>, response: Response) {
    const { userId } = request.params;
    const { productId, amount } = request.body;

    const errors: IBasketErrors = {};
    if(productId === undefined) {
      errors.emptyProductId = ErrorMessages.EmptyProductId;
    }

    if(amount === undefined) {
      errors.emptyAmount = ErrorMessages.EmptyAmount;
    }

    if(Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    const basketId = await BasketService.findbasketIdByUserId(userId);
    const productsInBasket = await BasketService.addProductToBasket(basketId, productId, amount);
    response.status(204).send({ basketId });
  }

  static async deleteProductByUserId(request: Request<IBasketDeleteProductParams>, response: Response) {
    const { userId, productId } = request.params;
    const errors: IBasketErrors = {};

    if(productId === undefined) {
      errors.emptyProductId = ErrorMessages.EmptyProductId;
    }

    if(Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    const basketId = await BasketService.findbasketIdByUserId(userId);
    await BasketService.deleteProductFromBasket(basketId, productId);

    response.status(204).send({ id: basketId});
  }

  static async changeProductAmountByUserId(request: Request<IUserIdParam, Pick<IBasketAddProductRequest, "amount" | "productId">>, response: Response) {
    const { userId } = request.params;
    const { productId, amount } = request.body;

    const errors: IBasketErrors = {};
    if(productId === undefined) {
      errors.emptyProductId = ErrorMessages.EmptyProductId;
    }

    if(amount === undefined) {
      errors.emptyAmount = ErrorMessages.EmptyAmount;
    }

    if(Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    const basketId = await BasketService.findbasketIdByUserId(userId);
    await BasketService.changeProductAmount(basketId, productId, amount);
    response.status(200).send({ basketId});
  }
}
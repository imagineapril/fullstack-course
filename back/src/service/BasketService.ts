import { dbQuery } from "../db";
import { DBError, ErrorMessages } from "../errors";
import { IBasket } from "../types/basket";
import { IProduct } from "../types/product";

export class BasketService {
  static async createBasketForUserId(userId: number):Promise<void> {
    try {
      await dbQuery('Insert into baskets(user_id) values ($1)', [userId]);
    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.CannotCreateBasketForUser)
    }
  }

  static async findbasketIdByUserId(userId: string): Promise<number> {
    const dbResponse = await dbQuery<Pick<IBasket, 'id'>>('select id from baskets where user_id = $1', [userId]);
    if(dbResponse.count === 0) {
      throw new DBError(ErrorMessages.BasketNotFound)
    }

    return dbResponse.rows[0]!.id;

  }

  static async getProductsByBasketId(basketId: number): Promise<IProduct[]> {
    try {
      const dbResponse = await dbQuery<IProduct>('select t1.product_id as id, t1.amount, t2.title, t2.description, t2.img_url, t2.price, t2.category_id as categoryId from baskets_products as t1 join goods as t2 on t1."product_id" = t2."id" where t1.id = $1 ', [basketId]);
      return dbResponse.rows

    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.CannotGetProductsFromBasket);
    }
  }

  static async addProductToBasket(basketId: number, productId: number, amount: number): Promise<void> {
    try {
      await dbQuery('insert into baskets_products(basket_id, product_od, amount) values($1, $2, $3)', [basketId, productId, amount])

    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.CannotAddProductToBasket)
    }
  }

  static async deleteProductFromBasket(basketId: number, productId: string): Promise<void> {
    await dbQuery('delete from baskets_products where basket_id = $1 and product_id = $2', [basketId, productId]);
  }

  static async changeProductAmount(basketId: number, productId: number, amount: number): Promise<void> {
    try {
      await dbQuery('update baskets_products set amount = $1 where basket_id = $2 and product_id = $3', [amount, basketId, productId]);
    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.CannotChangeProductAmount);
    }
  }
}
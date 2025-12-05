import { CreateProductPayload } from "../controllers/create-product";
import { dbQuery } from "../db";
import { DBError, ErrorMessages, ValidationError } from "../errors";
import { IProduct, IProductCreateRequest, IProductErrors, IProductCreatedResponse } from "../types/product";

export class ProductService {
  static async getAllProducts(): Promise<IProduct[]> {
    try {
      const dbResponse = await dbQuery<IProduct>(
        `select p.*, c.title as category_title
         from goods p
         left join categories c on p.category_id = c.id
         order by p.id`
      );
      return dbResponse.rows;
    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.DBGetProductsError)
    }
  }

  static async createProduct(params: CreateProductPayload): Promise<IProductCreatedResponse> {
    const categoryCheck = await dbQuery(
      'select id from categories where id = $1',
      [params.category_id]
    );

    if (categoryCheck.count === 0) {
      const errors: IProductErrors = { noExisted: ErrorMessages.NotExistedCategory};
      throw new ValidationError(errors);
    }

    const isExistedProduct = await dbQuery<IProduct>(
      'select * from products where title = $1',
      [params.title]
    );

    if(isExistedProduct.count) {
      const errors: IProductErrors = { alreadyCreated: ErrorMessages.AlreadyExistedProduct };
      throw new ValidationError(errors);
    }

    try {
      const { rows } = await dbQuery<IProductCreatedResponse>(
        'insert into goods(title, description, price, category_id) values($1, $2, $3, $4) returning id',
        [params.title, params.description, params.price, params.category_id]
      );
      return rows[0]!;
    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.DBError);
    }
  }
}
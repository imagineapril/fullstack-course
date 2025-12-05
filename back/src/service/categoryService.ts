import { CreateCategoryPayload } from "../controllers/create-category";
import { dbQuery } from "../db";
import { DBError, ErrorMessages, ValidationError } from "../errors";
import { ICategory, ICategoryCreateResponse, ICategoryErrors, ICategoryCreateRequest } from "../types/category";

export class CategoryService {
  static async getAllCategories(): Promise<ICategory[]> {
    try {
      const dbResponse = await dbQuery<ICategory>('select * from categories');
      return dbResponse.rows;
    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.DBGetCategoriesError)
    }
  }

  static async createCategory(params: CreateCategoryPayload): Promise<ICategoryCreateResponse> {
    const isExistedCategory = await dbQuery<ICategory>(
      'select * from categories where title = $1 or description = $2',
      [params.title, params.description]
    );

    if(isExistedCategory.count) {
      const errors: ICategoryErrors = { alredayCreated: ErrorMessages.AlreadyCreatedCategory };
      throw new ValidationError(errors);
    }

    const { rows } = await dbQuery<ICategoryCreateResponse>('insert into categories(title, description) values($1, $2) returning id', [params.title, params.description]);
    return rows[0]!;
  }

  static async findCategoryById(id: number): Promise<ICategory> {
    const dbResponse = await dbQuery<ICategory>('select * from categories where id = $1', [id]);

    if (dbResponse.count === 0 || !dbResponse.rows[0]) {
     const errors: ICategoryErrors = { noExistedCategory: ErrorMessages.NotExistedCategory };
     throw new ValidationError(errors);
    }

    return dbResponse.rows[0];
  }

  static async patchCategory(id: number, params: Partial<ICategoryCreateRequest>): Promise<ICategory>  {
		await this.findCategoryById(id);

		const updateFields: string[] = [];
    const updateValues: (string | number)[] = [];
    let paramIndex = 1;

    if (params.title !== undefined) {
      updateFields.push(`title = $${paramIndex}`);
      updateValues.push(params.title);
      paramIndex++;
    }

    if (params.description !== undefined) {
      updateFields.push(`description = $${paramIndex}`);
      updateValues.push(params.description);
      paramIndex++;
    }
    updateValues.push(id);

    try {
      const { rows } = await dbQuery<ICategory>(
        `update categories set ${updateFields.join(', ')} where id = $${paramIndex} returning *`,
        updateValues
      );
      return rows[0]!;
    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.CannotPatchCategory);
    }
	}

  static async deleteCategory(id: number): Promise<void> {
		await this.findCategoryById(id);
		await dbQuery('delete from categories where id=$1', [id]);
	}

  static async getProductsByCategoryId(categoryId: number): Promise<any[]> {
    try {
      const dbResponse = await dbQuery(
        'select * from goods where category_id = $1 order by id',
        [categoryId]
      );
      return dbResponse.rows;
    } catch(error) {
      console.error(error);
      throw new DBError(ErrorMessages.CannotGetProductsByCategoryId);
    }
  }
}
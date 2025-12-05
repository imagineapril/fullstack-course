// export interface IProduct {
// 	id: number;
//   title: string;
//   description: string;
//   price: number;
//   category_id: number;
// }

export interface IProduct {
	id?: number | null;
  title: string;
  description: string;
  price: number;
	imgUrl: string;
  category_id: number;
	amount?: number;
}

export interface IProductCreateRequest {
	title: string;
	description: string;
	price: number;
	categoryId: number;
}

export interface IProductErrors {
	title?: string;
	description?: string;
	price?: string;
	imgUrl?: string;
	categoryId?: string;
	alreadyCreated?: string;
	alreadyImgExisted?: string;
	writeError?: string;
	noExisted?: string;
	emptyIdParam?: string;
}

export interface IProductCreatedResponse {
	id: number;
}
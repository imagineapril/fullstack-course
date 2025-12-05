import { type Response } from 'express';
import { IUserErrors } from '../types/user';
import { ICategoryErrors } from '../types/category';
import { IProductErrors } from '../types/product';
import { IBasketErrors } from '../types/basket';
import { IOrderErrors } from '../types/order';

export enum ErrorMessages {
	Authorization = 'Ресурс доступен только авторизованным пользователям',
	AlreadyAuthorized = 'Пользователь уже авторизован',
	Unknown = 'Произошла неизвестная ошибка, попробуйте повторить запрос позже',
	Validation = 'Проверьте корректность введеных данных',
  DBError = 'Ошибка обращения к базе данных',
	EmptyEmail = 'Не заполнен email',
	EmptyPassword = 'Не заполнен пароль',
	AlreadyRegistered = 'Пользователь с таким email уже зарегистрирован',
	IncorrectEmail = 'Введите корректный email',
	PasswordLess6 = 'Пароль не может быть короче 6-и символов',
  RefreshRemoveError = 'Не удалось удалить refresh токен',
	InvalidRefreshToken = 'Вы не авторизованы',
	SessionExpired = 'Срок вашей сессии истек. Войдите в аккаунт еще раз',
	CreateUserError = 'Не удалось сохранить пользователя в базе данных',
	RepeatedRegistrationAttempt = 'Email уже используется',
	UserNotCreated = 'Пользователь с таким emailом не найден',
	InvalidPassword = ' Данные для входа неверные',
	CannotRemoveRefreshToken = 'Не удалось удалить рефреш-токен из базы',
	CannotSaveRefreshToken = 'Не удалось записать рефреш-токен в базу',
	HaveNoRefreshToken = 'Отсутствует рефреш-токен',
	DBFindRefreshTokenError = 'Рефреш-токен отсутствует в БД',
	InvalidAccessToken = 'Невалидный токен доступа',
	OnlyAdminAccess = 'Действие доступно только для администраторов',
	DBGetCategoriesError = 'Не удалось получить список категорий из базы',
	EmptyCategoryTitle = 'Не передано название категории',
	EmptyCategoryDescription = 'Не передано описание категории',
	AlreadyCreatedCategory = 'Категория с такими данными уже существует',
	NotExistedCategory = 'Такой категории не существует',
	CannotPatchCategory = 'Не удалось изменить категорию',
	EmptyPatchData = 'Нет данных для обновления категории',
	NoCategoryId = 'Не указан id категории',
	CannotGetProductsByCategoryId = 'Не удалось получить список товаров категории',
	DBGetProductsError = 'Не удалось получить список nоваров из базы',
	AlreadyExistedProduct = 'Товар с таким названием уже существует',
	CannotCreateBasketForUser = 'Не удалось создать корзину для пользователя',
	BasketNotFound = 'Корзина пользователя не найдена',
	CannotGetProductsFromBasket = 'Не удалось получить список товаров в корзине пользователя',
	EmptyProductId = 'Укажите идентификатор товара',
	EmptyAmount = 'Укажите количество товара',
	CannotAddProductToBasket = 'Не удалось добавить товар в корзину',
	CannotChangeProductAmount = 'Не удалось изменить количество товаров в корзине',
	EmptyOrderProducts = 'Нельзя создать пустой заказ',
	EmptyOrderAddress = 'Заполните адрес для доставки заказа',
	EmptyOrderPhoneNumber = 'Заполните номер телефона для заказа',
	CreateOrderError = 'Не удалось создать заказ',
	CannotGetAllOrders = 'Не удалось получить список заказов из базы',
	CannotGetOrder = 'Не удалось получить заказ из базы',
	HaveNoOrderById = 'Заказ с таким идентификатором отсутствует в базе',
	CannotGetUserOrders = 'Не удалось получить список заказов пользователя',
	CannotGetUserOrder = 'Не удалось получить заказ пользователя',
}

export enum HttpCodes {
	OK = 200,
	Created = 201,
	BadRequest = 400,
	Authorization = 401,
	Forbidden = 403,
  AlreadyCreated = 409,
	Unknown = 520,
}

export enum ErrorTypes {
	Authorization = 'Authorization',
	AlreadyAuthorized = 'AlreadyAuthorized',
  AlreadyRegistered = 'AlreadRegistered',
	Validation = 'Validation',
	DB = 'Database',
  Error = 'Error',
}

interface ApplicationErrorArgs {
  type?: ErrorTypes;
	// name?: string;
	httpCode: HttpCodes;
	// description: string;
  message: string;
}

export class ApplicationError extends Error {
  httpCode: HttpCodes;
  type: ErrorTypes;
	// public readonly name: string;
	// public readonly httpCode: HttpCodes;

	constructor(args: ApplicationErrorArgs) {
		// super(args.description);
    super(args.message);

    this.type = (args.type || 'Error') as ErrorTypes;
		// this.name = args.name ?? 'Error';
		this.httpCode = args.httpCode;

		Error.captureStackTrace(this);
	}
}

export class AuthorizationError extends ApplicationError {
	constructor(message?: string) {
		super({
			message: message ?? ErrorMessages.Authorization,
			httpCode: HttpCodes.Authorization,
			type: ErrorTypes.Authorization,
		});
	}
}

export class AlreadyAuthorizedError extends ApplicationError {
	constructor() {
		super({
			message: ErrorMessages.AlreadyAuthorized,
			httpCode: HttpCodes.BadRequest,
			type: ErrorTypes.AlreadyAuthorized,
		});
	}
}

export class AlreadRegisteredError extends ApplicationError {
	constructor() {
		super({
			message: ErrorMessages.AlreadyRegistered,
			httpCode: HttpCodes.AlreadyCreated,
			type: ErrorTypes.AlreadyRegistered,
		});
	}
}

export class ValidationError extends ApplicationError {
	errors: IUserErrors | ICategoryErrors | IProductErrors | IBasketErrors| IOrderErrors;
	constructor(errors: IUserErrors | ICategoryErrors | IProductErrors | IBasketErrors | IOrderErrors) {
		super({
			message: ErrorMessages.Validation,
			httpCode: HttpCodes.BadRequest,
			type: ErrorTypes.Validation,
		});

		this.errors = errors;
	}
}

export class DBError extends ApplicationError {
	constructor(message?: string) {
		super({
			message: message ?? ErrorMessages.DBError,
			httpCode: HttpCodes.Unknown,
			type: ErrorTypes.DB,
		});
	}
}

export type ApplicationErrors = AuthorizationError | AlreadyAuthorizedError | ValidationError | DBError;

export class ErrorHandler {
	static errorProcessing = (error: ApplicationErrors, response: Response): void => {
		const { type, httpCode, message } = error;
    console.log("Error processing");
    console.log("Error type:  ", error?.type);
    console.log("Error message: ", error?.message);

		if (type === ErrorTypes.Authorization) {
			response.status(HttpCodes.Authorization).send(JSON.stringify({ message, httpCode }));
			return;
		}

		if (type === ErrorTypes.AlreadyAuthorized) {
			response.status(HttpCodes.BadRequest).send(JSON.stringify({ message, httpCode }));
			return;
		}

    if (type === ErrorTypes.AlreadyRegistered) {
			response.status(HttpCodes.AlreadyCreated).send(JSON.stringify({ message, httpCode }));
			return;
		}

		if (type === ErrorTypes.Validation) {
			response.status(HttpCodes.BadRequest).send(
				JSON.stringify({ message, httpCode, errors: (error as ValidationError).errors })
			);
			return;
		}

		if (type === ErrorTypes.DB) {
			response.status(HttpCodes.Unknown).send(JSON.stringify({ message, httpCode }));
			return;
		}

		response.status(HttpCodes.Unknown).send(JSON.stringify({ message, httpCode: HttpCodes.BadRequest, type: ErrorTypes.Error }));
	};
}
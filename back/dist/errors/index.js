"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.DBError = exports.ValidationError = exports.AlreadRegisteredError = exports.AlreadyAuthorizedError = exports.AuthorizationError = exports.ApplicationError = exports.ErrorTypes = exports.HttpCodes = exports.ErrorMessages = void 0;
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["Authorization"] = "\u0420\u0435\u0441\u0443\u0440\u0441 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0442\u043E\u043B\u044C\u043A\u043E \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u043C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C";
    ErrorMessages["AlreadyAuthorized"] = "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0443\u0436\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D";
    ErrorMessages["Unknown"] = "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441 \u043F\u043E\u0437\u0436\u0435";
    ErrorMessages["Validation"] = "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0441\u0442\u044C \u0432\u0432\u0435\u0434\u0435\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445";
    ErrorMessages["DBError"] = "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F \u043A \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445";
    ErrorMessages["EmptyEmail"] = "\u041D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D email";
    ErrorMessages["EmptyPassword"] = "\u041D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D \u043F\u0430\u0440\u043E\u043B\u044C";
    ErrorMessages["AlreadyRegistered"] = "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u0442\u0430\u043A\u0438\u043C email \u0443\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D";
    ErrorMessages["IncorrectEmail"] = "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 email";
    ErrorMessages["PasswordLess6"] = "\u041F\u0430\u0440\u043E\u043B\u044C \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043A\u043E\u0440\u043E\u0447\u0435 6-\u0438 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432";
    ErrorMessages["RefreshRemoveError"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C refresh \u0442\u043E\u043A\u0435\u043D";
    ErrorMessages["InvalidRefreshToken"] = "\u0412\u044B \u043D\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u044B";
    ErrorMessages["SessionExpired"] = "\u0421\u0440\u043E\u043A \u0432\u0430\u0448\u0435\u0439 \u0441\u0435\u0441\u0441\u0438\u0438 \u0438\u0441\u0442\u0435\u043A. \u0412\u043E\u0439\u0434\u0438\u0442\u0435 \u0432 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0435\u0449\u0435 \u0440\u0430\u0437";
    ErrorMessages["CreateUserError"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0432 \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445";
    ErrorMessages["RepeatedRegistrationAttempt"] = "Email \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F";
    ErrorMessages["UserNotCreated"] = "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u0442\u0430\u043A\u0438\u043C email\u043E\u043C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D";
    ErrorMessages["InvalidPassword"] = " \u0414\u0430\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u0430 \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0435";
    ErrorMessages["CannotRemoveRefreshToken"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0440\u0435\u0444\u0440\u0435\u0448-\u0442\u043E\u043A\u0435\u043D \u0438\u0437 \u0431\u0430\u0437\u044B";
    ErrorMessages["CannotSaveRefreshToken"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0440\u0435\u0444\u0440\u0435\u0448-\u0442\u043E\u043A\u0435\u043D \u0432 \u0431\u0430\u0437\u0443";
    ErrorMessages["HaveNoRefreshToken"] = "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0440\u0435\u0444\u0440\u0435\u0448-\u0442\u043E\u043A\u0435\u043D";
    ErrorMessages["DBFindRefreshTokenError"] = "\u0420\u0435\u0444\u0440\u0435\u0448-\u0442\u043E\u043A\u0435\u043D \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0432 \u0411\u0414";
    ErrorMessages["InvalidAccessToken"] = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u044B\u0439 \u0442\u043E\u043A\u0435\u043D \u0434\u043E\u0441\u0442\u0443\u043F\u0430";
    ErrorMessages["OnlyAdminAccess"] = "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u0432";
    ErrorMessages["DBGetCategoriesError"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439 \u0438\u0437 \u0431\u0430\u0437\u044B";
    ErrorMessages["EmptyCategoryTitle"] = "\u041D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438";
    ErrorMessages["EmptyCategoryDescription"] = "\u041D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u043E \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438";
    ErrorMessages["AlreadyCreatedCategory"] = "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u0441 \u0442\u0430\u043A\u0438\u043C\u0438 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442";
    ErrorMessages["NotExistedCategory"] = "\u0422\u0430\u043A\u043E\u0439 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442";
    ErrorMessages["CannotPatchCategory"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E";
    ErrorMessages["EmptyPatchData"] = "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438";
    ErrorMessages["NoCategoryId"] = "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D id \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438";
    ErrorMessages["CannotGetProductsByCategoryId"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438";
    ErrorMessages["DBGetProductsError"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A n\u043E\u0432\u0430\u0440\u043E\u0432 \u0438\u0437 \u0431\u0430\u0437\u044B";
    ErrorMessages["AlreadyExistedProduct"] = "\u0422\u043E\u0432\u0430\u0440 \u0441 \u0442\u0430\u043A\u0438\u043C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442";
    ErrorMessages["CannotCreateBasketForUser"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u043E\u0440\u0437\u0438\u043D\u0443 \u0434\u043B\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F";
    ErrorMessages["BasketNotFound"] = "\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430";
    ErrorMessages["CannotGetProductsFromBasket"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F";
    ErrorMessages["EmptyProductId"] = "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0442\u043E\u0432\u0430\u0440\u0430";
    ErrorMessages["EmptyAmount"] = "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u0430";
    ErrorMessages["CannotAddProductToBasket"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443";
    ErrorMessages["CannotChangeProductAmount"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0435";
    ErrorMessages["EmptyOrderProducts"] = "\u041D\u0435\u043B\u044C\u0437\u044F \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0443\u0441\u0442\u043E\u0439 \u0437\u0430\u043A\u0430\u0437";
    ErrorMessages["EmptyOrderAddress"] = "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u0434\u043B\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u0437\u0430\u043A\u0430\u0437\u0430";
    ErrorMessages["EmptyOrderPhoneNumber"] = "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430 \u0434\u043B\u044F \u0437\u0430\u043A\u0430\u0437\u0430";
    ErrorMessages["CreateOrderError"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u043A\u0430\u0437";
    ErrorMessages["CannotGetAllOrders"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u0438\u0437 \u0431\u0430\u0437\u044B";
    ErrorMessages["CannotGetOrder"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437 \u0438\u0437 \u0431\u0430\u0437\u044B";
    ErrorMessages["HaveNoOrderById"] = "\u0417\u0430\u043A\u0430\u0437 \u0441 \u0442\u0430\u043A\u0438\u043C \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u043C \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0432 \u0431\u0430\u0437\u0435";
    ErrorMessages["CannotGetUserOrders"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F";
    ErrorMessages["CannotGetUserOrder"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F";
})(ErrorMessages || (exports.ErrorMessages = ErrorMessages = {}));
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["Created"] = 201] = "Created";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Authorization"] = 401] = "Authorization";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["AlreadyCreated"] = 409] = "AlreadyCreated";
    HttpCodes[HttpCodes["Unknown"] = 520] = "Unknown";
})(HttpCodes || (exports.HttpCodes = HttpCodes = {}));
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["Authorization"] = "Authorization";
    ErrorTypes["AlreadyAuthorized"] = "AlreadyAuthorized";
    ErrorTypes["AlreadyRegistered"] = "AlreadRegistered";
    ErrorTypes["Validation"] = "Validation";
    ErrorTypes["DB"] = "Database";
    ErrorTypes["Error"] = "Error";
})(ErrorTypes || (exports.ErrorTypes = ErrorTypes = {}));
class ApplicationError extends Error {
    httpCode;
    type;
    // public readonly name: string;
    // public readonly httpCode: HttpCodes;
    constructor(args) {
        // super(args.description);
        super(args.message);
        this.type = (args.type || 'Error');
        // this.name = args.name ?? 'Error';
        this.httpCode = args.httpCode;
        Error.captureStackTrace(this);
    }
}
exports.ApplicationError = ApplicationError;
class AuthorizationError extends ApplicationError {
    constructor(message) {
        super({
            message: message ?? ErrorMessages.Authorization,
            httpCode: HttpCodes.Authorization,
            type: ErrorTypes.Authorization,
        });
    }
}
exports.AuthorizationError = AuthorizationError;
class AlreadyAuthorizedError extends ApplicationError {
    constructor() {
        super({
            message: ErrorMessages.AlreadyAuthorized,
            httpCode: HttpCodes.BadRequest,
            type: ErrorTypes.AlreadyAuthorized,
        });
    }
}
exports.AlreadyAuthorizedError = AlreadyAuthorizedError;
class AlreadRegisteredError extends ApplicationError {
    constructor() {
        super({
            message: ErrorMessages.AlreadyRegistered,
            httpCode: HttpCodes.AlreadyCreated,
            type: ErrorTypes.AlreadyRegistered,
        });
    }
}
exports.AlreadRegisteredError = AlreadRegisteredError;
class ValidationError extends ApplicationError {
    errors;
    constructor(errors) {
        super({
            message: ErrorMessages.Validation,
            httpCode: HttpCodes.BadRequest,
            type: ErrorTypes.Validation,
        });
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
class DBError extends ApplicationError {
    constructor(message) {
        super({
            message: message ?? ErrorMessages.DBError,
            httpCode: HttpCodes.Unknown,
            type: ErrorTypes.DB,
        });
    }
}
exports.DBError = DBError;
class ErrorHandler {
    static errorProcessing = (error, response) => {
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
            response.status(HttpCodes.BadRequest).send(JSON.stringify({ message, httpCode, errors: error.errors }));
            return;
        }
        if (type === ErrorTypes.DB) {
            response.status(HttpCodes.Unknown).send(JSON.stringify({ message, httpCode }));
            return;
        }
        response.status(HttpCodes.Unknown).send(JSON.stringify({ message, httpCode: HttpCodes.BadRequest, type: ErrorTypes.Error }));
    };
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=index.js.map
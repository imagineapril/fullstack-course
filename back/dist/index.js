// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const express_1 = __importDefault(require("express"));
// const cookie_parser_1 = __importDefault(require("cookie-parser"));
// const authRouter_1 = require("./routes/authRouter");
// const categoriesRouter_1 = require("./routes/categoriesRouter");
// const errorsMiddleware_1 = require("./middlewares/errorsMiddleware");
// const cors_1 = __importDefault(require("cors"));
// const basketRouter_1 = require("./routes/basketRouter");
// const ordersRouter_1 = require("./routes/ordersRouter");
// const app = (0, express_1.default)();
// const port = process.env.PORT ?? 9002;
// app.use((0, cors_1.default)({
//     origin: 'http://localhost:5173',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express_1.default.json());
// app.use((0, cookie_parser_1.default)());
// app.use('/api/v1/auth', authRouter_1.authRouter);
// app.use('/api/v1/categories', categoriesRouter_1.categoriesRouter);
// app.use('/api/v1/baskets', basketRouter_1.basketRouter);
// app.use('/api/v1/orders', ordersRouter_1.ordersRouter);
// app.use(errorsMiddleware_1.errorsMiddleware);
// app.get('/', (reg, res) => {
//     res.send('Express server started');
// });
// app.listen(port, async () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });
// //# sourceMappingURL=index.js.map

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));  // Add this import
const authRouter_1 = require("./routes/authRouter");
const categoriesRouter_1 = require("./routes/categoriesRouter");
const errorsMiddleware_1 = require("./middlewares/errorsMiddleware");
const basketRouter_1 = require("./routes/basketRouter");
const ordersRouter_1 = require("./routes/ordersRouter");
const app = (0, express_1.default)();
const port = process.env.PORT ?? 9002;

// Add CORS middleware
app.use((0, cors_1.default)({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());

// Fix the missing slashes
app.use('/api/v1/auth', authRouter_1.authRouter);
app.use('/api/v1/categories', categoriesRouter_1.categoriesRouter);
app.use('/api/v1/baskets', basketRouter_1.basketRouter);
app.use('/api/v1/orders', ordersRouter_1.ordersRouter);

app.use(errorsMiddleware_1.errorsMiddleware);

app.get('/', (reg, res) => {
  res.send('Express server started');
});

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
});
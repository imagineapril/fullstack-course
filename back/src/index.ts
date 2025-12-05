import express, { type Express, type Request, type Response } from 'express';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/authRouter';
import { categoriesRouter } from './routes/categoriesRouter';
import { errorsMiddleware } from './middlewares/errorsMiddleware';
import cors from 'cors';
import { pool } from './db';
import { basketRouter } from './routes/basketRouter';
import { ordersRouter } from './routes/ordersRouter';

const app: Express = express();
const port = process.env.PORT ?? 9002;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/baskets', basketRouter);
app.use('/api/v1/orders', ordersRouter);

app.use(errorsMiddleware);


app.get('/', (reg: Request, res: Response) => {
  res.send('Express server started');
});

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
});


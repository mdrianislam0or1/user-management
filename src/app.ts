import { UserRoutes } from './app/modules/user/user.route';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.sendStatus(200).json({
    success: true,
    message: `'Welcome to the API!'
    "GET /api/users"
    "GET /api/users/:userId"
    "POST /api/users"
    "PUT /api/users/:userId"
    "DELETE /api/users/:userId"
    "PUT /api/users/:userId/orders"
    "GET /api/users/:userId/orders"
    "GET /api/users/:userId/orders/total-price"
    
    `,
  });
};

app.get('/', getAController);

export default app;

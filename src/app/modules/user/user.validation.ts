import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const userSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
});

const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    userSchema.parse(req.body.user);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: {
        code: 400,
        description: error as any,
      },
    });
  }
};

export const validateOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    orderSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: {
        code: 400,
        description: error as any,
      },
    });
  }
};

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      throw new Error('Invalid userId');
    }

    userSchema.pick({ userId: true }).parse({ userId });
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: {
        code: 400,
        description: error as any,
      },
    });
  }
};

import express from 'express';
import { UserControllers } from './user.controller';
import { validateOrder, validateUser, validateUserId } from './user.validation';

const router = express.Router();

// Create a new user
router.post('/', validateUser, UserControllers.createUser);

// Retrieve a list of all
router.get('/', UserControllers.getAllUsers);

// Retrieve a user
router.get('/:userId', validateUserId, UserControllers.getUserById);

// Update user
router.put(
  '/:userId',
  validateUserId,
  validateUser,
  UserControllers.updateUserById,
);

// Delete a user
router.delete('/:userId', validateUserId, UserControllers.deleteUserById);

// Add new product
router.put(
  '/:userId/orders',
  validateUserId,
  validateOrder,
  UserControllers.addProductToOrder,
);

// Retrieve all orders
router.get(
  '/:userId/orders',
  validateUserId,
  UserControllers.getAllOrdersForUser,
);

// Calculate total
router.get(
  '/:userId/orders/total-price',
  validateUserId,
  UserControllers.calculateTotalPriceForUser,
);

export const UserRoutes = router;

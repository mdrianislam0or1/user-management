import { User } from './user.interface';
import UserModel from './user.model';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (user: User) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userWithHashedPassword: User = {
      ...user,
      password: hashedPassword,
    };
    const result = await UserModel.create(userWithHashedPassword);
    return result;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};
const getUserByIdFromDB = async (userId: number) => {
  const user = await UserModel.findOne({ userId }, '-password');

  return user;
};

const updateUserByIdInDB = async (userId: number, updatedUserData: User) => {
  const user = await UserModel.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
    projection: { password: 0 },
  });

  return user;
};

const deleteUserByIdFromDB = async (userId: number) => {
  const user = await UserModel.findOneAndDelete({ userId });

  return user;
};

const addProductToOrderInDB = async (userId: number, orderData: any) => {
  const user = await UserModel.findOne({ userId });

  if (!user) {
    throw new Error('User not found!');
  }
  if (user.orders) {
    user.orders.push(orderData);
  } else {
    user.orders = [orderData];
  }
  await user.save();

  return null;
};

const getAllOrdersForUserFromDB = async (userId: number) => {
  const user = await UserModel.findOne({ userId });

  if (!user) {
    throw new Error('User not found!');
  }

  return user.orders || [];
};

const calculateTotalPriceForUserFromDB = async (userId: number) => {
  const user = await UserModel.findOne({ userId });

  if (!user) {
    throw new Error('User not found!');
  }

  let totalPrice = 0;

  if (user.orders) {
    user.orders.forEach((order) => {
      totalPrice += order.price * order.quantity;
    });
  }

  return totalPrice;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserByIdInDB,
  deleteUserByIdFromDB,
  addProductToOrderInDB,
  getAllOrdersForUserFromDB,
  calculateTotalPriceForUserFromDB,
};

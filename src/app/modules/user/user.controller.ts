import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await UserServices.createUserIntoDB(userData);
    const userCreateResult = {
      userId: result.userId,
      username: result.username,
      fullName: result.fullName,
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: result.address,
    };

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: userCreateResult,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    const filteredUsers = result.map((user) => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }));
    res.status(200).json({
      success: true,
      message: 'Uses are retrieved succesfully',
      data: filteredUsers,
    });
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await UserServices.getUserByIdFromDB(Number(userId));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: {
        userId: user.userId,
        username: user.username,
        fullName: user.fullName,
        age: user.age,
        email: user.email,
        isActive: user.isActive,
        hobbies: user.hobbies,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: {
        code: 505,
        description: 'Internal server error',
      },
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body.user;
    const user = await UserServices.updateUserByIdInDB(
      Number(userId),
      updatedUserData,
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: {
        userId: user.userId,
        username: user.username,
        fullName: user.fullName,
        age: user.age,
        email: user.email,
        isActive: user.isActive,
        hobbies: user.hobbies,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: {
        code: 505,
        description: 'Internal server error!',
      },
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await UserServices.deleteUserByIdFromDB(Number(userId));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    res.json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: {
        code: 505,
        description: 'User not found!',
      },
    });
  }
};

//Order Create
const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orderData = req.body;
    await UserServices.addProductToOrderInDB(Number(userId), orderData);
    res.json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllOrdersForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orders = await UserServices.getAllOrdersForUserFromDB(Number(userId));
    res.json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const calculateTotalPriceForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const totalPrice = await UserServices.calculateTotalPriceForUserFromDB(
      Number(userId),
    );

    res.json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  addProductToOrder,
  getAllOrdersForUser,
  calculateTotalPriceForUser,
};

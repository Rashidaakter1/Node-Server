import { Request, Response } from "express";
import { userService } from "./user.service";
import validateUser from "../user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await req.body.users;
    const zodParseData = validateUser.parse(user);
    const result = await userService.createUserFromDb(zodParseData);
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userService.getAllUsersFromDb();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: allUsers,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "User not found",
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getSingleUserFromDb(Number(userId));

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found",
      },
    });
  }
};

const updatedUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await req.body;
    const zodParseData = validateUser.parse(user);
    const result = await userService.updateUserFromDb(
      Number(userId),
      zodParseData
    );
    res.status(200).json({
      success: true,
      message: "User Updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUser = await userService.deleteUserFromDb(Number(userId));
    console.log(updatedUser);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};
const createOrdersFromUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await req.body;
    const result = await userService.createOrderFromDb(orders, Number(userId));
    res.status(200).json({
      success: true,
      message: "order is created successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const allOrders = await userService.getAllOrdersFromDb(Number(userId));
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: allOrders,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Orders not found",
      error: error,
    });
  }
};

const getTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const allOrders = await userService.getAllOrdersFromDb(Number(userId));

    const ordersArray = allOrders?.orders;
    let totalPrice = 0;
    ordersArray?.forEach((order) => {
      console.log(order.price);
      totalPrice = totalPrice + order.price * order.quantity;
    });

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice: totalPrice,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Orders not found",
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  getAllOrders,
  getTotalPriceOfOrders,
  createOrdersFromUser,
  updatedUser,
  deleteUser,
};

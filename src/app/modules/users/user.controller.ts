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
    const userId = parseInt(req.params.userId);
    const result = await userService.getSingleUserFromDb(userId);
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

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
};

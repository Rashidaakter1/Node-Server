import express from "express";
import { userController } from "./user.controller";

const userRouter = express.Router();

userRouter.post("/users", userController.createUser);
userRouter.get("/users", userController.getAllUsers);
userRouter.get("/users/:userId", userController.getSingleUser);

export default userRouter;

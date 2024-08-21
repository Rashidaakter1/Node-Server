import express from "express";
import { userController } from "./user.controller";

const userRouter = express.Router();

userRouter.post("/users", userController.createUser);
userRouter.get("/users", userController.getAllUsers);
userRouter.get("/users/:userId", userController.getSingleUser);
userRouter.get("/users/:userId/orders", userController.getAllOrders);
userRouter.get(
  "/users/:userId/orders/total-price",
  userController.getTotalPriceOfOrders
);

userRouter.put("/users/:userId/orders", userController.createOrdersFromUser);
export default userRouter;

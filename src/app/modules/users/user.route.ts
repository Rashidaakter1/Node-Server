import express from "express";
import { userController } from "./user.controller";

const userRouter = express.Router();

// Post request of user
userRouter.post("/users", userController.createUser);

// Get request of user
userRouter.get("/users", userController.getAllUsers);
userRouter.get("/users/:userId", userController.getSingleUser);

//update request of user
userRouter.put("/users/:userId", userController.updatedUser);

// delete request of user
userRouter.delete("/users/:userId", userController.deleteUser)
// Get request of orders
userRouter.get("/users/:userId/orders", userController.getAllOrders);
userRouter.get(
  "/users/:userId/orders/total-price",
  userController.getTotalPriceOfOrders
);

// Put request of orders
userRouter.put("/users/:userId/orders", userController.createOrdersFromUser);

export default userRouter;

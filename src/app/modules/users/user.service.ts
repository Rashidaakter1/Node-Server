import { Orders, TUser } from "./user.interface";
import { OrderModel, UserModel } from "./user.model";

// crete user from Database
const createUserFromDb = async (user: TUser) => {
  if (await UserModel.isUserExist(user.userId)) {
    throw new Error("User already exists");
  }
  const result = await UserModel.create(user);
  console.log(result);
  const userWithoutPassword = await UserModel.findById(result._id).select(
    "-password"
  );
  console.log(userWithoutPassword);
  return result;
};

//get all users from database and use field filtering to show username , age , email, full name, address
const getAllUsersFromDb = async () => {
  const result = await UserModel.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });

  return result;
};
// post orders from specific user
const createOrderFromDb = async (orders: Orders, userId: number) => {
  const user = await UserModel.findOne({ userId });
  const result = await OrderModel.create(orders);
  return result;
  // return user?.orders.push(result);
};

// get specific User from userId
const getSingleUserFromDb = async (userId: number) => {
  const user = await UserModel.findOne({ userId });
  return user;
};

//get all the orders from database from a user
const getAllOrdersFromDb = async (userId: number) => {
  const result = await UserModel.findOne({ userId }).select({ orders: 1 });
  return result;
};

export const userService = {
  createUserFromDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
  getAllOrdersFromDb,
  createOrderFromDb,
};

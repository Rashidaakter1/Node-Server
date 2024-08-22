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

//update User using userId
const updateUserFromDb = async (userId: number, user: TUser) => {
  if (await UserModel.isUserExist(user.userId)) {
    const filter = { userId };
    const options = { new: true };
    const updatedUser = await UserModel.findOneAndUpdate(filter, user, options);
    return updatedUser;
  } else {
    throw new Error(`User not found`);
  }
};

// delete user from database
const deleteUserFromDb = async (userId: number) => {
  console.log(userId);
  // if (await UserModel.isUserExist(userId)) {
  //   console.log("first user deleted");
  // } else {
  //   throw new Error(`User not found`);
  // }
  const userExist = await UserModel.isUserExist(userId);
  console.log(userExist);
  const updatedUser = await UserModel.updateOne(
    { userId },
    { $set: { isDeleted: true } }
  );
  console.log(updatedUser);
  return updatedUser;
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
  updateUserFromDb,
  deleteUserFromDb,
};

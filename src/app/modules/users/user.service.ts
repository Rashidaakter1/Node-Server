import { User } from "./user.interface";
import { UserModel } from "./user.model";

// crete user from Database
const createUserFromDb = async (user: User) => {
  const result = await UserModel.create(user);
  console.log(result);
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

// get specific User from userId
const getSingleUserFromDb = async (userId: number) => {
  const user = await UserModel.findOne({ userId });
  return user;
};

export const userService = {
  createUserFromDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
};

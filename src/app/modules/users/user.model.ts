import mongoose from "mongoose";
import { Orders, TUser, UserExtendModel } from "./user.interface";
import * as bcrypt from "bcrypt";
import config from "../../config";

const { Schema, model } = mongoose;

// Define the Orders schema
const OrdersSchema = new Schema<Orders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Define the User schema
const userSchema = new Schema<TUser, UserExtendModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },

  orders: [OrdersSchema],
});

userSchema.statics.isUserExist = async function (id: number) {
  const existingUser = await UserModel.findOne({ id });
  return existingUser;
};

// hashing the password
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt__saltRound)
  );


  next();

});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});





// 3. Create a Model.
export const UserModel = model<TUser, UserExtendModel>("User", userSchema);


export const OrderModel = model<Orders>("Order",OrdersSchema)
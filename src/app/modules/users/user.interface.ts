import { Model } from "mongoose";

export type Orders = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: Orders[];
  isDeleted: boolean;
};

export interface UserExtendModel extends Model<TUser> {
  isUserExist(id: number): Promise<TUser | null>;
}

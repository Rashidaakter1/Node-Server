import { z } from "zod";
const userNameValidation = z.object({
  firstName: z
    .string({
      required_error: "First Name is required",
      invalid_type_error: "First Name must be a string",
    })
    .min(2)
    .max(20, { message: "First name should be within 20 characters" }),

  lastName: z
    .string({
      required_error: "Last Name is required",
      invalid_type_error: "Last Name must be a string",
    })
    .min(2)
    .max(20, { message: "Last name should be within 20 characters" }),
});

const addressValidation = z.object({
  street: z.string().min(1, "street is required").max(20),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

const OrdersSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be a non-negative number"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

const validateUser = z.object({
  userId: z.number(),
  username: z
    .string({
      required_error: "User Name is required",
      invalid_type_error: "User Name must be a string",
    })
    .max(20, { message: "Last name should be within 20 characters" })
    .min(2, { message: "" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
  fullName: userNameValidation,
  age: z.number().min(14).max(90, { message: "Age can not be  above 90" }),
  email: z.string().email({ message: "Invalid email address" }),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string().min(1)),
  address: addressValidation,
  orders: z.array(OrdersSchema),
  isDeleted: z.boolean().default(false),
});

export default validateUser;

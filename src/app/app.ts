import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./modules/users/user.route";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "The Server is running",
  });
});

export default app;

import express, { Application, RequestHandler } from "express";
import * as userController from "../../controllers/user";
import * as userValidation from "../../validation/user";

const userRouter: Application = express();

userRouter.post("/register", [
  userValidation.registerValidation,
  userController.register,
] as RequestHandler[]);

userRouter.post("/login", [
  userValidation.loginValidation,
  userController.login,
] as RequestHandler[]);

export default userRouter;

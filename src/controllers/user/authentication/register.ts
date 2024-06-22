import { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import User, { type UserType } from "../../../schemas/User";
import { type ValidationError, validationResult } from "express-validator";

type ReqPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type ApiResponse = {
  success: boolean;
  data?: UserType;
  message?: string;
  errors?: ValidationError[];
};

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const responseData: ApiResponse = {
        success: false,
        message: "validation failed",
        errors: errors.array(),
      };
      return res.status(400).send(responseData);
    }

    const payload: ReqPayload = req.body;

    const exist = await User.estimatedDocumentCount({ email: payload.email });

    if (exist > 0) {
      const responseData: ApiResponse = {
        success: false,
        message: "Email is already registered!",
      };
      return res.status(400).send(responseData);
    }

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: payload.email,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
    });

    const newUser = await user.save();

    const response: ApiResponse = {
      success: true,
      data: newUser,
    };

    return res.status(201).send(response);
  } catch (error) {
    console.log("unexpected error : ", error);
    const response: ApiResponse = {
      success: false,
      message: "system Error",
    };
    return res.status(500).send(response);
  }
};

export default register;

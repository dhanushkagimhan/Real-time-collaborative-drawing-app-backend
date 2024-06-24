import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { type ValidationError, validationResult } from "express-validator";
import proposerAccessTokenGenerate from "../../../utility/commonMethods/accessTokenGenerator";
import User, { UserType } from "../../../schemas/User";
import accessTokenGenerate from "../../../utility/commonMethods/accessTokenGenerator";

type RequestPayload = {
  email: string;
  password: string;
};

type ApiResponse = {
  success: boolean;
  data?: {
    email: string;
    firstName: string;
    lastName: string;
    token: string;
  };
  message?: string;
  errors?: ValidationError[];
};

export const login = async (req: Request, res: Response): Promise<Response> => {
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

    const payload: RequestPayload = req.body;

    const user: UserType | null = await User.findOne({
      email: payload.email,
    }).exec();

    console.log("{user-login} found user data : ", user);

    if (user == null) {
      const responseData: ApiResponse = {
        success: false,
        message: "Email is not registered",
      };
      return res.status(404).send(responseData);
    }

    const isMatch: boolean = bcrypt.compareSync(
      payload.password,
      user.password
    );

    if (!isMatch) {
      const responseData: ApiResponse = {
        success: false,
        message: "Password is wrong",
      };
      return res.status(401).send(responseData);
    }

    const accessToken = accessTokenGenerate(payload.email);

    const responseData: ApiResponse = {
      success: true,
      data: {
        email: payload.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: accessToken,
      },
    };

    return res.status(200).send(responseData);
  } catch (error) {
    console.log(`Unexpected Error {user-login} : ${error}`);
    const responseData: ApiResponse = {
      success: false,
      message: "system Error",
    };
    return res.status(500).send(responseData);
  }
};

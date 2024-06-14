import { checkExact, checkSchema } from "express-validator";

export const registerValidation = checkExact(
  checkSchema({
    email: {
      exists: {
        errorMessage: "email is required",
        options: { checkFalsy: true },
        bail: true,
      },
      isEmail: { errorMessage: "Please provide valid email" },
    },
    password: {
      exists: {
        errorMessage: "Password is required",
        options: { checkFalsy: true },
        bail: true,
      },
      isString: {
        errorMessage: "password should be string",
        bail: true,
      },
      isLength: {
        options: { min: 8 },
        errorMessage: "Password should be at least 8 characters",
      },
    },
    firstName: {
      exists: {
        errorMessage: "firstName name is required",
        options: { checkFalsy: true },
        bail: true,
      },
      isString: { errorMessage: "firstName should be string" },
    },
    lastName: {
      exists: {
        errorMessage: "lastName name is required",
        options: { checkFalsy: true },
        bail: true,
      },
      isString: { errorMessage: "lastName should be string" },
    },
  })
);

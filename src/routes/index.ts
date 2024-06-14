import express, { Application } from "express";
import userRouter from "./user/userRouter";

const router: Application = express();

router.use("/user", userRouter);

export default router;

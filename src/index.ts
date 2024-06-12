import mongoose from "mongoose";
import "dotenv/config";

const mongoURL: string = process.env.MONGO_URL ?? "";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => {
    console.log("Error when connecting the database : ", error);
  });

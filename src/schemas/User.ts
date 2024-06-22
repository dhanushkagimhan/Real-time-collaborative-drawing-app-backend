import mongoose, { Schema, type Document } from "mongoose";

type UserType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type UserModel = {} & UserType & Document;

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<UserModel>("User", UserSchema);

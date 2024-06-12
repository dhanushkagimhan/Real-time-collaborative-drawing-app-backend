"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const mongoURL = (_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : "";
mongoose_1.default
    .connect(mongoURL)
    .then(() => {
    console.log("Connected to database!");
})
    .catch((error) => {
    console.log("Error when connecting to database : ", error);
    console.log("ddd ", mongoURL);
});

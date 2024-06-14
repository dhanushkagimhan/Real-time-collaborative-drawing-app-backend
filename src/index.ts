import mongoose from "mongoose";
import "dotenv/config";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import router from "./routes";

const mongoURL: string =
  process.env.MONGO_URL ??
  "mongodb://127.0.0.1:27017/real-time-collaborative-drawer";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Database connected!");
    startServer();
  })
  .catch((error) => {
    console.log("Error when connecting the database : ", error);
  });

const startServer = (): void => {
  const app: Application = express();
  const PORT: string | number = process.env.PORT ?? 9090;

  const corOptions = {
    origin: "*",
    methods: "GET,PATCH,POST,DELETE",
  };

  app.use(cors(corOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello from API Services!" });
  });

  app.use("/v1", router);

  try {
    app.listen(PORT, () => {
      console.log(`Server is listening PORT: ${PORT}`);
    });
  } catch (error: any) {
    console.log(`Error occurred when server starting: ${error.message}`);
  }
};

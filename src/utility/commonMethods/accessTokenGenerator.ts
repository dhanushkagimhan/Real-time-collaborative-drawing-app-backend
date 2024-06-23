import { SECRET_KEY } from "../../middleware/auth";
import jwt from "jsonwebtoken";

type TokenBody = {
  email: string;
};

const accessTokenGenerate = (uEmail: string): string => {
  const tokenBody: TokenBody = { email: uEmail };

  const accessToken: string = jwt.sign(tokenBody, SECRET_KEY, {
    expiresIn: "1h",
  });

  return accessToken;
};

export default accessTokenGenerate;

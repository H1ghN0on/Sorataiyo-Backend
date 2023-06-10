import jwt from "jsonwebtoken";
import { UserType } from "../controllers/UserController";

const createJWToken = (user: UserType): string => {
  const token = jwt.sign(
    {
      data: user,
    },
    process.env.JWT_SECRET_KEY || "",
    {
      expiresIn: process.env.JWT_MAX_AGE,
      algorithm: "HS256",
    }
  );

  return token;
};

export default createJWToken;

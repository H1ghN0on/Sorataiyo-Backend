import { UserType } from "../controllers/UserController";

declare global {
  namespace Express {
    interface User {
      data: UserType;
    }
  }
}

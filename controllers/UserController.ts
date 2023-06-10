import express from "express";
import createJWToken from "../utils/createJWToken";

const { User } = require("../models");

export type UserType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  token: string;
};

interface ICheckEmailExistenceResult {
  status: boolean;
}

interface IRegisterResult {
  status: boolean;
  user: UserType | null;
  message: "" | "Error occured";
}

interface ILoginResult {
  status: boolean;
  user: UserType | null;
  message: "" | "Error occured";
}

const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return { status: true };
    }
  } finally {
    return { status: false };
  }
};

const addUser = async (user: Omit<UserType, "token">): Promise<[boolean, UserType | null]> => {
  const { lastName, firstName, password, email } = user;
  try {
    const user = await User.create({
      firstName,
      lastName,
      password,
      email,
      status: "user",
    });
    if (!user) return [false, null];
    const token = createJWToken(user);
    return [
      true,
      {
        ...user.dataValues,
        token,
      },
    ];
  } catch (e) {
    console.log(e);
    return [false, null];
  }
};

const findUser = async (email: string, password: string): Promise<[boolean, UserType | null]> => {
  try {
    const user = await User.findOne({
      where: { email, password },
    });
    if (!user) return [false, null];
    const token = createJWToken(user);
    return [
      true,
      {
        ...user.dataValues,
        token,
      },
    ];
  } catch (e) {
    console.log(e);
    return [false, null];
  }
};

class UserController {
  getMe(req: express.Request, res: express.Response) {
    res.json(req.user);
  }

  async checkEmailExistence(req: express.Request, res: express.Response) {
    const result: ICheckEmailExistenceResult = await getUserByEmail(req.body.email);
    res.send(result);
  }

  async registerUser(req: express.Request, res: express.Response) {
    const { email, password, firstName, lastName } = req.body;
    const [status, user] = await addUser({
      firstName,
      lastName,
      password,
      email,
    });

    const result: IRegisterResult = {
      status,
      user,
      message: status ? "" : "Error occured",
    };
    res.send(result);
  }

  async loginUser(req: express.Request, res: express.Response) {
    const { email, password } = req.body;
    const [status, user] = await findUser(email, password);

    const result: ILoginResult = {
      status,
      user,
      message: status ? "" : "Error occured",
    };
    res.send(result);
  }
}

export default new UserController();

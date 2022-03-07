import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models";
import { BadRequestError } from "../errors";
import jwt from "jsonwebtoken";
import { env } from "../constants";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("register req =>", req.body);
    const { name, email, password } = req.body;
    const existing = await User.findOne({ where: { email } });

    if (existing) {
      throw new BadRequestError("Email already exists");
    }

    const hashed = await bcrypt.hash(password, 15);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const userDetails = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(userDetails, env.jwtSecret, { expiresIn: "1d" });
    return res.status(200).send({ token, user: userDetails });
  } catch (err: any) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestError("Email does not exists");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new BadRequestError("Invalid Credentials");
    }

    const userDetails = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(userDetails, env.jwtSecret, { expiresIn: "1d" });
    return res.status(200).send({ token, user: userDetails });
  } catch (err: any) {
    next(err);
  }
};

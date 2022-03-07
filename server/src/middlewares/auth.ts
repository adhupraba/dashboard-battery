import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthorizedRequestError } from "../errors";
import jwt from "jsonwebtoken";
import { env } from "../constants";

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  console.log({ header });
  const token = header?.split(" ")[1];

  if (!token) {
    throw new UnauthorizedRequestError();
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, env.jwtSecret);
  } catch (err) {
    throw new BadRequestError("Invalid token");
  }

  next();
};

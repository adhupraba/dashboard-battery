import { Sequelize } from "sequelize-typescript";
import { env } from "../constants";
import { Alert, User } from "../models";

export const dbConn = new Sequelize({
  dialect: "postgres",
  host: env.dbHost,
  username: env.dbUser,
  password: env.dbPwd,
  database: env.dbName,
  logging: false,
  models: [User, Alert],
});

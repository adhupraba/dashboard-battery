require("dotenv").config();

export const env = {
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPwd: process.env.DB_PWD,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET || "",
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
};

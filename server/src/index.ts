import "reflect-metadata";
import express from "express";
import path from "path";
import routes from "./routes";
import { env } from "./constants";
import { dbConn } from "./utils";
import { errorHandler } from "./middlewares";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);
app.use(errorHandler);

if (env.nodeEnv === "production") {
  app.use("/", express.static(path.join(__dirname, "public")));
}

const startServer = async (): Promise<void> => {
  try {
    await dbConn.sync();
    const PORT = env.port;

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void startServer();

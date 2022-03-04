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

if (env.nodeEnv === "production") {
  app.use(express.static("client/build"));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/api", routes);
app.use(errorHandler);

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

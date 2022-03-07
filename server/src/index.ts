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

if (env.nodeEnv === "production") {
  const buildPath = path.normalize(path.join(__dirname, "public"));
  app.use(express.static(buildPath));
  app.get("(/*)?", (req, res) => {
    return res.sendFile(path.join(buildPath, "index.html"));
  });
}

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

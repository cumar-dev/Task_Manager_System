import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./Utils/Swagger.js";
import { errorHandler } from "./Middlewares/errorHandler.js";
import authRout from "./Router/Auth.js";
import adminRout from "./Router/Admin.js";
import uploadRout from "./Router/Upload.js";
import taskRout from "./Router/Task.js";
import { limiter } from "./Middlewares/rateLimiter.js";
// files needs to have when you are making a production
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
// mongoose.set("sanitizeFilter", true);
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(helmet());
app.use(limiter);
app.use(compression());
app.use("/api/auth", authRout);
app.use("/api/admin", adminRout);
app.use("/api/upload", uploadRout);
app.use("/api/tasks", taskRout);
app.use("/api/test", (req, res) => {
  res.send("API is running");
});

// production code
if (process.env.NODE_ENV === "production") {
  const _dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(_dirname, "../Frontend/dist")));

  // serve the frontend app

  app.get(/.*/, (req, res) => {
    res.send(path.join(_dirname, "..", "Frontend", "dist", "index.html"));
  });
}
app.use(errorHandler);

mongoose
  .connect(
    process.env.NODE_ENV == "development"
      ? process.env.MONGO_URL_DEV
      : process.env.MONGO_URL_PRO,
  )
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(
        `🚀 server at http://localhost:${PORT} connected successfully`,
      );
    });
  })
  .catch((error) => {
    console.error("❌ DB connection error:", error);
  });

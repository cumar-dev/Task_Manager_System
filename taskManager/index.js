import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './Utils/swagger.js';
import { errorHandler } from "./Middlewares/errorHandler.js";
import authRout from "./Router/Auth.js";
import adminRout from "./Router/Admin.js";
import uploadRout from "./Router/Upload.js"
import taskRout from "./Router/Task.js"
import { limiter } from "./Middlewares/rateLimiter.js";
dotenv.config();
mongoose.set("sanitizeFilter", true);
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.LOCAL_HOST],
  credentials: true
}));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(helmet());
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 min
//   max: 100
// });
app.use(limiter);
app.use(compression());
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRout);
app.use("/admin", adminRout);
app.use("/upload", uploadRout);
app.use("/tasks", taskRout);
app.use(errorHandler);

mongoose
  .connect(process.env.NODE_ENV == "development" ? process.env.MONGO_URL_DEV : process.env.MONGO_URL_PRO)
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
}
);    

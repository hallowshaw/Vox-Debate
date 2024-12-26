import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import debateRouter from "./routes/service.routes.js";

const app = express();

// Fetch allowed origins from environment variable
const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps, Postman, curl)
      if (!origin) return callback(null, true);

      // Check if the origin is allowed
      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials to be included in the request
  })
);

// Configurations for different types of data acceptance
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/services", debateRouter);

export { app };

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

const app = express();

// Security & Basic Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "DevLinks API is running..." });
});

export default app;
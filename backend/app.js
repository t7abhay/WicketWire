import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import session from "express-session";
import cors from "cors";
import memorystore from "memorystore";

const MemoryStore = memorystore(session);

export const app = express();
const corsConfig = {
  origin: process.env.FRONTEND_URL,

  credentials: true,

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(morgan("dev"));

app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Rate limited ⏱",
});

const isProduction = process.env.NODE_ENV === "production";
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({ checkPeriod: 86400000 }),
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    },
  })
);

app.use(limiter);

// Route Imports
import liveFeedRouter from "./src/routes/cricket.routes.js";
import cricketRouter from "./src/routes/cricket.routes.js";

app.use("/api/v1", cricketRouter);
app.use("/api/v1", liveFeedRouter);

export default app;

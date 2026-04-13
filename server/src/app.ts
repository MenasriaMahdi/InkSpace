import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.route";
import commentRoutes from "./routes/comment.route";
import tagRoutes from "./routes/tag.routes";

const app: Express = express();

// Security & logging middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite dev server
  credentials: true, // Allow cookies/auth headers
}));

app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Routes will go here
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", commentRoutes);
app.use("/api/tags", tagRoutes);  // ← ADD THIS


// Error handling (must be last)
app.use(errorHandler);
app.use(notFound);

export default app;

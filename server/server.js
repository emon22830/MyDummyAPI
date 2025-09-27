import express from "express";
import cors from "cors";

import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import commentsRoute from "./routes/comments.js";
import todosRoute from "./routes/todos.js";

const app = express();

// Trust proxy headers so correct domain shows up
app.set("trust proxy", true);

app.use(cors());
app.use(express.json());

// Attach base URL
app.use((req, res, next) => {
  const proto = req.headers["x-forwarded-proto"] || req.protocol;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  req.baseUrlFull = `${proto}://${host}`;
  next();
});

// API routes
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/todos", todosRoute);

// Health check
app.get("/api", (req, res) => {
  res.json({
    activeStatus: true,
    error: false,
    apiBase: `${req.baseUrlFull}/api`
  });
});

export default app; // for Vercel

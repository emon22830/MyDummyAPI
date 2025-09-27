import express from "express";
import cors from "cors";

import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import commentsRoute from "./routes/comments.js";
import todosRoute from "./routes/todos.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy headers (important when running behind Vercel)
app.set("trust proxy", true);

app.use(cors());
app.use(express.json());

// Middleware: build base URL (works in both local + Vercel)
app.use((req, res, next) => {
  const proto = req.headers["x-forwarded-proto"] || req.protocol;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  req.baseUrlFull = `${proto}://${host}`;
  next();
});

// Routes under /api
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/todos", todosRoute);

// Health check
app.get("/api", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
    apiBase: `${req.baseUrlFull}/api`,
  });
});

// Start server (local only, Vercel will handle in prod)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 MyDummyAPI running at http://localhost:${PORT}`);
  });
}

export default app; // Required for Vercel

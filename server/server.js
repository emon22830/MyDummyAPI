import express from "express";
import cors from "cors";

import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import commentsRoute from "./routes/comments.js";
import todosRoute from "./routes/todos.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// API Routes (all prefixed with /api)
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/todos", todosRoute);

// Root health check
app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
    message: "✅ MyDummyAPI is running. Use /api/... endpoints."
  });
});

app.listen(PORT, () => {
  console.log(`🚀 MyDummyAPI running at http://localhost:${PORT}`);
});

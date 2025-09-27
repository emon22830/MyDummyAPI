import express from "express";
import { generatePosts } from "../data/fakePosts.js";

const router = express.Router();
let posts = generatePosts(100);

// Helper: attach self-link
const withUrl = (req, post) => ({
  ...post,
  url: `${req.baseUrlFull}/api/posts/${post.id}`,
});

// GET all posts
router.get("/", (req, res) => {
  res.json(posts.map(p => withUrl(req, p)));
});

// GET post by id
router.get("/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  post ? res.json(withUrl(req, post)) : res.status(404).json({ error: "Post not found" });
});

// POST new post
router.post("/", (req, res) => {
  const newPost = { id: posts.length + 1, ...req.body };
  posts.push(newPost);
  res.status(201).json(withUrl(req, newPost));
});

// PUT update post
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    posts[index] = { id, ...req.body };
    res.json(withUrl(req, posts[index]));
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

// PATCH post
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (post) {
    Object.assign(post, req.body);
    res.json(withUrl(req, post));
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

// DELETE post
router.delete("/:id", (req, res) => {
  const exists = posts.some(p => p.id === parseInt(req.params.id));
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  if (!exists) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json({ message: "Post deleted" });
});

export default router;

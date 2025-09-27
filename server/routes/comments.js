import express from "express";
import { generateComments } from "../data/fakeComments.js";

const router = express.Router();
let comments = generateComments(200);

// Helper to attach self-link
const withUrl = (req, comment) => ({
  ...comment,
  url: `${req.baseUrlFull}/api/comments/${comment.id}`,
});

// GET all comments
router.get("/", (req, res) => {
  res.json(comments.map(c => withUrl(req, c)));
});

// GET comment by id
router.get("/:id", (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  comment ? res.json(withUrl(req, comment)) : res.status(404).json({ error: "Comment not found" });
});

// POST new comment
router.post("/", (req, res) => {
  const newComment = { id: comments.length + 1, ...req.body };
  comments.push(newComment);
  res.status(201).json(withUrl(req, newComment));
});

// PUT comment
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex(c => c.id === id);
  if (index !== -1) {
    comments[index] = { id, ...req.body };
    res.json(withUrl(req, comments[index]));
  } else {
    res.status(404).json({ error: "Comment not found" });
  }
});

// PATCH comment
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find(c => c.id === id);
  if (comment) {
    Object.assign(comment, req.body);
    res.json(withUrl(req, comment));
  } else {
    res.status(404).json({ error: "Comment not found" });
  }
});

// DELETE comment
router.delete("/:id", (req, res) => {
  const exists = comments.some(c => c.id === parseInt(req.params.id));
  comments = comments.filter(c => c.id !== parseInt(req.params.id));
  if (!exists) {
    return res.status(404).json({ error: "Comment not found" });
  }
  res.json({ message: "Comment deleted" });
});

export default router;

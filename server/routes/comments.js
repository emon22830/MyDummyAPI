import express from "express";
import { generateComments } from "../data/fakeComments.js";

const router = express.Router();
let comments = generateComments(200);

// GET all comments
router.get("/", (req, res) => res.json(comments));

// GET comment by id
router.get("/:id", (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  comment ? res.json(comment) : res.status(404).json({ error: "Comment not found" });
});

// POST new comment
router.post("/", (req, res) => {
  const newComment = { id: comments.length + 1, ...req.body };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// PUT comment
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex(c => c.id === id);
  if (index !== -1) {
    comments[index] = { id, ...req.body };
    res.json(comments[index]);
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
    res.json(comment);
  } else {
    res.status(404).json({ error: "Comment not found" });
  }
});

// DELETE comment
router.delete("/:id", (req, res) => {
  comments = comments.filter(c => c.id !== parseInt(req.params.id));
  res.json({ message: "Comment deleted" });
});

export default router;

import express from "express";
import { generateUsers } from "../data/fakeUsers.js";

const router = express.Router();
let users = generateUsers(50);

// Helper to attach self-link
const withUrl = (req, user) => ({
  ...user,
  url: `${req.baseUrlFull}/api/users/${user.id}`,
});

// GET all users
router.get("/", (req, res) => {
  res.json(users.map(user => withUrl(req, user)));
});

// GET user by id
router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(withUrl(req, user));
});

// POST new user
router.post("/", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(withUrl(req, newUser));
});

// PUT update user
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { id, ...req.body };
    res.json(withUrl(req, users[index]));
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// PATCH update partially
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    Object.assign(user, req.body);
    res.json(withUrl(req, user));
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// DELETE user
router.delete("/:id", (req, res) => {
  const exists = users.some(u => u.id === parseInt(req.params.id));
  users = users.filter(u => u.id !== parseInt(req.params.id));
  if (!exists) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ message: "User deleted" });
});

export default router;

import express from "express";
import { generateTodos } from "../data/fakeTodos.js";

const router = express.Router();
let todos = generateTodos(100);

// Helper: attach self-link
const withUrl = (req, todo) => ({
  ...todo,
  url: `${req.baseUrlFull}/api/todos/${todo.id}`,
});

// GET all todos
router.get("/", (req, res) => {
  res.json(todos.map(t => withUrl(req, t)));
});

// GET todo by id
router.get("/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  todo ? res.json(withUrl(req, todo)) : res.status(404).json({ error: "Todo not found" });
});

// POST new todo
router.post("/", (req, res) => {
  const newTodo = { id: todos.length + 1, ...req.body };
  todos.push(newTodo);
  res.status(201).json(withUrl(req, newTodo));
});

// PUT todo
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos[index] = { id, ...req.body };
    res.json(withUrl(req, todos[index]));
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// PATCH todo
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (todo) {
    Object.assign(todo, req.body);
    res.json(withUrl(req, todo));
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// DELETE todo
router.delete("/:id", (req, res) => {
  const exists = todos.some(t => t.id === parseInt(req.params.id));
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  if (!exists) {
    return res.status(404).json({ error: "Todo not found" });
  }
  res.json({ message: "Todo deleted" });
});

export default router;

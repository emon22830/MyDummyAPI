import express from "express";
import { generateTodos } from "../data/fakeTodos.js";

const router = express.Router();
let todos = generateTodos(100);

// GET all todos
router.get("/", (req, res) => res.json(todos));

// GET todo by id
router.get("/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  todo ? res.json(todo) : res.status(404).json({ error: "Todo not found" });
});

// POST new todo
router.post("/", (req, res) => {
  const newTodo = { id: todos.length + 1, ...req.body };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT todo
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos[index] = { id, ...req.body };
    res.json(todos[index]);
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
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// DELETE todo
router.delete("/:id", (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: "Todo deleted" });
});

export default router;

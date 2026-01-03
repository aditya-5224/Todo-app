import express from "express";
import Todo from "../models/todo.model.js";

const router = express.Router();

/* ✅ GET /api/todos */
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ✅ POST /api/todos */
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
});

/* ✅ PATCH /api/todos/:id */
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (req.body.text !== undefined) todo.text = req.body.text;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
});

/* ✅ DELETE /api/todos/:id */
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;

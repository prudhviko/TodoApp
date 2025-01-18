const express = require("express");
const {
  createTodo,
  getUserTodos,
  updateTodo,
  deleteTodo,
  getTodo,
} = require("../controllers/todoController");

const middleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Protect all routes with the auth middleware
router.use(middleware);

// Routes
router.post("/", createTodo); // Create a new todo
router.get("/", getUserTodos); // Get all todos for the logged-in user
router.get("/:id", getTodo); // Get a specific todo
router.put("/:id", updateTodo); // Update a specific todo
router.delete("/:id", deleteTodo); // Delete a specific todo

module.exports = router;

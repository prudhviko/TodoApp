const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const userId = req.user.id;
    const todo = new Todo({
      title,
      description,
      dueDate,
      priority,
      user: userId,
    });
    await todo.save();
    res.status(201).json({ message: "success", todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await Todo.find({ user: userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, completed, priority } = req.body;

    const todo = await Todo.findOne({ _id: id, user: req.user.id });
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or not authorized" });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.dueDate = dueDate || todo.dueDate;
    todo.completed = completed !== undefined ? completed : todo.completed;
    todo.priority = priority || todo.priority;
    todo.updatedAt = new Date();

    const updatedTodo = await todo.save();
    res
      .status(200)
      .json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or not authorized" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id, user: req.user.id });
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or not authorized" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

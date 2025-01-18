import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { getTodos, deleteTodo, updateTodo } from "../services/todoApi";
import { showToast } from "../utils/toast";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getTodos(localStorage.getItem("token"));
      setTodos(data); // Update state with fetched todos
    } catch (error) {
      console.error("Error fetching todos:", error);
      showToast.error("Failed to fetch todos. Please try again.");
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, []);

  const handleEdit = (updatedTodo) => {
    updateTodo(updatedTodo, localStorage.getItem("token"))
      .then(() => {
        showToast.success("Todo Updated Successfully");
        fetchData(); // Refresh the list to reflect the updated data
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        showToast.error("Failed to update the todo. Please try again.");
      });
  };

  const handleDelete = (id) => {
    deleteTodo(id, localStorage.getItem("token"))
      .then(() => {
        showToast.success("Todo Deleted Successfully");
        fetchData(); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
        showToast.error("Failed to delete the todo. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Todo List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo._id}
            title={todo.title}
            description={todo.description}
            dueDate={todo.dueDate}
            priority={todo.priority}
            onEdit={handleEdit} // Pass updated function
            onDelete={() => handleDelete(todo._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

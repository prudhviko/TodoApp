import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getTodos = async (token) => {
  const response = await axios.get(`${API_URL}/todos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addTodo = async (todo, token) => {
  const response = await axios.post(`${API_URL}/todos`, todo, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTodo = async (todo, token) => {
  console.log("Todo Data", todo);
  const response = await axios.put(`${API_URL}/todos/${todo.id}`, todo, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTodo = async (todoId, token) => {
  const response = await axios.delete(`${API_URL}/todos/${todoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

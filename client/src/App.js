import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import TodoForm from "./components/TodoForm";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-todo"
          element={
            <ProtectedRoute>
              <TodoForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TodoList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

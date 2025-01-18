import React, { useState } from "react";
import moment from "moment";

const TodoItem = ({
  id,
  title,
  description,
  dueDate,
  priority,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editDueDate, setEditDueDate] = useState(dueDate);
  const [editPriority, setEditPriority] = useState(priority);

  const handleEditSubmit = () => {
    onEdit({
      id,
      title: editTitle,
      description: editDescription,
      dueDate: editDueDate,
      priority: editPriority,
    });
    setIsEditing(false); // Close the modal
  };

  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{description}</p>
      <p className="text-sm text-gray-500 mb-2">
        {moment(dueDate).format("dddd, MMMM Do, YYYY")}
      </p>
      <p
        className={`inline-block rounded-full px-3 py-1 mb-2 text-sm font-semibold 
          ${
            priority === "Low"
              ? "bg-green-100 text-green-700"
              : priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : priority === "High"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
      >
        {priority}
      </p>

      <div className="flex justify-between">
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit Task</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditSubmit();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Description
                </label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={moment(editDueDate).format("YYYY-MM-DD")}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Priority
                </label>
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;

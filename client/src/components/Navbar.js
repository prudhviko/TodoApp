import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown on button click
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false); // Close dropdown if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Navbar Brand */}
        <div className="text-white text-2xl font-semibold">
          <a href="/">TodoApp</a>
        </div>
        {user && (
          <div className="relative">
            <button
              ref={profileButtonRef}
              className="flex items-center space-x-2 text-white"
              onClick={toggleDropdown} // Only toggle on click
            >
              <img
                src={`http://localhost:8000/${user.image}`}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </button>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg"
              >
                <ul className="py-2">
                  <li>
                    <Link
                      to="/add-todo"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Add Todo
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        toggleDropdown();
                      }}
                      className="block px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

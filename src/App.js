import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";

import usersData from "./users.json";

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(usersData.users);
  const [authError, setAuthError] = useState(null);

  /**
   * Handle user login attempt.
   * @param {Object} credentials - User input (username, password).
   */
  const handleLogin = ({ username, password }) => {
    const authenticatedUser = usersData.users.find(
      (user) => user.username === username && user.password === password
    );

    if (authenticatedUser) {
      setUser(authenticatedUser);
      setAuthError(null);
    } else {
      setAuthError("Invalid username/password. Please try again.");
      // Clear the error message after 5 seconds
      setTimeout(() => {
        setAuthError(null);
      }, 5000);
    }
  };

  /**
   * Handle adding a new user.
   * @param {Object} newUser - New user data.
   */
  const handleAddUser = (newUser) => {
    if (user && user.active_module === "admin") {
      setUsers([...users, newUser]);
    } else {
      alert("You do not have permission to add new users");
    }
  };
  /**
   * Get all users with active_module 'user' for admin.
   * @returns {Array} - Users with active_module 'user'.
   */
  const getAllUsers = () => {
    return users.filter((userData) => userData.active_module === "user");
  };

  return (
    <div>
      {user ? (
        <Dashboard
          user={user}
          onAddUser={handleAddUser}
          allUsers={getAllUsers()}
        />
      ) : (
        <>
          <LoginForm onLogin={handleLogin} />
          {authError && (
            <div style={{ color: "red", textAlign: "center" }}>{authError}</div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

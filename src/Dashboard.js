import React, { useState } from "react";
import "./App.css";

const Dashboard = ({ user, onAddUser, allUsers }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    active_module: "user",
  });

  const handleAddUser = () => {
    onAddUser(newUser);
    setNewUser({ username: "", password: "", active_module: "user" });
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.username}!</h1>
      <div>
        {user.active_module === "admin" ? "Dashboard" : "User"} module content
      </div>
      {user.active_module === "admin" && (
        <div>
          <div>
            <h2>All Users List</h2>
            <ul>
              {allUsers.map((userData) => (
                <li key={userData.username}>{userData.username}</li>
              ))}
            </ul>
          </div>

          <h2>Add new user</h2>
          <label>New Username</label>
          <input
            type="text"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
          <label>New Password</label>
          <input
            type="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <button onClick={handleAddUser}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

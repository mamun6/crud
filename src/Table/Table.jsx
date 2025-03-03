import React, { useState } from "react";

const CrudTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com", password: "123456" },
    { id: 2, name: "Bob", email: "bob@example.com", password: "abcdef" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Function to validate and add a new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError("All fields are required.");
      return;
    }

    setUsers([...users, { id: users.length + 1, ...newUser }]); // Sequential ID
    setNewUser({ name: "", email: "", password: "" });
    setError("");
  };

  // Function to update user details
  const handleEditUser = (id, field, value) => {
    setUsers(users.map(user => (user.id === id ? { ...user, [field]: value } : user)));
  };

  // Function to delete a user
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id).map((user, index) => ({ ...user, id: index + 1 }))); // Reorder IDs
  };

  // Function to filter users
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Search By Name</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name "
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add User Form */}
      <div className="form-container">
        <h3>Add New User</h3>
        {error && <p className="error">{error}</p>}
        
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter secure password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
        </div>

        <button className="btn-add" onClick={handleAddUser}>Add User</button>
      </div>

      {/* Users Table */}
      <table>
        <thead>
          <tr>
            <th>SL NO.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleEditUser(user.id, "name", e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => handleEditUser(user.id, "email", e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="password"
                    value={user.password}
                    onChange={(e) => handleEditUser(user.id, "password", e.target.value)}
                  />
                ) : (
                  "********"
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <button onClick={() => setEditingUserId(null)}>Save</button>
                ) : (
                  <button onClick={() => setEditingUserId(user.id)}>Edit</button>
                )}
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="5" className="no-results">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;

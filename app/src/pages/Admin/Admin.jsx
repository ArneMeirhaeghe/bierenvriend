import React, { useState, useEffect } from "react";
import { useProducts } from "../../contexts/ProductContext";
import style from "./Admin.module.css";

function Admin() {
  const { allUsers, authService, setError, editUser } = useProducts();
  const [isEditing, setIsEditing] = useState(null);
  const [editedUser, setEditedUser] = useState({ username: "", role: "" });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(allUsers);
    if (allUsers) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  const handleEdit = (user) => {
    setIsEditing(user.id);
    setEditedUser({ username: user.username, role: user.role });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log(isEditing);
    console.log(editedUser);
    try {
      editUser(isEditing, editedUser);
      setIsEditing(null);
    } catch (err) {
      setError(err.message);
    }
    location.reload();
  };

  return (
    <div className={style.admin}>
      <h1>Admin Panel</h1>
      <table className={style.adminTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {isEditing === user.id ? (
                    <input
                      type="text"
                      name="username"
                      value={editedUser.username}
                      onChange={handleChange}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {isEditing === user.id ? (
                    <select
                      name="role"
                      value={editedUser.role}
                      onChange={handleChange}
                    >
                      <option value="koper">Koper</option>
                      <option value="admin">Admin</option>
                      <option value="verkoper">Verkoper</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {isEditing === user.id ? (
                    <button onClick={handleSave}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(user)}>Edit</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading users...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;

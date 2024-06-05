import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import styles from "./Profile.module.css"; // Import the CSS module
import { useProducts } from "../../contexts/ProductContext";

function Profile() {
  const { user, setUser } = useProducts();
  const [formData, setFormData] = useState(null);
  const [oldPassword, setOldPassword] = useState(""); // State for the old password

  console.log(user);
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        username: user.username,
        password: "", // Leave password fields empty initially
        passwordConfirm: "",
        name: user.name,
        role: user.role,
        emailVisibility: user.emailVisibility,
      });
    }
  }, [user]);

  if (!user || !formData) {
    return <div>Loading...</div>;
  }

  const userService = new UserService({
    user: user,
    setUser: setUser, // Zorg ervoor dat setUser wordt doorgegeven
    error: (message) => console.error(message),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await userService.updateUser(user.id, {
        ...formData,
        oldPassword: oldPassword, // Include old password in the update
      });
      setUser(updatedUser); // Update de lokale state met de nieuwe gebruikersdata
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label>Email Visibility:</label>
          <input
            type="checkbox"
            name="emailVisibility"
            checked={formData.emailVisibility}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                emailVisibility: e.target.checked,
              }))
            }
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;

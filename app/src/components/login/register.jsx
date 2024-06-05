import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import ROUTES from "../../consts/Routes";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Register = ({ authService }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("koper");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });
  const navigate = useNavigate();

  const isEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateFields = async () => {
    let newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!role) newErrors.role = "Role is required";
    if (email && !isEmail(email)) newErrors.email = "Invalid email format";
    if (password && confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!(await validateFields())) {
      return;
    }

    setIsLoading(true);
    authService
      .register({ username, password, name, email, role })
      .then((response) => {
        if (response.type === false) {
          setErrors({ general: "Registration failed" });
          setIsLoading(false);
        } else {
          navigate(ROUTES.home);
        }
      })
      .catch((error) => {
        setErrors({ general: error.message });
        setIsLoading(false);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const length = 12;
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
    setConfirmPassword(generatedPassword);
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className={style.loginContainer}>
      <h2>Register</h2>
      <form className={style.loginForm} onSubmit={handleRegister}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className={style.error}>{errors.username}</p>}

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className={style.error}>{errors.email}</p>}

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={style.dropdown}
        >
          <option value="koper">Koper</option>
          <option value="verkoper">verkoper</option>
        </select>

        <label htmlFor="password">Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className={style.error}>{errors.password}</p>}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <p className={style.error}>{errors.confirmPassword}</p>
        )}

        <label htmlFor="showPassword">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          Show Password
        </label>

        <button
          type="button"
          onClick={generatePassword}
          className={style.form_button}
        >
          Generate Password
        </button>

        {errors.general && <p className={style.error}>{errors.general}</p>}

        <button type="submit" className={style.form_button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

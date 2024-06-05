import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import ROUTES from "../../consts/Routes";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Login = ({ authService }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    authService
      .login(username, password)
      .then((response) => handleResponse(response));
  };

  const handleResponse = (response) => {
    if (response?.type === false && response.message) {
      setError(response.message);
    } else {
      navigate(ROUTES.home);
    }
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className={style.loginContainer}>
      <h2>Login</h2>
      <form className={style.loginForm} onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="showPassword">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          Show Password
        </label>

        {error && <p className={style.error}>{error}</p>}

        <button type="submit" className={style.form_button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

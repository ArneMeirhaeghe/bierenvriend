import React, { useState } from "react";
import style from "./LoginAndRegister.module.css";
import Login from "../../components/login/login";
import Register from "../../components/login/register";

const LoginAndRegister = ({ authService }) => {
  const [selectedOption, setSelectedOption] = useState("login");

  return (
    <div className={style.authContainer}>
      <div className={style.radioGroup}>
        <input
          type="radio"
          id="login"
          name="auth"
          value="login"
          checked={selectedOption === "login"}
          onChange={() => setSelectedOption("login")}
          className={style.radioInput}
        />
        <label htmlFor="login" className={style.radioLabel}>
          Login
        </label>
        <input
          type="radio"
          id="register"
          name="auth"
          value="register"
          checked={selectedOption === "register"}
          onChange={() => setSelectedOption("register")}
          className={style.radioInput}
        />
        <label htmlFor="register" className={style.radioLabel}>
          Register
        </label>
      </div>
      {selectedOption === "login" && (
        <div>
          <Login authService={authService} />
        </div>
      )}
      {selectedOption === "register" && (
        <div>
          <Register authService={authService} />
        </div>
      )}
    </div>
  );
};

export default LoginAndRegister;

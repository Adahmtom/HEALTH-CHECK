import React, { useState } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import HealthCheckLogo from "../../assets/plus.png";
import { useLogin } from "./hooks";
import { useIsMutating } from "@tanstack/react-query";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const { mutate, reset, isSuccess } = useLogin();
  const isLoading = useIsMutating();

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData);
  };

  if (isSuccess) {
    reset();
    navigate("/app/dashboard");
  }

  return (
    <div className={styles.App}>
      <div className={styles.logo}>
        <Link to="/">
          {" "}
          <img src={HealthCheckLogo} alt="aa-rano-logo" />
        </Link>
      </div>
      <div className={styles.header}>Welcome Back!</div>
      <p className={styles.description}>It’s nice seeing you again</p>
      <form className={styles["form-container"]} onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <div className={styles["input-container"]}>
            <input
              className={styles["email-input"]}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className={styles["form-group"]}>
          <div className={styles["input-container"]}>
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button
          className={styles["submit-button"]}
          disabled={isLoading ? true : false}
          type="submit"
        >
          {isLoading ? "loading" : "Sign in"}
        </button>
      </form>

      <div className={styles["register-text"]}>
        Forgot your password ?<Link to="/forgot-password"> Click Here </Link>
      </div>
      <div className={styles["register-text"]}>
        Not registered yet? <Link to="/">Register now</Link>
      </div>
    </div>
  );
}

export default Login;

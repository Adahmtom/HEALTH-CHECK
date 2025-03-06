import React, { useState } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import HealthCheckLogo from "../../assets/plus.png";
import { useResetPassword } from "./hooks";
import { errorAlert } from "../../utils";

function ResetPassword() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('');
  const {id} = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const {mutate,isError,error,reset,isSuccess} = useResetPassword()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordMsg("Passwords do not match. Please check.");
    } else {
      setConfirmPasswordMsg("");
      const data = { ...formData, token: id };
      mutate(data)
    }
  };

  if (isSuccess) {
    reset();
    navigate("/login");
  }
  if (isError) {
    errorAlert(error)
    reset(); 
  }

  return (
    <div className={styles.App}>
         <div className={styles.logo}><Link to="/"> <img src={HealthCheckLogo} alt="aa-rano-logo" /></Link></div>
      <div className={styles.header}>Welcome Back!</div>
      <p className={styles.description}>Let's help you recover your account</p>
      <form className={styles["form-container"]} onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <div className={styles["input-container"]}>
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Enter your new password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {confirmPasswordMsg && (
          <p style={{ color: "red" }}>
            Confirm Password does not match with password please check
          </p>
        )}
        <div className={styles["form-group"]}>
          <div className={styles["input-container"]}>
            <input
              className={styles.input}
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <button className={styles["submit-button"]} type="submit">
          Submit
        </button>
      </form>
      <div className={styles["register-text"]}>
        Remember Password? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default ResetPassword;

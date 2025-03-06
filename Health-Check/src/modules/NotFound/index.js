import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import "../../shared/button.css";

const NotFound = () => {
  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div>
        <h1>PAGE NOT FOUND</h1>
        <h2>You probably entered a wrong url</h2>
      </div>
      <div className={styles.btnContainer}>
        <button className="btn btnGreen" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;

import React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const CustomCard = (props) => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true });
  

  const gotoRegister = () => {
    navigate(props.registrationPath || "/");
  };

  const buttonStyle = {
    backgroundColor: props.titleColor || "blue", // Default background color
    color: "white",
    width: "100%",
    font: "1rem",
    border: "none",
    padding: "0.6rem 1.3rem",
  };

  const cardAnimationStyle = {
    transform: inView ? "translateX(0)" : "translateX(100%)", 
    transition: "transform 1s ease-out", 
  };

  return (
    <div className={styles.customCard} style={cardAnimationStyle} ref={ref}>
      <div className={styles.cardTitle}>
      <h2>Let’s get you started as</h2>
      <h1 style={{ color: props.titleColor || "blue" }}>{props.title}</h1>
      <p>{props.content}</p>
      </div>
      

      <button style={buttonStyle} onClick={gotoRegister}>
        Proceed
      </button>
    </div>
  );
};

export default CustomCard;

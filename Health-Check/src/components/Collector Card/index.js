import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const CollectorCard = ({
  title,
  patient_name,
  patient_location,
  id,
  linkTo,
}) => {
  return (
    <div className={styles.card}>
      <h1> {title}</h1>
      <h3>Patient's Name</h3>
      <p>{patient_name}</p>
      <h3>Location</h3>
      <p>{patient_location}</p>

      <Link to={linkTo}>
        <h2>View Details</h2>
      </Link>
    </div>
  );
};

export default CollectorCard;

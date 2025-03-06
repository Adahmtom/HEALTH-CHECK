import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const SampleCollectorCard = ({
  title,
  patient_num,
  patient_location,
  id,
  linkTo,
}) => {
  return (
    <div className={styles.card}>
      <h1> {title}</h1>
      <h3>Phone Number</h3>
      <p>{patient_num}</p>
      <h3>Location</h3>
      <p>{patient_location}</p>

      <Link to={linkTo}>
        <h2>View Details</h2>
      </Link>
    </div>
  );
};

export default SampleCollectorCard;

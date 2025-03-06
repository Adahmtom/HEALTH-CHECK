import React from "react";
import styles from "./styles.module.css";

const AvailableOrderCard = ({
  title,
  patient_name,
  patient_location,
  setFormData, // This is a prop function
  formData, 
  open,
  setOpen,    // This should be the current collectorID value
  ID
}) => {
  const handleClick = () => {
    // Call the prop function to update collectorID
    setFormData({
        location: patient_location,
        phone:patient_name,
        name:title,
        id:ID

    })
    setOpen(true)
  };

 
    if (patient_name && patient_location) {
        return (
          <div className={styles.card} onClick={handleClick}>
            
            <h1>{title}</h1>
            <h3>Lab Contact Number</h3>
            <p>{patient_name}</p>
            <h3>Location</h3>
            <p>{patient_location}</p>
            
          </div>
        );
      } else {
        // If either patient_name or patient_location is empty, return null (or you can return a message)
        return null;
      
      }
};

export default AvailableOrderCard;
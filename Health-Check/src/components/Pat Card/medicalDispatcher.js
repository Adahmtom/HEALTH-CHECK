import React from "react";
import styles from "./styles.module.css";

const MedicalDispacther = ({
  fullname,
  address,
  DOB,
  test,
  phone,
  appointmentDate,
  email,
  appointmentTime,
}) => {
  return (
    <div className="topMargin">
      <table className={`${styles.patientCard}`}>
        <div className={`${styles.patientCards}`}>
          <div>
            <tr className={`${styles.label} patient-card-label`}>
             Medical Dispatcher Name
            </tr>
            <td className={`${styles.patientInfo} patient-card-info`}>
              {fullname}
            </td>
          </div>
          <div>
            <tr className={`${styles.label} patient-card-label`}>Address</tr>
            <td className={`${styles.patientInfo} patient-card-info`}>
              {address}
            </td>
          </div>
         
          
          <div>
            <tr className={`${styles.label} patient-card-label`}>
              Contact Number
            </tr>
            <td className={`${styles.patientInfo} patient-card-info`}>
              {phone}
            </td>
          </div>
         
          
          <div>
            <tr className={`${styles.label} patient-card-label`}>
              Email Address
            </tr>
            <td className={`${styles.patientInfo} patient-card-info`}>
              {email}
            </td>
          </div>
        </div>
      </table>
    </div>
  );
};

export default MedicalDispacther;

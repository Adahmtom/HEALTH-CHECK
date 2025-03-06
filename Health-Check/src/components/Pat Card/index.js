import React from "react";
import styles from "./styles.module.css";

const PatienceCard = ({
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
              Patient Name
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
              Patient Date of Birth
            </tr>
            <td className={`${styles.patientInfo} patient-card-info`}>{DOB}</td>
          </div>
          <div>
            <tr className={`${styles.label} patient-card-label`}>Test Type</tr>
            <td className={`${styles.patientInfo} patient-card-info`}>
              {test}
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
              Preferred Date
            </tr>
            <td className={`${styles.patientInfo} patient-card-info`}>
              {appointmentDate}
            </td>
          </div>
          <div>
            <tr className={`${styles.label} patient-card-label`}>
              Preferred Time
            </tr>
            <td className={`${styles.patientInfo} patient-card-info`}>
              {appointmentTime}
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

export default PatienceCard;

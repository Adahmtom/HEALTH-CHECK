import React from "react";
import styles from "./styles.module.css";

const UsersCard = ({
  fullname,
  role,
  phone,
  email,
  address,
  gender,
  emergencyPhone,
  DOB,
}) => {
  return (
    <div className="topMargin">
      <table className={`${styles.patientCard}`}>
        <div className={`${styles.patientCards}`}>
          <div>
            <tr className={`${styles.label} patient-card-label`}>Full Name</tr>
            <td className={`${styles.patientInfo} patient-card-info`}>
              {fullname}
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
          <div>
            <tr className={`${styles.label} patient-card-label`}>
              Contact Address
            </tr>
            <td className={`${styles.patientInfo} patient-card-info`}>
              {address}
            </td>
          </div>
          <div>
            <tr className={`${styles.label} patient-card-label`}>Gender</tr>
            <td className={`${styles.patientInfo} patient-card-info`}>
              {gender}
            </td>
          </div>
          <div>
            <tr className={`${styles.label} patient-card-label`}>
              Emergency Contact
            </tr>
            <td className={`${styles.patientInfo} patient-card-info`}>
              {emergencyPhone}
            </td>
          </div>
          <div>
            <tr className={`${styles.label} patient-card-label`}>
              Date of Birth
            </tr>
            <td className={`${styles.patientInfo} patient-card-info`}>{DOB}</td>
          </div>
          <div>
            <tr className={`${styles.label} patient-card-label`}>Role</tr>
            <td className={`${styles.patientInfo} patient-card-info`}>
              {role}
            </td>
          </div>
        </div>
      </table>
    </div>
  );
};

export default UsersCard;

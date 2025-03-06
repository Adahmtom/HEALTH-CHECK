import React, { useState } from "react";
import styles from "./styles.module.css";
import { useGetMe } from "../../modules/Auth/hooks";
import { useEffect } from "react";
import { useEditMe } from "./hooks";
import { useIsMutating } from "@tanstack/react-query";
import { errorAlert, successAlert } from "../../utils";

function ProfileForm() {
  const { data } = useGetMe();
  useEffect(() => {
    setFormData(data);
  }, [data]);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    gender: "",
    address: "",
    phone: "",
    DOB: "",
    emergencyName: "",
    emergencyGender: "",
    emergencyRelation: "",
    emergencyPhone: "",
    emergencyAddress: "",
    emergencyEmail: "",
    _id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const isLoading = useIsMutating();

  const { mutate, isSuccess, isError, reset, error } = useEditMe();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  if (isSuccess) {
    reset();
    successAlert("Profile updated successfully");
  }

  if (isError) {
    reset();
    errorAlert(error);
  }

  return (
    <div className={styles["profile-form"]}>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-row"]}>
          <div className={`form-group ${styles["form-group"]}`}>
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              className={`form-control ${styles["form-control"]}`} // Use CSS Modules for styling
              name="fullname"
              value={formData?.fullname}
              onChange={handleInputChange}
            />
          </div>
          <div className={`form-group ${styles["form-group"]}`}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className={`form-control ${styles["form-control"]}`} // Use CSS Modules for styling
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              disabled={true}
            />
          </div>
        </div>

        <div className={styles["form-row"]}>
          <div className={`form-group ${styles["form-group"]}`}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className={`form-control ${styles["form-control"]}`} // Use CSS Modules for styling
              name="gender"
              value={formData?.gender}
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={`form-group ${styles["form-group"]}`}>
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              className={`form-control ${styles["form-control"]}`} // Use CSS Modules for styling
              name="address"
              value={formData?.address}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <div className={styles["form-row"]}>
          <div className={`form-group ${styles["form-group"]}`}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className={`form-control ${styles["form-control"]}`} // Use CSS Modules for styling
              name="phone"
              value={formData?.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className={`form-group ${styles["form-group"]}`}>
            <label htmlFor="DOB">Date of Birth</label>
            <input
              type="date"
              id="DOB"
              className={`form-control ${styles["form-control"]}`} // Use CSS Modules for styling
              name="DOB"
              value={formData?.DOB}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.header}>Emergency Information</div>
        <div className={styles["form-row"]}>
          <div className={`form-group ${styles["form-group"]}`}>
            <label htmlFor="emergencyName">Emergency Contact Name</label>
            <input
              type="text"
              id="emergencyName"
              className={`form-control ${styles["form-control"]}`} // Use CSS Modules for styling
              name="emergencyName"
              value={formData?.emergencyName}
              onChange={handleInputChange}
            />
          </div>
          <div className={`form-group ${styles["form-group"]}`}>
            <label htmlFor="emergencyGender">Emergency Contact Gender</label>
            <select
              id="emergencyGender"
              className={`form-control ${styles["form-control"]}`} // Use CSS Modules for styling
              name="emergencyGender"
              value={formData?.emergencyGender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className={styles["form-row"]}>
          <div className={`form-group ${styles["form-group"]}`}>
            <label htmlFor="emergencyEmail">Emergency Contact Email</label>
            <input
              type="email"
              id="emergencyEmail"
              className={`form-control ${styles["form-control"]}`} // Use CSS Modules for styling
              name="emergencyEmail"
              value={formData?.emergencyEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className={`form-group ${styles["form-group"]}`}>
            <label htmlFor="emergencyRelation">
              Emergency Contact Relation
            </label>
            <input
              type="text"
              id="emergencyRelation"
              className={`form-control ${styles["form-control"]}`} // Use CSS Modules for styling
              name="emergencyRelation"
              value={formData?.emergencyRelation}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles["form-row"]}>
          <div className={`form-group ${styles["form-group"]}`}>
            <label htmlFor="emergencyPhone">
              Emergency Contact Phone Number
            </label>
            <input
              type="tel"
              id="emergencyPhone"
              className={`form-control ${styles["form-control"]}`} // Use CSS Modules for styling
              name="emergencyPhone"
              value={formData?.emergencyPhone}
              onChange={handleInputChange}
            />
          </div>
          <div className={`form-group ${styles["form-group"]}`}>
            <label htmlFor="emergencyAddress">Emergency Contact Address</label>
            <textarea
              id="emergencyAddress"
              className={`form-control ${styles["form-control"]}`} // Use CSS Modules for styling
              name="emergencyAddress"
              value={formData?.emergencyAddress}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <div className={styles["form-row"]}></div>

        <button
          type="submit"
          isabled={isLoading ? true : false}
          className={`btn btn-primary ${styles["btn-primary"]}`}
        >
          {isLoading ? "loading" : "Save"}
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;

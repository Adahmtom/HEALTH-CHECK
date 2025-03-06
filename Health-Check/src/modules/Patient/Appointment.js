import React, { useContext,useState } from "react";
import Layout from "../../layout";
import styles from "../styles.module.css";
import { useIsMutating } from "@tanstack/react-query";
import { useAddAppointment, useGetTest } from "../Admin/hooks";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import { useGetMe } from "../Auth/hooks";
import { errorProfile } from "../../utils";

const Appointment = () => {
  const allTest = useGetTest();
  const test = allTest?.data || [];
  const navigate = useNavigate();
  const me = useGetMe();
  const userme = me?.data || [];

  const { mutate } = useAddAppointment();
  const isLoading = useIsMutating();

  const [formData, setFormData] = useState({
    status: "Pending",
    test: "",
    appointmentDate: "",
    appointmentTime: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { user } = useContext(AuthContext);

  const handleTestChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const selectedTest = test.find((t) => t._id === value);
    if (selectedTest) {
      setFormData({
        ...formData,
        [name]: value,
        amount: `#${selectedTest.amount}`,
      });
    } else {
      setFormData({ ...formData, amount: 0 });
    }
  };

  const handleNavigate = () => {
    navigate("/app/patient/test/all");
  };

  const isAddressAndPhoneValid =
    userme?.address && userme?.phone ? true : false;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAddressAndPhoneValid === true) {
      const newData = { ...formData, user: user?.id };
      mutate(newData);
    } else {
      errorProfile();
    }
  };


   // Function to get the current date in the required format (YYYY-MM-DD)
function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
  // Function to get the minimum time value (current time + 30 minutes)
function getMinTime() {
  const today = new Date();
  today.setMinutes(today.getMinutes() + 30);
  return today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
 

  return (
    <Layout name="Appointment" title="Schedule Appointment">
      <div className={styles.container}>
        <h3>Kindly schedule a convenient time</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.profileform}>
            <div className={styles.formgroup}>
              <label htmlFor="amount">Test Name</label>

              <select
                className={styles.formcontrol}
                id="test"
                name="test"
                value={formData.test}
                onChange={handleTestChange}
              >
                <option value="">Select Test Type</option>
                {test.map(({ name, _id, amount }) => (
                  <option key={_id} value={_id}>
                    {name} - (#{amount})
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formgroup}>
              <label htmlFor="amount">Appointment Date</label>

              <input
                type="date"
                id="appointmentDate"
                label="Appointmnt Date"
                className={styles.formcontrol}
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                placeholder="Appointment Date"
                min={getCurrentDate()}
              />
            </div>
            <div className={styles.formgroup}>
              <label htmlFor="amount">Appointment Time</label>

              <input
                type="time"
                id="appointmentTime"
                label="Appointmnt Date"
                className={styles.formcontrol}
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                placeholder="Appointment Time"
                min={getMinTime()}
              />
            </div>

            <div className={styles.formgroup}>
              <button
                type="submit"
                disabled={isLoading}
                className={styles.btnprimary}
              >
                {isLoading ? "Loading" : "Submit"}
              </button>
            </div>

            <div className={styles.formgroup}>
              <button
                onClick={handleNavigate}
                type="submit"
                disabled={isLoading}
                className={styles.btnsecondary}
              >
                {"Appointment history"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Appointment;

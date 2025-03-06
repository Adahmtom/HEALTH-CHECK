import React from "react";
import { useNavigate } from "react-router-dom";
import WelcomeBoard from "../../../components/Welcome board";
import Layout from "../../../layout";
import data from "../../Collector/data";
import Table from "../../../components/Table/Table";
import styles from "../../styles.module.css";

const Pending = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const columns = [
    {
      title: "S/N",
      render: (rowData) => {
        const index = data.findIndex((data) => data === rowData);
        return index + 1;
      },
    },
    { title: "Patient Name", field: "patientName" },
    { title: "Date of Birth", field: "dateOfBirth" },

    { title: "Contact Number", field: "contactNumber" },
    { title: "Email Address", field: "address" },
    { title: "Address", field: "dateOfBirth" },
    { title: "Test Type", field: "testType" },
    { title: "Preferred Date", field: "preferredDate" },
    { title: "Preferred Time", field: "preferredTime" },
  ];
  return (
    <Layout name="Appointment" title="Pending Results">
      <div className={styles.butt}>
        <button className={styles.buttons} onClick={handleGoBack}>
          Go Back
        </button>
      </div>
      <WelcomeBoard />
      <div
        style={{
          marginLeft: "30px",
          boxShadow: "none",
          width: "97%",
        }}
      >
        <Table
          selectID="ID"
          columns={columns}
          data={data}
          style={{ width: "90%" }}
        ></Table>
      </div>
    </Layout>
  );
};

export default Pending;

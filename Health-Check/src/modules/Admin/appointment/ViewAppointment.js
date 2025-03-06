import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import Layout from "../../../layout";
import { useGetAppointment } from "../hooks";
import PatienceCard from "../../../components/Pat Card";
import ProgressStatus from "../../../components/Progress status";

const ViewAppointment = () => {
  const { id } = useParams();
  const { data: appointments } = useGetAppointment();
  const appointment = appointments?.find((appt) => appt?._id === id);

  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();

  const currentStat = appointment?.status;

  return (
    <>
      <Layout name="Dashboard" title="View Appointment">
        <div className={styles.butt}>
          <button className="buttonsall" onClick={handleGoBack}>
            Go Back
          </button>
        </div>

        <ProgressStatus status={currentStat} />

        <PatienceCard
          fullname={appointment?.user?.fullname || "FullName"}
          address={appointment?.user?.address || "Address"}
          DOB={appointment?.user?.DOB || "DOB"}
          test={appointment?.test?.name || "Test"}
          phone={appointment?.user?.phone || "Phone"}
          appointmentDate={appointment?.appointmentDate || "Appointment Date"}
          email={appointment?.user?.email || "Email"}
          appointmentTime={appointment?.appointmentTime || "Appointment Time"}
        />
      </Layout>
    </>
  );
};

export default ViewAppointment;

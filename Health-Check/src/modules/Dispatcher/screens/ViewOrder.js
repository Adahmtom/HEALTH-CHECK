import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../layout";
import {  useGetAppointmentById } from "../../Admin/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import DispatcherCard from "../../../components/Pat Card/dispatcherCard";
import Lab from "../../../components/Pat Card/lab";

const ViewOrder = () => {
  const { id } = useParams();
  const { data: appointment } = useGetAppointmentById(id);

 


  
  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();


  

  

  return (
    <>
      <Layout name="Dashboard" title="View Order">
        <div className={styles.butt}>
          <button className="buttonsall" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
        <DispatcherCard
          fullname={appointment?.collector?.fullname || "FullName"}
          address={appointment?.collector?.address || "Address"}
          phone={appointment?.collector?.phone || "Phone"}
          email={appointment?.collector?.email || "Email"}
        />

        <Lab
          fullname={appointment?.labScientist?.fullname || "FullName"}
          address={appointment?.labScientist?.address || "Address"}
          phone={appointment?.labScientist?.phone || "Phone"}
          email={appointment?.labScientist?.email || "Email"}
        />
        
      </Layout>
    </>
  );
};

export default ViewOrder;

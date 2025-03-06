import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../layout";
import { useGetAppointmentById } from "../../Admin/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import PatienceCard from "../../../components/Pat Card";
import "../../../components/Checklist/index.css";
const ViewCollection = () => {
  const { id } = useParams();
  const { data: appointment } = useGetAppointmentById(id);
  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();


  // setFormData()
  
  return (
    <>
      <Layout name="Dashboard" title="View Collection">
        <div className={styles.butt}>
          <button className="buttonsall" onClick={handleGoBack}>
            Go Back
          </button>
        </div>

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
<div className="checklist_container">

        {appointment?.status === "SampleCollected"? 
        
        <> <h1 style={{marginBottom:"10px"}}>Sample Taken Information</h1> <h3 style={{marginBottom:"10px"}}>Wrapper Number : {appointment?.wrapperNumber
        } </h3> <div className="checklist_sample">{appointment?.sample?.map((item, index) => (
          
          <div className="checkbox-label_sample" key={index}>
            <label className="sample-label">{item.name}</label>
            <input
              type="text"
              id={item.name}
              
              name={item.name}
              value={item.result}
              onChange={""}
              disabled
              required
            />
          </div>
        ))}  </div></> : null}
        </div>
      </Layout>
    </>
  );
};

export default ViewCollection;

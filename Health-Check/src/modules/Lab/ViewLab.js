import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  useGetAppointment, useLabReceiveSample } from "../Admin/hooks";
import Layout from "../../layout";
import style from "../Collector/screens/styles.module.css"
import PatienceCard from "../../components/Pat Card";
import { useState } from "react";
import { useIsMutating } from "@tanstack/react-query";
import DispatcherCard from "../../components/Pat Card/dispatcherCard";
import MedicalDispacther from "../../components/Pat Card/medicalDispatcher";

const ViewLab = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: appointments } = useGetAppointment();
  const appointment = appointments?.find((appt) => appt?._id === id);
  const [token,setToken] = useState("")
  const isLoading = useIsMutating()
const {mutate,isSuccess} = useLabReceiveSample()

const submitHandler = (e) => {
  e.preventDefault();

  const newData = {
    appointmentID:id,
    id:token
  }
  mutate(newData);
  
};

if (isSuccess) {
  navigate("/app/dashboard")
}
  return (
    <Layout name="Labs" title="View Available Labs">
      <div className="topMargin">
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

<DispatcherCard
          fullname={appointment?.collector?.fullname || "FullName"}
          address={appointment?.collector?.address || "Address"}
          phone={appointment?.collector?.phone || "Phone"}
          email={appointment?.collector?.email || "Email"}
        />

<MedicalDispacther
          fullname={appointment?.dispatcher?.fullname || "FullName"}
          address={appointment?.dispatcher?.address || "Address"}
          phone={appointment?.dispatcher?.phone || "Phone"}
          email={appointment?.dispatcher?.email || "Email"}
        />
       
      </div>
      <form onSubmit={submitHandler} >
          
          <div  className={style.sample_formcontainer}>
          <label>Verification Token</label>
          <input
            type="text"
            id="token"
            label="token"
           
            name="token"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
            }}
            placeholder="Token"
          />
          
          <button
            type="submit"
            disabled={isLoading}
            className={style.buttons}
            style={{ marginTop: "50px", }}
          >
            {isLoading ? "Loading" : "I Have Received the Sample"}
          </button>
          </div>
         
        </form>
    </Layout>
  );
};

export default ViewLab;

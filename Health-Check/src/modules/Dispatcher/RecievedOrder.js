import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layout";
import { useDispatchReceiveSample, useGetAppointmentById } from "../Admin/hooks";
import { useNavigate } from "react-router-dom";
import styles from "../styles.module.css";
import style from "../Collector/screens/styles.module.css"
import { useState } from "react";
import { useIsMutating } from "@tanstack/react-query";
import DispatcherCard from "../../components/Pat Card/dispatcherCard";
import Lab from "../../components/Pat Card/lab";

const ReceivedOrder = () => {
  const { id } = useParams();
  const { data: appointment } = useGetAppointmentById(id);
const isLoading = useIsMutating()


  
  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();
const [token,setToken] = useState("")
const {mutate,isSuccess} = useDispatchReceiveSample()

  const submitHandler = (e) => {
    e.preventDefault();

    const newData = {
      appointmentID:id,
      id:token
    }
    mutate(newData);
    
  };

  if (isSuccess) {
    // navigate("/app/dispatcher/order/all")
    window.location.reload();
  }

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

         {appointment?.status === "DispatchCollectSample" ? <div >
         <Lab
          fullname={appointment?.labScientist?.fullname || "FullName"}
          address={appointment?.labScientist?.address || "Address"}
          phone={appointment?.labScientist?.phone || "Phone"}
          email={appointment?.labScientist?.email || "Email"}
        />
        <h3 style={{color:"red", fontSize:"16px", marginLeft:"2%"}}>Kindly proceed to deleiver sample to lab and make sure the lab verify before handling over</h3>
         </div> : <form onSubmit={submitHandler} >
          
          <div className={style.sample_formcontainer}>
          <label>Verification Token</label>
          <input
            type="text"
            id="token"
            label="token"
            className={`form-control ${styles["form-control"]}`}
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
            {isLoading ? "Loading" : "I Have Received The Sample"}
          </button>
          </div>
         
        </form>} 
      </Layout>
    </>
  );
};

export default ReceivedOrder;

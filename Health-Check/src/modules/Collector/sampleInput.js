import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layout";
import {
  useCollectSampleActionById,
  useGetAppointmentById,
} from "../Admin/hooks";
import { useNavigate } from "react-router-dom";
import styles from "../Collector/screens/styles.module.css";
import PatienceCard from "../../components/Pat Card";
import { useState } from "react";
import SampleInput from "../../components/Sample Input";
import { useIsMutating } from "@tanstack/react-query";

const InputSample = () => {
  const isLoading = useIsMutating();
  const { id } = useParams();
  const { data: appointment } = useGetAppointmentById(id);
  const sample = appointment?.test?.sample || [];
  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [wrapper, setWrapper] = useState("");
  const [formData, setFormData] = useState({});

  const { mutate,isSuccess } = useCollectSampleActionById();
  function convertFormDataToRestructureData(formData) {
    const restructuredData = sample.map((item) => ({
      name: item.name,
      result: formData[item.name] || "",
    }));
    return restructuredData;
  }

  const restructuredData = convertFormDataToRestructureData(formData);
  const submitHandler = (e) => {
    e.preventDefault();

    const newData = [
      { wrapperNumber:wrapper,
        collectorToken: token,
        sample: restructuredData,
        appointmentID: id,
        testID: appointment?.test?._id,
      },
    ];
    mutate(newData);
  
  };

  if (isSuccess){
    navigate(`/app/collector/collection/completed`)
  }
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
        <form style={{width:"100%"}} onSubmit={submitHandler} >
          <SampleInput
            data={sample}
            formData={formData}
            setFormData={setFormData}
          />
          <div className={styles.sample_formcontainer}>
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
           
          />
           <label>Wrapper Number</label>
           <input
            type="text"
            id="wrapper"
            label="wrapper"
            className={`form-control ${styles["form-control"]}`}
            name="wrapper"
            value={wrapper}
            onChange={(e) => {
              setWrapper(e.target.value);
            }}
           
          />
          <button
            type="submit"
            disabled={isLoading}
            className={styles.buttons}
            style={{ marginTop: "50px", }}
          >
            {isLoading ? "Loading" : "Submit Sample"}
          </button>
          </div>
         
        </form>
      </Layout>
    </>
  );
};

export default InputSample;

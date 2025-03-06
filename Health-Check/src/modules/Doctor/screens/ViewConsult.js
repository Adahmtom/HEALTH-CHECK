import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../layout";
import { useDoctorComment, useGetAppointment } from "../../Admin/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import PatienceCard from "../../../components/Pat Card";
import style from "../../Collector/screens/styles.module.css"
import { useIsMutating } from "@tanstack/react-query";
import { errorAlert, successAlert } from "../../../utils";
import "../../../components/Checklist/index.css";

const ViewConsult = () => {
  const { id } = useParams();
  const { data: appointments } = useGetAppointment();
  const appointment = appointments?.find((appt) => appt?._id === id);
  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();
  
  const [passports, setPassports] = useState([]);



  useEffect(() => {
    setPassports(appointment?.testResult || []);
  }, [appointment]);

  



 


  const [comment, setComment] = useState("");
  const isLoading = useIsMutating();

  const downloadPdf = (fileUrl) => (e) => {
    e.preventDefault();
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'downloaded_file.pdf'; // Specify the desired file name
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const { mutate, isSuccess, isError, reset, error } = useDoctorComment();

  if (isSuccess) {
    reset();
    successAlert("Comment has been uploaded successfully");
    navigate("/consultations/completed");
  }

  if (isError) {
    reset();
    errorAlert(error);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    const newData = {
      appointmentID: id,
      docComment: comment,
    };
    mutate(newData);
  };

  return (
    <>
      <Layout name="Dashboard" title="View Consultations">
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
          {appointment?.status ? (
            <>
              <h1 style={{ marginBottom: "10px" }}>
                Sample Taken Information
              </h1>
              <h3 style={{ marginBottom: "10px" }}>
                Wrapper Number : {appointment?.wrapperNumber}
              </h3>
              <div className="checklist_sample">
                {appointment?.sample?.map((item, index) => (
                  <div className="checkbox-label_sample" key={index}>
                    <label className="sample-label">{item.name}</label>
                    <input
                      type="text"
                      id={item.name}
                      name={item.name}
                      value={item.result}
                      onChange={() => {}}
                      disabled
                      required
                    />
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <form onSubmit={submitHandler}>
          <div className={style.sample_formcontainer}>
            <h3 style={{ fontSize: "16px", marginBottom: "20px" }}>
              Test Result:{" "}
            </h3>
            <div div style={{display:"flex",flexDirection:"row"}}>
            {passports.map((passportItem, index) => (
              <div key={index}>
                <button
                  className={style.buttons}
                  style={{marginRight:"10px"}}
                  onClick={downloadPdf(passportItem.fileUrl)}
                >
                  View Result {index + 1}
                </button>
              </div>
            ))}
            </div>
             <label>Doctor Comment</label>
            <textarea
              type="text"
              id="comment"
              label="comment"
              name="comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={style.buttons}
              style={{ marginTop: "50px" }}
            >
              {isLoading ? "Loading" : "Send Comment"}
            </button>
          </div>
        </form>

        
      </Layout>
    </>
  );
};

export default ViewConsult;
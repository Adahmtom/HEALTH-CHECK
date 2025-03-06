import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../layout";
import { useGetAppointment } from "../../Admin/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import style from "../../Collector/screens/styles.module.css";
import PatienceCard from "../../../components/Pat Card";
import "../../../components/Checklist/index.css";
const ViewAppointment = () => {
  const { id } = useParams();
  const { data: appointments } = useGetAppointment();
  const appointment = appointments?.find((appt) => appt?._id === id);
  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();
  const [passport, setPassPort] = useState("");
  const [comment, setComment] = useState("");
  useEffect(() => {
    setPassPort(appointment?.testResult);
    setComment(appointment?.doctorComment);
  }, [appointment]);

  const downloadPdf = () => {
    if (passport) {
      // Convert base64 to a Blob
      const byteCharacters = atob(passport.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Create a URL for the Blob and make it downloadable
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded_file.pdf"; // Specify the desired file name
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  

  return (
    <>
      <Layout name="Dashboard" title="View Appointment">
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
          {appointment?.status === "Completed" ? (
            <>
              {" "}
              <h1 style={{ marginBottom: "10px" }}>
                Sample Taken Information
              </h1>{" "}
              <h3 style={{ marginBottom: "10px" }}>
                Wrapper Number : {appointment?.wrapperNumber}{" "}
              </h3>{" "}
              <div className="checklist_sample">
                {appointment?.sample?.map((item, index) => (
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
                ))}{" "}
              </div>
            </>
          ) : null}
        </div>
        {passport && (
          <form style={{ width: "100%" }}>
            <div className={style.sample_formcontainer}>
              <h3 style={{ fontSize: "16px", marginBottom: "20px" }}>
                Test Result:{" "}
              </h3>

              <div>
                <button className={style.buttons} onClick={downloadPdf}>
                  Download Result
                </button>
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
                disabled={true}
              />
            </div>
          </form>
        )}
      </Layout>
    </>
  );
};

export default ViewAppointment;

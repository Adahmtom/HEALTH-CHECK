import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../layout";
import { useGetAppointment, useLabUploadResult } from "../../Admin/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import PatienceCard from "../../../components/Pat Card";
import { useIsMutating } from "@tanstack/react-query";
import { errorAlert, successAlert } from "../../../utils";
import swal from "sweetalert";
import style from "../../Collector/screens/styles.module.css";
import "../../../components/Checklist/index.css";

const ViewTEst = () => {
  const { id } = useParams();
  const { data: appointments } = useGetAppointment();
  const appointment = appointments?.find((appt) => appt?._id === id);
  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
 

  const isLoading = useIsMutating();

  const { mutate, isSuccess, isError, reset, error } = useLabUploadResult();

  if (isSuccess) {
    reset();
    successAlert("Test Result Uploaded successfully");
    navigate("/lab/test/completed");
  }

  if (isError) {
    reset();
    errorAlert(error);
  }

  

   const [documents, setDocoments] = useState([]);
   const [document, setDocoment] = useState([]);


  const addFile = (file) => {
    if (!file) {
      swal("Please select a file");
      return;
    }
  
    if (file.size > 5 * 1024 * 1024) {
      swal("File is too large (maximum size is 5MB)");
      return;
    }
  
    setLoading(true);
  
    // No need to use FileReader here, you can directly append the file to the documents array
    //  setDocoments([...documents, file]);
     setDocoment(file);

  
    setLoading(false);
  };

 

  const submitHandler = () => {
    const newData = {
      appointmentID: id,
      files: document,
    };
     mutate(newData);
    
  };

  const removeDocument = (selectedFile) => {
    //Filter out the sample with the specified ID
    const updatedDocument = documents.filter(
      (doc) => doc?.name !== selectedFile?.name
    );
    setDocoments(updatedDocument);
    
  };

  return (
    <>
      <Layout name="Dashboard" title="Test Details">
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
          {appointment?.status === "SampleDelivered" ? (
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
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div>
          <div className={style.sample_formcontainer}>
            {loading ? (
              "uploading document"
            ) : isLoading ? (
              "Submitting Document"
            ) : (
              <>
                <div
                  div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "3%",
                    width: "100%",
                   
                  }}
                >
                  {documents.map((passportItem, index) => (
                    <div key={index}>
                      <button
                        className={style.buttons}
                        style={{ marginRight: "10px" }}
                         onClick={()=> removeDocument(passportItem)}
                      >
                        {passportItem.name}
                      </button>
                    </div>
                  ))}
                </div>
                <h3 style={{ marginTop: "20px" }}>Upload Result</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    
                  }}
                >
                  <div>
                    <input
                      className={style.buttons}
                      type="file"
                      accept=".jpg, .jpeg, .png, .pdf" // Specify the file types you want to accept
                      onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        addFile(selectedFile);
                      }}
                    />
                  </div>
                  <div>
                    <button
                      style={{
                        marginLeft: "20px",
                        background: "white",
                        border: "1px solid rgba(30, 158, 136, 1)",
                        color: "rgba(30, 158, 136, 1)",
                        marginTop: "10px",
                      }}
                      className={style.buttons}
                      onClick={submitHandler}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ViewTEst;

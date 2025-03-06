import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useGetAppointmentByCompleted } from "../../Patient/Hooks";
import Layout from "../../../layout";
import TabMenu from "../../../components/MenuTabs";

const ViewCompletedAppointment = () => {
  const { id } = useParams();
  const appointments = useGetAppointmentByCompleted();
  const appointment = appointments?.find((appt) => appt?._id === id);

  const [passports, setPassports] = useState([]);
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setPassports(appointment?.testResult || []);
  }, [appointment]);



  const navigate = useNavigate();
  const tabs = [
    { label: "Patient's Details" },
    // { label: "Patient's BMI" },
    { label: "Laboratory Details" },
    { label: "Doctor's report details" },
  ];

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

  return (
    <>
      <Layout name="Dashboard" title="View Completed Appointment">
        <div className={styles.butt}>
          <button className="buttonsall" onClick={handleGoBack}>
            Go Back
          </button>
        </div>

        <div>
          <TabMenu tabs={tabs}>
            {/*     { label: "Patient's Details" }*/}
            <div className={styles.requestDetail}>
              <div>
                <h4>Appointment Date:</h4>
                <p>{appointment?.appointmentDate || "Appointment Date"}</p>
              </div>
              <div>
                <h4>Appointment Time:</h4>
                <p>{appointment?.appointmentTime || "Appointment Time"}</p>
              </div>
              <div>
                <h4>Patient name:</h4>
                <p>{appointment?.user?.fullname || "Full Name"}</p>
              </div>
              <div>
                <h4>Date of Birth</h4>
                <p>{appointment?.user?.DOB || "Date of Birth"}</p>
              </div>
              <div>
                <h4>Phone Number</h4>
                <p>{appointment?.user?.phone || "Phone"}</p>
              </div>

              <div>
                <h4>Address</h4>
                <p>{appointment?.user?.address || "Address"}</p>
              </div>
             
            </div>

            {/*     { label: "Laboratory Details" } */}
            <div>
              <div>
                {/* Collector  Details */}

                {appointment?.collector && (
                  <div>
                    <div className={styles.request}>
                      <h2>Sample Collector</h2>
                    </div>
                    <div className={styles.requestDetail}>
                      <div>
                        <h4>Full Name:</h4>
                        <p>{appointment?.collector?.fullname || "Full Name"}</p>
                      </div>
                      <div>
                        <h4>Sample Collector's ID</h4>
                        <p>{appointment?.collector?._id || "ID"}</p>
                      </div>
                      <div>
                        <h4>Phone Number</h4>
                        <p>{appointment?.collector?.phone || "Phone"}</p>
                      </div>
                      <div>
                        <h4>Email Address</h4>
                        <p>
                          {appointment?.collector?.email || "Appointment Time"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lab Scientist Details */}
                {appointment?.labScientist && (
                  <div>
                    <div className={styles.request}>
                      <h2>Lab Scientist</h2>
                    </div>

                    <div className={styles.requestDetail}>
                      <div>
                        <h4>Full Name:</h4>
                        <p>{appointment?.labScientist?.fullname || "Name"}</p>
                      </div>
                      <div>
                        <h4>Email Address</h4>
                        <p>
                          {appointment?.labScientist?.email || "Email Address"}
                        </p>
                      </div>
                      <div>
                        <h4>Phone Number</h4>
                        <p>{appointment?.labScientist?.phone || "Phone"}</p>
                      </div>
                      <div>
                        <h4>Lab Scient's ID</h4>
                        <p>{appointment?.labScientist?._id || "ID"}</p>
                      </div>
                    </div>
                  </div>
                )}
                {/* Lab Dispath Details */}
                {appointment?.dispatcher && (
                  <div>
                    <div className={styles.request}>
                      <h2>Med Dispatcher</h2>
                    </div>
                    <div className={styles.requestDetail}>
                      <div>
                        <h4>Full Name:</h4>
                        <p>
                          {appointment?.dispatcher?.fullname || "Full Name"}
                        </p>
                      </div>
                      <div>
                        <h4>Medical Dispatcher's ID</h4>
                        <p>{appointment?.dispatcher?._id || "ID"}</p>
                      </div>

                      <div>
                        <h4>Email Address</h4>
                        <p>
                          {appointment?.dispatcher?.email || "Email Address"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Na Div for Tab 4 be Dis if anyone dey*/}
            <div>
              <div>
                {/* Mapping through Samples Used */}
                {appointment?.sample?.map((item, index) => (
                  <div className={styles.request} key={item?._id}>
                    <div>
                      <h2> Sample {index + 1}</h2>
                    </div>
                    <div className={styles.requestDetail}>
                      <div>
                        <h4>Name:</h4>
                        <p>{item?.name || "Name"}</p>
                      </div>
                      <div>
                        <h4>Result:</h4>
                        <p>{item?.result || "Result"}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {appointment?.doctor && (
                  <div className={styles.request}>
                    <div>
                      <h2>Medical Doctor</h2>
                    </div>

                    <div className={styles.requestDetail}>
                      <div>
                        <h4>Full Name:</h4>
                        <p>{appointment?.doctor?.fullname || "Name"}</p>
                      </div>
                      <div>
                        <h4>Email Address</h4>
                        <p>{appointment?.doctor?.email || "Email Address"}</p>
                      </div>
                      <div>
                        <h4>Doctor's ID</h4>
                        <p>{appointment?.doctor?._id || "ID"}</p>
                      </div>
                      <div>
                        <h4>Phone Number</h4>
                        <p>{appointment?.doctor?.phone || "Phone"}</p>
                      </div>

                      <div>
                        <h4>Doctor's comment</h4>
                        <p>{appointment?.doctor?.comment || "Comment"}</p>
                      </div>
                    </div>

                    <div className={styles.btnButton}>
                      <button
                         onClick={downloadPdf(passports[0]?.fileUrl)}
                      >
                        Download Result
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabMenu>
        </div>
      </Layout>
    </>
  );
};

export default ViewCompletedAppointment;

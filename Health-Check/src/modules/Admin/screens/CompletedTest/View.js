import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useGetAppointmentByTestCompleted } from "../../../Patient/Hooks";
import Layout from "../../../../layout";
import TabMenu from "../../../../components/MenuTabs";

const View = () => {
  const { id } = useParams();
  const appointments = useGetAppointmentByTestCompleted();
  const appointment = appointments?.find((appt) => appt?._id === id);

 
  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();
  const tabs = [
    { label: "Patient's Details" },
    // { label: "Patient's BMI" },
    { label: "Laboratory Details" },
    { label: "Doctor's report details" },
  ];

  const downloadPdf = () => {
    const link = document.createElement("a");
    link.href =
      "data:application/pdf;base64,JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA4NDEuODg5OTk5OTk5OTk5OTg2NCA1OTUuMjc5OTk5OTk5OTk5OTcyN10KL0NvbnRlbnRzIDQgMCBSCj4";
    link.download = "example.pdf";
    link.click();
  };

  return (
    <>
      <Layout name="Dashboard" title="View Completed Test">
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
              {/* <div>
                <h4>Sample Wrapper Number</h4>
                <p>{"" || "DNA12345"}</p>
              </div> */}
            </div>

            {/*     { label: "Patient's BMI" } */}
            {/* <div>
              <div className={styles.requestDetail}>
                <div>
                  <h4>Blood Temperature</h4>
                  <p>{"" || "90kg"}</p>
                </div>
                <div>
                  <h4>Body Weight</h4>
                  <p>{"" || "90kg"}</p>
                </div>
                <div>
                  <h4>Test Type</h4>
                  <p>{"" || "Deoxyribonucleic acid (DNA)"}</p>
                </div>
                <div>
                  <h4>Body Temperature</h4>
                  <p>{"" || "80"}</p>
                </div>
                <div>
                  <h4>Sample Wrapper Number</h4>
                  <p>{appointment?.wrapperNumber || "DNA12345"}</p>
                </div>
              </div>
            </div> */}
            {/*     { label: "Laboratory Details" } */}

            <div>
              <div className={styles.request}>
                {/* Collector  Details */}

                <div>
                  <h2>Sample Collector Expert</h2>
                </div>
                <div className={styles.requestDetail}>
                  <div>
                    <h4>Full Name:</h4>
                    <p>
                      {appointment?.collector?.fullname || "Appointment Date"}
                    </p>
                  </div>
                  <div>
                    <h4>Sample Collector's ID</h4>
                    <p>{appointment?.collector?._id || "ID"}</p>
                  </div>
                  <div>
                    <h4>Phone Number</h4>
                    <p>{appointment?.collector?.phone || "90kg"}</p>
                  </div>

                  <div>
                    <h4>Email Address</h4>
                    <p>{appointment?.collector?.email || "Appointment Time"}</p>
                  </div>
                </div>

                {/* Lab Scientist Details */}
                <div className={styles.request}>
                  <div>
                    <h2>Lab Scientist</h2>
                  </div>
                  <div className={styles.requestDetail}>
                    <div>
                      <h4>Full Name:</h4>
                      <p>{appointment?.labScientist?.fullname || "Name"}</p>
                    </div>
                    <div>
                      <h4>Lab Scientist's ID</h4>
                      <p>{appointment?.labScientist?._id || "ID"}</p>
                    </div>
                    <div>
                      <h4>Phone Number</h4>
                      <p>{appointment?.labScientist?.phone || "Phone"}</p>
                    </div>

                    <div>
                      <h4>Email Address</h4>
                      <p>
                        {appointment?.labScientist?.email || "Email Address"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lab Dispath Details */}
                <div className={styles.request}>
                  <div>
                    <h2>Medical Dispatcher</h2>
                  </div>
                  <div className={styles.requestDetail}>
                    <div>
                      <h4>Full Name:</h4>
                      <p>{appointment?.dispatcher?.fullname || "Full Name"}</p>
                    </div>
                    <div>
                      <h4>Medical Dispatcher's ID</h4>
                      <p>{appointment?.dispatcher?._id || "ID"}</p>
                    </div>

                    <div>
                      <h4>Email Address</h4>
                      <p>{appointment?.dispatcher?.email || "Email Address"}</p>
                    </div>
                  </div>
                </div>
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
                      <h4>Phone Number</h4>
                      <p>{appointment?.doctor?.phone || "Phone"}</p>
                    </div>
                    <div>
                      <h4>Doctor's ID</h4>
                      <p>{appointment?.collector?._id || "ID"}</p>
                    </div>
                    <div>
                      <h4>Doctor's comment</h4>
                      <p>{appointment?.collector?.comment || "Comment"}</p>
                    </div>
                  </div>
                  <div className={styles.request}>
                    <button onClick={downloadPdf}>Download Result</button>
                  </div>
                </div>
              </div>
            </div>
          </TabMenu>
        </div>
      </Layout>
    </>
  );
};

export default View;

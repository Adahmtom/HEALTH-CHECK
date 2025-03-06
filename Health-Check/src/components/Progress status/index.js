import React from "react";
import styles from "./styles.module.css";

const ProgressStatus = ({ status }) => {
  const Active = styles.circleActive; // green
  const Inactive = styles.circleInactive; // gray

  const statusList = [
    {
      title: "Pending",
      field: "Pending",
    },
    {
      title: "AppointmentAccepted",
      field: "Appointment Accepted",
    },
    {
      title: "SampleCollected",
      field: "Sample Collected",
    },
    {
      title: "DispatchAcceptOrder",
      field: "Order Accepted",
    },
    {
      title: "DispatchCollectSample",
      field: "Sample Collected",
    },
    {
      title: "SampleDelivered",
      field: "Sample Delivered",
    },
    {
      title: "TestCompleted",
      field: "Test Completed",
    },
    {
      title: "Completed",
      field: "Completed",
    },
  ];

  const circleClass = (index) => {
    const statusIndex = statusList.findIndex((s) => s.title === status);

    if (index <= statusIndex) {
      return Active;
    } else {
      return Inactive;
    }
  };

  return (
    <>
      <div className={styles.header}>
        {" "}
        <h3> Appointment Status</h3>
      </div>

      <div className={styles.container}>
        {statusList.map((s, index) => (
          <React.Fragment key={index}>
            <div className={`${circleClass(index)}`}>
              <div className={styles.circleText}>{s.field}</div>
            </div>
            {index !== statusList.length - 1 && (
              <div className={styles.line}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default ProgressStatus;

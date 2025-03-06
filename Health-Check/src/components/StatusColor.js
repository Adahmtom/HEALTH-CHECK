import React from "react";

const StatusColor = ({ status = "" }) => {
  let color = "";
  let bg = "";
  let name = "";
  switch (status) {
    case "Pending":
      color = "#FF9800";
      bg = "rgba(255, 152, 0,0.1)";
      name = "Pending";
      break;
    case "AppointmentAccepted":
      color = "#459e49";
      bg = "rgba(69, 158, 73,0.1)";
      name = "Appointment Accepted";
      break;
    case "SampleCollected":
      color = "#00bcd4";
      bg = "rgba(0, 188, 212,0.1)";
      name = "Sample Collected";
      break;
    case "DispatchAcceptOrder":
      color = "#9c27b0";
      bg = "rgba(156, 39, 176,0.1)";
      name = "Dispatch Accepted Order";
      break;
    case "DispatchCollectSample":
      color = "#bb3e03";
      bg = "rgba(166, 97, 218,0.1)";
      name = "Dispatch Collected Sample";
      break;
    case "SampleDelivered":
      color = "#2196f3";
      bg = "rgba(33, 150, 243,0.1)";
      name = "Sample Delivered";
      break;
    case "TestCompleted":
      color = "#4caf50";
      bg = "rgba(76, 175, 80,0.1)";
      name = "Test Completed";
      break;
    case "Completed":
      color = "#386641";
      bg = "rgba(19, 158, 73,0.1)";
      name = "Completed";
      break;
    default:
      color = "black";
      bg = "#000000";
      name = "Pending";
  }
  return (
    <span
      style={{
        color: color,
        background: bg,
        padding: "5px 20px",
        textAlign: "center",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>
  );
};

export default StatusColor;

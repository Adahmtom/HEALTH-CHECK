import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export const displayIcon = (tooltip) => {
  switch (tooltip) {
    case "Edit":
      return <FaEdit />;
    case "Delete":
      return <FaTrash />;
    case "View":
      return <FaEye />;
    default:
  }
};

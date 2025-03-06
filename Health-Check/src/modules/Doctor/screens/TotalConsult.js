import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../layout";
import Table from "../../../components/Table";
import StatusColor from "../../../components/StatusColor";
import { useGetAppointmentByTestCompleted } from "../../Patient/Hooks";

const TotalConsult = () => {
  const navigate = useNavigate();
  const Total = useGetAppointmentByTestCompleted() || [];

  const actions = () => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/doctor/consultation/${res._id}`);
      },
    },
  ];

  const columns = [
    {
      title: "S/N",
      render: (rowData) => {
        const index = Total.findIndex((appointment) => appointment === rowData);
        return index + 1;
      },
    },
    {
      title: "User",
      field: "user.fullname",
    },
    {
      title: "Test",
      field: "test.name",
    },
    {
      title: "Appointment Date",
      field: "appointmentDate",
    },
    {
      title: "Appointment Time",
      field: "appointmentTime",
    },
    {
      title: "Status",
      field: "status",
      render: (rowData) => (
        <StatusColor
          status={rowData.status}
          color={"#a661da"}
          bg={"rgba(166, 97, 218,0.1)"}
        />
      ),
    },
  ];

  return (
    <Layout name="Test" title="Total Consultations">
      <div className="topMargin">
        <Table
          selectID="ID"
          columns={columns}
          data={Total}
          tableActions={actions}
          style={{ width: "90%" }}
        ></Table>
      </div>
    </Layout>
  );
};

export default TotalConsult;

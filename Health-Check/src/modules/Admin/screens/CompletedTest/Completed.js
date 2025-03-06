import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useGetAppointmentByTestCompleted } from "../../../Patient/Hooks";
import StatusColor from "../../../../components/StatusColor";
import Layout from "../../../../layout";
import Table from "../../../../components/Table";

const Completed = ({ propId }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const Appoint = useGetAppointmentByTestCompleted(propId || id);
  // const allAppointments = Appoint?.data.filter((x) => x.status === "");

  const actions = () => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/admin/settings/test/completed/${res._id}`);
      },
    },
  ];

  const columns = [
    {
      title: "S/N",
      render: (rowData) => {
        const index = Appoint.findIndex(
          (appointment) => appointment === rowData
        );
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
    <Layout name="Appointment" title="Test Completed">
      <div
        style={{
          marginLeft: "30px",
          boxShadow: "none",
          marginTop: "5%",
        }}
      >
        <Table
          selectID="ID"
          columns={columns}
          data={Appoint}
          tableActions={actions}
        />
      </div>
    </Layout>
  );
};

export default Completed;

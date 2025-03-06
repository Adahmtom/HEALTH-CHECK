import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../layout";
import Table from "../../../components/Table";
import StatusColor from "../../../components/StatusColor";
import { useGetAppointmentByCompleted } from "../../Patient/Hooks";

const Completed = ({ propId }) => {
  const navigate = useNavigate();
  const appointments = useGetAppointmentByCompleted();

  const actions = () => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/admin/appointment/completed/${res._id}`);
      },
    },
  ];

  const columns = [
    {
      title: "S/N",
      render: (rowData) => {
        const index = appointments.findIndex(
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
    <Layout name="Appointment" title="Completed Appointments">
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
          data={appointments}
          tableActions={actions}
        />
      </div>
    </Layout>
  );
};

export default Completed;

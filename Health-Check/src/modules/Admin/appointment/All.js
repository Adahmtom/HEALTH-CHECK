import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../layout";
import { useGetAppointment } from "../hooks";
import Table from "../../../components/Table";
import StatusColor from "../../../components/StatusColor";

const All = ({ propId, res }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const Appoint = useGetAppointment(propId || id);
  const allAppointments =
    Appoint?.data?.filter(
      (appointment) => appointment?.status === "AppointmentAccepted"
    ) || [];

  const actions = ({ id }) => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/admin/appointment/${res._id}`);
      },
    },
  ];

  const columns = [
    {
      title: "S/N",
      render: (rowData) => {
        const index = allAppointments.findIndex(
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
    <Layout name="Appointment" title="All Appointments">
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
          data={allAppointments}
          tableActions={actions}
        />
      </div>
    </Layout>
  );
};

export default All;

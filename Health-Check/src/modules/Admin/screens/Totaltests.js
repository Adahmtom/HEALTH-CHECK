import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../layout";
import Table from "../../../components/Table";
import { useGetAppointment } from "../hooks";
import StatusColor from "../../../components/StatusColor";

const TotalTest = () => {
  const navigate = useNavigate();
 
  const { id } = useParams();
  const Appoint = useGetAppointment(id);
  const allAppointments = Appoint?.data || [];
 

  const actions = () => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/admin/test/${res._id}`);
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
    <Layout name="Appointment" title="Total Tests">
      <div className="topMargin">
        <Table
          selectID="ID"
          columns={columns}
          data={allAppointments}
          tableActions={actions}
          style={{ width: "90%" }}
        ></Table>
      </div>
    </Layout>
  );
};

export default TotalTest;

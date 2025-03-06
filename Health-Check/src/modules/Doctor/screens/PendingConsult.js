import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAppointment } from "../../Admin/hooks";
import Table from "../../../components/Table";
import Layout from "../../../layout";
import StatusColor from "../../../components/StatusColor";

const PendingConsult = ({ propId, res }) => {
  const navigate = useNavigate();
  const Total = useGetAppointment() || [];
  
  const PendAppoint =
    Total?.data?.filter(
      (appointment) =>
        appointment?.status === "TestCompleted" 
    ) || [];
 

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
        const index = PendAppoint.findIndex(
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
    <Layout name="Test" title="Pending Consultations">
      <div className="topMargin">
        <Table
          selectID="ID"
          columns={columns}
          data={PendAppoint}
          tableActions={actions}
          style={{ width: "90%" }}
        ></Table>
      </div>
    </Layout>
  );
};

export default PendingConsult;

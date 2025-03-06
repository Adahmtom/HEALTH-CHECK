import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context";
import Layout from "../../../layout";
import Table from "../../../components/Table";
import StatusColor from "../../../components/StatusColor";
import { useGetAppointment } from "../../Admin/hooks";

const CompletedTest = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const data = useGetAppointment();
  const appointmentMe = user?.email;
  const TotalTest = data?.data?.filter(
    (appointment) => appointment?.labScientist?.email === appointmentMe && appointment?.status === "TestCompleted"
  );

  const actions = () => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/lab/test/view/completed/${res._id}`);
      },
    },
  ];

  const columns = [
    {
      title: "S/N",
      render: (rowData) => {
        const index = TotalTest.findIndex(
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
    <Layout name="Tests" title="Completed Tests">
      <div className="topMargin">
        <Table
          selectID="ID"
          columns={columns}
          data={TotalTest}
          tableActions={actions}
          style={{ width: "90%" }}
        ></Table>
      </div>
    </Layout>
  );
};

export default CompletedTest;

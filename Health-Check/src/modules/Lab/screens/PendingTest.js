import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context";
import Table from "../../../components/Table";
import Layout from "../../../layout";
import StatusColor from "../../../components/StatusColor";
import { useGetSampleDelivered } from "../../Patient/Hooks";

const PendingTest = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const data = useGetSampleDelivered();

  const TotalPend = data?.filter((x) => x?.labScientist?._id === user?.id);

  const actions = () => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/lab/test/${res._id}`);
      },
    },
  ];

  const columns = [
    {
      title: "S/N",
      render: (rowData) => {
        const index = TotalPend.findIndex(
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
    <Layout name="Tests" title="Pending Tests">
      <div className="topMargin">
        <Table
          selectID="ID"
          columns={columns}
          data={TotalPend}
          tableActions={actions}
          style={{ width: "90%" }}
        ></Table>
      </div>
    </Layout>
  );
};

export default PendingTest;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context";
import Layout from "../../../layout";
import Table from "../../../components/Table";
import StatusColor from "../../../components/StatusColor";
import { useGetAppointment } from "../../Admin/hooks";

const CompletedCollection = ({ propId }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const appointmentMe = user?.email;
  const Appoint = useGetAppointment();

 

  const TotalMe = Appoint?.data?.filter(
    (appointment) => appointment?.collector?.email === appointmentMe && appointment?.status === "SampleCollected" 
  );

  

  const actions = () => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/collector/collection/${res._id}`);
      },
    },
  ];

  const columns = [
    {
      title: "S/N",
      render: (rowData) => {
        const index = TotalMe.findIndex(
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
    <Layout name="Collections" title="Completed Collections">
      <div className="topMargin">
        <Table
          selectID="ID"
          columns={columns}
          data={TotalMe}
          tableActions={actions}
          style={{ width: "90%" }}
        ></Table>
      </div>
    </Layout>
  );
};

export default CompletedCollection;

import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context";
import { useGetAppointment } from "../../Admin/hooks";
import Layout from "../../../layout";
import Table from "../../../components/Table";
import StatusColor from "../../../components/StatusColor";

const TotalTest = ({ propId, res }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Appoint = useGetAppointment(propId || id);
  const allAppointments = Appoint?.data || [];
  const appointmentMe = user?.id;

  const TotalMe = allAppointments?.filter(
    (appointment) => appointment?.labScientist?._id === appointmentMe 
  );

  const actions = () => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/lab/test/view/${res._id}`);
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
    <Layout name="Tests" title="Total Tests">
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

export default TotalTest;

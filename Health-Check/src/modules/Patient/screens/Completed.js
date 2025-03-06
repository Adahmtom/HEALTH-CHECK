import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../layout";
import Table from "../../../components/Table";
import { useGetAppointment } from "../../Admin/hooks";
import { AuthContext } from "../../../context";
import StatusColor from "../../../components/StatusColor";

const Completed = ({ propId }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Appoint = useGetAppointment(propId || id);
  const allAppointments = Appoint?.data || [];
  const appointmentMe = user?.id;

  const TotalMe = allAppointments?.filter(
    (appointment) =>
      appointment?.user?._id === appointmentMe &&
      appointment?.status === "Completed"
  );

  const actions = () => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/patient/test/${res._id}`);
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
    <Layout name="Test" title="Completed Tests History">
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

export default Completed;

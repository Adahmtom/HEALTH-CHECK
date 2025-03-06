import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context";
import { useGetAppointment } from "../../Admin/hooks";
import Layout from "../../../layout";
import Table from "../../../components/Table";
import StatusColor from "../../../components/StatusColor";

const TotalOrder = ({ propId, res }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Appoint = useGetAppointment(propId || id);
 
  const allAppointments = Appoint?.data || [];
  const appointmentMe = user?.id;

  const TotalMe = allAppointments?.filter(
    (appointment) => appointment?.dispatcher?._id === appointmentMe
  );

  
  const actions = () => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/dispatcher/order/${res._id}`);
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
      title: "Collector",
      field: "collector.fullname",
    },
    {
      title: "Collector Address",
      field: "collector.address",
    },
    {
      title: "Collector Address",
      field: "collector.phone",
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
    <Layout name="Test" title="Total Orders">
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

export default TotalOrder;

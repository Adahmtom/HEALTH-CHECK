import React from "react";
import {  useNavigate } from "react-router-dom";
import Layout from "../../../layout";
import { useGetAppointment } from "../hooks";
import Table from "../../../components/Table";
import StatusColor from "../../../components/StatusColor";

const All = () => {
  const navigate = useNavigate();
  const Appoint = useGetAppointment();
 

  const actions = () => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/admin/audit/${res._id}`);
      },
    },
  ];

  const columns = [
    {
      title: "S/N",
      render: (rowData) => {
        const index = Appoint?.data.findIndex(
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
      title: "Creation Time",
      field: "createdAt",
      render: (rowData) => rowData.createdAt.replace("T", " AT ").slice(0, -8),
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
    <Layout name="Audit" title="Audits">
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
          data={Appoint?.data}
          tableActions={actions}
        />
      </div>
    </Layout>
  );
};

export default All;

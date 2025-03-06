import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../../layout";
import styles from "../../styles.module.css";
import { useDelUserById, useGetAllUsers } from "../../../Auth/hooks";

import Table from "../../../../components/Table";
import swal from "sweetalert";
import { errorAlert, toastOptions } from "../../../../utils";
import { toast } from "react-toastify";

const Doctors = ({ propId, res }) => {
  const navigate = useNavigate();
 
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers(propId || id);
  const AllDocs = allUsers?.filter((users) => users?.role === "Doctor");

  const {
    mutate: mutateDelete,
    isError: isEDelete,
    isSuccess: isSDelete,
    reset: eReset,
    error: Error,
  } = useDelUserById();

  if (isEDelete) {
    eReset();

    errorAlert(Error);
  }
  if (isSDelete) {
    eReset();
    toast.success(`User Deleted Successfully`, toastOptions);
  }

  const actions = ({ id }) => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/admin/users/doctors/${res._id}`);
      },
    },
    {
      name: "Delete",
      onClick: (res) => {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to restore this",
          icon: "warning",
          //    @ts-ignore
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            mutateDelete(res._id);
          }
        });
      },
    },
  ];

  const columns = [
    {
      title: "S/N",
      render: (rowData) => {
        const index = AllDocs.findIndex((data) => data === rowData);
        return index + 1;
      },
    },
    { title: "Name", field: "fullname" },
    { title: "Email Address", field: "email" },
    { title: "Role", field: "role" },
    { title: "Contact Number", field: "phone" },
  ];
  return (
    <Layout name="Users" title="All Doctors">
      <div className={styles.butt}></div>
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
          data={AllDocs}
          tableActions={actions}
        />
      </div>
    </Layout>
  );
};

export default Doctors;

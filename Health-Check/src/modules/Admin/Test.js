import React from "react";
import Layout from "../../layout";
import { Table } from "mtforms";
import "../../shared/settings.css";
import { useDeleteTest, useGetTest, useUpdateTest } from "./hooks";
import swal from "sweetalert";
import { errorAlert, toastOptions } from "../../utils";
import { toast } from "react-toastify";
import {  AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiTestTube } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const SettingsTest = () => {
  const { data } = useGetTest();
  const { isError, isSuccess, reset, error } = useUpdateTest();

  const actions = (item) => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/admin/settings/test/${res._id}`);
      },
    },
    {
      name: "Delete",
      onClick: (res) => {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this",
          icon: "warning",
          //    @ts-ignore
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            remove(res);
          }
        });
      },
    },
  ];

  if (isError) {
    reset();
    errorAlert(error);
  }
  if (isSuccess) {
    reset();
    toast.success(`Test Updated Successfully`, toastOptions);
  }

  const {
    mutate: remove,
    isError: isEDelete,
    isSuccess: isSDelete,
    reset: eReset,
    error: Error,
  } = useDeleteTest();

  if (isEDelete) {
    eReset();

    errorAlert(Error);
  }
  if (isSDelete) {
    eReset();
    toast.success(`Test Deleted Successfully`, toastOptions);
   
  }
  const navigate = useNavigate();
  const openHandler = () => {
    navigate("/app/admin/settings/test/create");
  };

  const columns = [
    {
      title: "S/N",
      render: (rowData) => {
        const index = data.findIndex((data) => data === rowData);
        return index + 1;
      },
    },
    { title: "Test", field: "name" },
  ];
  return (
    <Layout name="Settings" title="Test">
      <div className="title">
        <span className="ams__icon">
          <BiTestTube />
        </span>
        Add Test
        <span className="companyName">
          <AiOutlineAppstoreAdd
            className="ams__icon_btns"
            onClick={openHandler}
          />
        </span>
      </div>

      <div className="table_div">
        <Table
          data={data}
          actions={actions}
          selectID="_id"
          showFilter={false}
          columns={columns}
        ></Table>
      </div>
    </Layout>
  );
};

export default SettingsTest;

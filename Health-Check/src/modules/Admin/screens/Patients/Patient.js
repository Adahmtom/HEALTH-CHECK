import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../../layout";
import {
  useDelUserById,
  useGetAllUsers,
  useUploadBulkUser,
} from "../../../Auth/hooks";
import Table from "../../../../components/Table";
import "../../../../shared/settings.css"
import style from "../../../Collector/screens/styles.module.css";
import swal from "sweetalert";
import { errorAlert, toastOptions } from "../../../../utils";
import { toast } from "react-toastify";
import {  AiOutlineUser,AiOutlineAppstoreAdd } from "react-icons/ai";
import {  useIsMutating } from "@tanstack/react-query";
import Modal from "../../../../components/Modal";
import { useState } from "react";
import template from "../../../../assets/RHC_users.xlsx"

const Patient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers(id);
  const AllPat = allUsers?.filter((users) => users?.role === "Requester");
  const [open, setOpen] = useState(false);
  const [bulk, setBulk] = useState({});
  const isLoading = useIsMutating();
 
  const {mutate,reset,isError,error, isSuccess} = useUploadBulkUser()
 
  const closeHandler = () => {
    setOpen(false);
   
  };

  const addFile = (file) => {
    if (!file) {
      swal("Please select a file");
      return;
    }
  
    if (file.size > 5 * 1024 * 1024) {
      swal("File is too large (maximum size is 5MB)");
      return;
    }
  
    
    setBulk(file)
    
  };

  const openHandler = () => {
    setOpen(true);
  };

 const submitHandler = () =>{
   mutate(bulk)
  // console.log(bulk,"from handler")
 } 

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

  if (isSuccess) {
    reset();
    toast.success(`User Added Successfully`, toastOptions);
    setOpen(false)
  }
  if (isError) {
    reset();
    errorAlert(error, toastOptions);
    setOpen(false)
  }

  const actions = () => [
    {
      name: "View",
      onClick: (res) => {
        navigate(`/app/admin/users/patients/${res._id}`);
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
        const index = AllPat.findIndex((data) => data === rowData);
        return index + 1;
      },
    },
    { title: "Name", field: "fullname" },
    { title: "Email Address", field: "email" },
    { title: "Role", field: "role" },
    { title: "Contact Number", field: "phone" },
  ];
  return (
    <Layout name="Users" title="All Patients">
     
      <div className="title">
        <span className="ams__icon">
          <AiOutlineUser />
        </span>
        Add Patient
        <span className="companyName">
          <AiOutlineAppstoreAdd
            className="ams__icon_btns"
            onClick={openHandler}
          />
        </span>
      </div>
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
          data={AllPat}
          tableActions={actions}
        />
      </div>

      <Modal
        isVisible={open}
        title={""}
        size="md"
        content={
          <div className="modal_form_container">
            {isLoading ? (
              "Uploading Document..."
            ) : (
              <div>
                <h3>Upload a bulk excel document of list of patients, you can download the template <a href={template}>here</a> </h3>
                
                <input
                      className={style.buttons}
                      type="file"
                      accept=".xls, .xlsx" // Specify the file types you want to accept
                      onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        addFile(selectedFile);
                      }}
                      disabled={isLoading ? true : false}
                    />
                    <button className={style.buttons}  disabled={isLoading ? true : false} style={{marginLeft:"20px", marginTop:"10px"}} onClick={submitHandler}>submit</button>
              </div>
            )}
          </div>
        }
        onClose={closeHandler}
        footer=""
      />
    </Layout>
  );
};

export default Patient;

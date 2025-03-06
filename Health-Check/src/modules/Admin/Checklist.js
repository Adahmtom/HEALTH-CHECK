import React from "react";
import Layout from "../../layout";
import Modal from "../../components/Modal";
import { Table, Input, Button } from "mtforms";
import { useState } from "react";
import { useIsMutating } from "@tanstack/react-query";
import "../../shared/settings.css";
import {
  useAddChecklist,
  useDeleteChecklist,
  useGetChecklist,
  useUpdateChecklist,
} from "./hooks";
import swal from "sweetalert";
import { errorAlert, toastOptions } from "../../utils";
import { toast } from "react-toastify";
import { FormGroup } from "@material-ui/core";
import { AiOutlineCheckSquare, AiOutlineAppstoreAdd } from "react-icons/ai";

const SettingsChecklist = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const isLoading = useIsMutating();
  const { data } = useGetChecklist();

  const { mutate, isError, isSuccess, reset, error } = useUpdateChecklist();
  const {
    mutate: addChecklist,
    isError: addError,
    isSuccess: isSuccessAdd,
    reset: resetAdd,
    error: errorAdd,
  } = useAddChecklist();

  const actions = (item) => [
    {
      name: "Edit",
      onClick: (res) => {
        setFormData(res);
        setEdit(true);

        setOpen(true);
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

  const submitHandler = () => {
    if (edit === true) {
      mutate(formData);
    } else {
      addChecklist(formData);
    }
  };

  const closeHandler = () => {
    setOpen(false);
    setFormData({});
    setEdit(false);
  };

  if (isError) {
    reset();
    errorAlert(error);
  }
  if (isSuccess) {
    reset();
    setOpen(false);
    setFormData({});
    setEdit(false);
    toast.success(`Checklist Updated Successfully`, toastOptions);
  }

  if (addError) {
    resetAdd();
    errorAlert(errorAdd);
  }
  if (isSuccessAdd) {
    setFormData({});
    setOpen(false);
    resetAdd();
    setLoading(false);
  }

  const {
    mutate: remove,
    isError: isEDelete,
    isSuccess: isSDelete,
    reset: eReset,
    error: Error,
  } = useDeleteChecklist();

  if (isEDelete) {
    eReset();

    errorAlert(Error);
  }
  if (isSDelete) {
    eReset();
    toast.success(`Checklist Deleted Successfully`, toastOptions);
  }

  const openHandler = () => {
    setOpen(true);
  };
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const validationHandler = (name, error) => {
    setErrors({ ...errors, [name]: error });
  };

  const columns = [{ title: "Checklist", field: "name" }];
  return (
    <Layout name="Settings" title="Checklist">
      <div className="title">
        <span className="ams__icon">
          <AiOutlineCheckSquare />
        </span>
        Add Checklist
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

      <Modal
        isVisible={open}
        title={""}
        size="md"
        content={
          <div className="modal_form_container">
            {loading ? (
              "fetching your current Checklist"
            ) : (
              <FormGroup
                validation={formData}
                errors={errors}
                setErrors={setErrors}
                className="Form"
              >
                <Input
                  name="name"
                  label="name"
                  value={formData["name"]}
                  onChange={handleChange}
                  type="text"
                  validationHandler={validationHandler}
                  error={errors.name}
                  required={true}
                  readOnly={true}
                  size="large"
                  className="formInput"
                />
                <Button
                  size="large"
                  onClick={submitHandler}
                  title={isLoading ? "submitting" : "Save"}
                  disabled={isLoading ? true : false}
                  className="formButton"
                />
              </FormGroup>
            )}
          </div>
        }
        onClose={closeHandler}
        footer=""
      />
    </Layout>
  );
};

export default SettingsChecklist;

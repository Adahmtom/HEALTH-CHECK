import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatchAcceptOrder, useGetAppointmentById } from "../Admin/hooks";
import Layout from "../../layout";
import { useGetAllUsers } from "../Auth/hooks";
import { useState } from "react";
import AvailableOrderCard from "../../components/Collector Card/availableOrder";
import Modal from "../../components/Modal";
import { useIsMutating } from "@tanstack/react-query";
import DispatcherCard from "../../components/Pat Card/dispatcherCard";
import styles from "../Dispatcher/screens/styles.module.css";

const AvailableOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: appointment } = useGetAppointmentById(id);

  const { data: allUsers } = useGetAllUsers();
  const data = allUsers?.filter((x) => x.role === "Lab");
  const cardsPerPage = 12;
  const totalPages = Math.ceil((data?.length || 0) / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);
  const closeHandler = () => {
    setOpen(false);
  };
  const isLoading = useIsMutating();
  const { mutate, isSuccess,reset } = useDispatchAcceptOrder();
  const submitHandler = () => {
    const newData = { ...formData, appointmentID: id };
    mutate(newData);
  };

  if (isSuccess) {
    setOpen(false)
   reset()
    navigate("/app/dispatcher/order/pending")
  }

  return (
    <Layout name="Orders" title="Order Details">
      <div className={styles.butt}>
        <button className="buttonsall" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
      <div>
        <DispatcherCard
          fullname={appointment?.collector?.fullname || "FullName"}
          address={appointment?.collector?.address || "Address"}
          phone={appointment?.collector?.phone || "Phone"}
          email={appointment?.collector?.email || "Email"}
        />

        <h3 style={{ fontSize: "14px", marginLeft: "2%" }}>
          Choose nearby lab location to deliver to
        </h3>
        {data && data.length > 0 ? (
          <div className="cardFlex">
            {data.slice(startIndex, endIndex).map((x, index) => (
              <AvailableOrderCard
                key={index}
                title={x.fullname}
                patient_name={x.phone}
                patient_location={x.address}
                formData={formData}
                setFormData={setFormData}
                open={open}
                setOpen={setOpen}
                ID={x._id}
              />
            ))}
          </div>
        ) : (
          <div className="no-orders-message">
            No available lab at the moment
          </div>
        )}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <Modal
        isVisible={open}
        title={""}
        size="md"
        content={
          <div className="modal_form_container">
            <div style={{ padding: "2% 4%" }}>
              <h3 style={{ marginBottom: "20px", fontSize: "16px" }}>
                Order Details
              </h3>
              <h4 style={{ marginBottom: "5px", fontSize: "14px" }}>
                Collectors Name :{" "}
                {appointment?.collector?.fullname || "FullName"}
              </h4>
              <h4 style={{ marginBottom: "5px", fontSize: "14px" }}>
                Collectors Address:{" "}
                {appointment?.collector?.address || "Address"}
              </h4>
              <h4 style={{ marginBottom: "5px", fontSize: "14px" }}>
                Collectors Phone: {appointment?.collector?.phone || "Phone"}
              </h4>
              <h4 style={{ marginBottom: "5px", fontSize: "14px" }}>
                Lab Name: {formData?.name}
              </h4>
              <h4 style={{ marginBottom: "5px", fontSize: "14px" }}>
                Lab Address: {formData?.location}
              </h4>
              <h4 style={{ marginBottom: "5px", fontSize: "14px" }}>
                Lab Phone:{formData?.phone}
              </h4>
            </div>

            <button
              size="large"
              onClick={submitHandler}
              disabled={isLoading ? true : false}
              className="buttonsall"
            >
              Accept Order
            </button>
          </div>
        }
        onClose={closeHandler}
        footer=""
      />
    </Layout>
  );
};

export default AvailableOrder;

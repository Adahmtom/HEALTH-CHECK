import React, { useState } from "react";
import CollectorCard from "../../components/Collector Card";
import Layout from "../../layout";
import WelcomeBoard from "../../components/Welcome board";
import { useIsMutating } from "@tanstack/react-query";
import { useGetAppointmentByPending } from "../Patient/Hooks";

const CollectorDashbaord = () => {
  const appointmentData = useGetAppointmentByPending();
  const data = appointmentData;
  const cardsPerPage = 12;
  const totalPages = Math.ceil((data?.length || 0) / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of cards to display for the current page
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const loading = useIsMutating();
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  

  return (
    <Layout name="Appointment" title="Available Appointments">
      <WelcomeBoard />
      {loading ? (
        "Loading Available Appointment"
      ) : (
        <div className="cardFlex">
          {data?.slice(startIndex, endIndex).map((x, index) => (
            <CollectorCard
              key={index}
              title={x.test?.name}
              patient_name={x.user?.fullname}
              patient_location={x.user?.address}
              appointment_date={x.preferredDate}
              appointment_time={x.preferredTime}
              id={x._id}
              linkTo={`/app/collector/appointment/available/${x._id}`}
            />
          ))}
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
    </Layout>
  );
};

export default CollectorDashbaord;

import React, { useState } from "react";
import Layout from "../../layout";
import WelcomeBoard from "../../components/Welcome board";
import SampleCollectorCard from "../../components/Collector Card/sampleCollectorCard";
import { useGetAppointment } from "../Patient/Hooks";

const DispatchDashbaord = () => {
  const available = useGetAppointment();
  const data = available?.data?.filter((x)=> x.status === "SampleCollected")


  const cardsPerPage = 12;
  const totalPages = Math.ceil((data?.length || 0) / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Layout name="Orders" title="Available Orders">
      <WelcomeBoard />
      {data && data.length > 0 ? ( // Check if there's data to display
        <div className="cardFlex">
          {data.slice(startIndex, endIndex).map((x, index) => (
            <SampleCollectorCard
              key={index}
              title={x.collector?.fullname}
              patient_location={x.collector?.address}
              patient_num={x.collector?.phone}
              id={x._id}
              linkTo={`/app/dispatcher/order/available/${x._id}`}
            />
          ))}
        </div>
      ) : (
        <div className="no-orders-message">
          No orders available at the moment
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

export default DispatchDashbaord;

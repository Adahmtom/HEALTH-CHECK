import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import UsersCard from "../../../../components/Users Card";
import { useGetAllUsers } from "../../../Auth/hooks";
import Layout from "../../../../layout";

const ViewCollector = () => {
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers();
  const AllDocs = allUsers?.find((docs) => docs?._id === id);
  const handleGoBack = () => {
    navigate(-1);
  };

 
  const navigate = useNavigate();

  return (
    <>
      <Layout name="Users" title="View Collector">
        <div className={styles.butt}>
          <button className="buttonsall" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
        <UsersCard
          fullname={AllDocs?.fullname || "FullName"}
          address={AllDocs?.address || "Address"}
          phone={AllDocs?.phone || "Phone"}
          email={AllDocs?.email || "Email"}
          gender={AllDocs?.gender || "Gender"}
          role={AllDocs?.role || "Email"}
          DOB={AllDocs?.DOB || "Date of Birth"}
          emergencyPhone={AllDocs?.emergencyPhone || "Emergency Contact"}
        />
      </Layout>
    </>
  );
};

export default ViewCollector;

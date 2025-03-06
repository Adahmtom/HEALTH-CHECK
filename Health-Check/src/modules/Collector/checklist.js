import React, {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../Patient/styles.module.css";
import PatienceCard from "../../components/Pat Card";
import Checklist from "../../components/Checklist";
import {
  useGetAppointmentById,
  useUpdateAppointmentActionById,
} from "../Admin/hooks";
import Layout from "../../layout";
import { useIsMutating } from "@tanstack/react-query";
import { errorAlert } from "../../utils";
import swal from "sweetalert";
import { useGetMe } from "../Auth/hooks";

const TotalTest = () => {
  const isLoading = useIsMutating();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: appointment } = useGetAppointmentById(id);
  const data = useGetMe();

  const handleGoBack = () => {
    navigate(-1);
  };

  const checkedItemsData =
    appointment?.test?.checkList?.map((x) => x.name) || [];
  const initialChecklist = checkedItemsData;
  const [checkedItems, setCheckedItems] = useState(initialChecklist);
  const { mutate, reset, isError, error } =
    useUpdateAppointmentActionById();

  const isAddressAndPhoneValid =
    data?.data?.address && data?.data?.phone ? true : false;

  const submitHandler = (e) => {
    e.preventDefault();
    if (isAddressAndPhoneValid === false) {
      return swal("Kindly update your address and Phone number ");
    }

    mutate(id);
  };

  

  if (isError) {
    errorAlert(error);
    reset();
  }
 

  return (
    <Layout name="Appointment" title="Appointment Details">
      <div className={styles.butt}>
        <button className="buttonsall" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
      <div>
        <PatienceCard
          fullname={appointment?.user?.fullname || "FullName"}
          address={appointment?.user?.address || "Address"}
          DOB={appointment?.user?.DOB || "DOB"}
          test={appointment?.test?.name || "Test"}
          phone={appointment?.user?.phone || "Phone"}
          appointmentDate={appointment?.appointmentDate || "Appointment Date"}
          email={appointment?.user?.email || "Email"}
          appointmentTime={appointment?.appointmentTime || "Appointment Time"}
        />
        <div className="topMargin">
        <div className={styles.sample_formcontainer}>
          <form onSubmit={submitHandler}>
            <Checklist
              checklist={initialChecklist}
              setCheckedItems={setCheckedItems}
            />
            {/* <SampleInput data={sample} formData={formData} setFormData={setFormData}/> */}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.buttons}
              style={{ marginTop: "50px", marginLeft: "30px" }}
            >
              {isLoading ? "Loading" : "Accept Appointment"}
            </button>
          </form>
        </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default TotalTest;

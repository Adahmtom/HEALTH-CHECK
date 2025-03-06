import React from 'react'
import style from "./styles.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAppointment } from "../hooks";
import Layout from '../../../layout';
import ProgressStatus from '../../../components/Progress status';
import { formatDate } from '../../../utils/formatDate';

const View = () => {

    const { id } = useParams();
  const { data: appointments } = useGetAppointment();
  const appointment = appointments?.find((appt) => appt?._id === id);
  const currentStat = appointment?.status;
  

  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();
  return (
    <Layout name="Dashboard" title="Appointment Audit">
    <div className={style.butt}>
      <button className="buttonsall" onClick={handleGoBack}>
        Go Back
      </button>
    </div>

    <ProgressStatus status={currentStat} />
    <div className={style.container}>
        <div className={style.section}>
            <h2>Patient Name</h2>
            <p>{appointment?.user?.fullname}</p>
        </div>
        <div className={style.section}>
            <h2>Patient Email</h2>
            <p>{appointment?.user?.email}</p>
        </div>
        <div className={style.section}>
            <h2>Patient Address</h2>
            <p>{appointment?.user?.address}</p>
        </div>
        <div className={style.section}>
            <h2>Patient Phone</h2>
            <p>{appointment?.user?.phone}</p>
        </div>
        <div className={style.section}>
            <h2>Appointment Creation Time</h2>
            <p>{formatDate(appointment?.createdAt) }</p>
        </div>
        <div className={style.section}>
            <h2>Appointment Schedule Date</h2>
            <p>{appointment?.appointmentDate}</p>
        </div>
        <div className={style.section}>
            <h2>Appointment Schedule Time</h2>
            <p>{appointment?.appointmentTime}</p>
        </div>
        <div className={style.section}>
           
        </div>
        <div className={style.section}>
            <h2>Sample Collector Name</h2>
            <p>{appointment?.collector?.fullname}</p>
        </div>
        <div className={style.section}>
            <h2><h2>Sample Collector Email</h2></h2>
            <p>{appointment?.collector?.email}</p>
        </div>
        <div className={style.section}>
            <h2>Appointment Accepted</h2>
            <p>{formatDate(appointment?.order_accepted_at)}</p>
        </div>
        <div className={style.section}>
            <h2>Sample Collected</h2>
            <p>{formatDate(appointment?.sample_collected_at)}</p>
        </div>

        <div className={style.section}>
            <h2>Medical Dispatcher Name</h2>
            <p>{appointment?.dispatcher?.fullname}</p>
        </div>
        <div className={style.section}>
            <h2><h2>Medical Dispatcher Email</h2></h2>
            <p>{appointment?.dispatcher?.email}</p>
        </div>
        <div className={style.section}>
            <h2>Dispatcher Accept Order </h2>
            <p>{formatDate(appointment?.dispatch_order_accepted_at)}</p>
        </div>
        <div className={style.section}>
            <h2>Dispatcher Collect Sample </h2>
            <p>{formatDate(appointment?.dispatch_collected_sample_at)}</p>
        </div>


        <div className={style.section}>
            <h2>Medical Lab Name</h2>
            <p>{appointment?.labScientist?.fullname}</p>
        </div>
        <div className={style.section}>
            <h2><h2>Medical Lab Email</h2></h2>
            <p>{appointment?.labScientist?.email}</p>
        </div>
        <div className={style.section}>
            <h2>Lab Received Sample At</h2>
            <p>{formatDate(appointment?.dispatch_delivered_sample_at)}</p>
        </div>
        <div className={style.section}>
            <h2>Test Result Uploaded</h2>
            <p>{formatDate(appointment?.test_completed_at)}</p>
        </div>
        
        <div className={style.section}>
            <h2>Doctor Name</h2>
            <p>{appointment?.doctor?.fullname}</p>
        </div>
        <div className={style.section}>
            <h2><h2>Doctor Email</h2></h2>
            <p>{appointment?.doctor?.email}</p>
        </div>
        <div className={style.section}>
            <h2>Doctor Remark</h2>
            <p>{formatDate(appointment?.completed_at)}</p>
        </div>
        

    </div>
    </Layout>
  )
}

export default View
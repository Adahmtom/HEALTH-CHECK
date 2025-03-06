import { useContext } from "react";
import { AuthContext } from "../../../context";
import { useParams } from "react-router-dom";
import {
  useGetAppointment,
  useGetAppointmentByAccepted,
  useGetAppointmentByCompleted,
  useGetAppointmentByPending,
  useGetDispatchCollectSample,

} from "../../Patient/Hooks";

export const CollectorAvailable = () => {
  const appointmentData = useGetAppointmentByPending();
  const data = appointmentData;

  return { total: data?.length };
};

export const CollectorCompleted = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const appointmentMe = user?.id;
  const Appoint = useGetDispatchCollectSample(id);
  const TotalMe = Appoint?.filter(
    (appointment) => appointment?.collector?._id === appointmentMe || []
  );

  return { total: TotalMe?.length };
};


export const TotalConsultation = () => {
  const Appoint = useGetAppointmentByCompleted();
  
  const { user } = useContext(AuthContext);
 
  const  PendAppoint =  Appoint?.filter(
      (appointment) => appointment?.doctor?.email ===  user?.email 
    ) ;
   
  return { total: PendAppoint?.length };
};

export const CollectorPending = () => {
  const { user } = useContext(AuthContext);
  
  const appointmentMe = user?.id;
  const Appoint = useGetAppointmentByAccepted();
  const TotalMe = Appoint?.filter(
    (appointment) => appointment?.collector?._id === appointmentMe || []
  );

  return { total: TotalMe?.length };
};

export const CollectorSampleTaken = () => {
  const { user } = useContext(AuthContext);
 
  const Appoint = useGetAppointment();
  const appointmentMe = user?.id;
  const RequestTotal =
    Appoint?.data?.filter(
      (appointment) => appointment?.dispatcher?._id === appointmentMe
    ) || [];

  return { total: RequestTotal?.length };
};

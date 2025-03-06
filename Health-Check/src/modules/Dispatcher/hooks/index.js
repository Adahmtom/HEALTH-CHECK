import { useContext } from "react";
import { AuthContext } from "../../../context";
import { useParams } from "react-router-dom";
import {
  useGetAppointment,
  useGetDispatchAcceptOrder,
  useGetSampleDelivered,
} from "../../Patient/Hooks";

export const DispatchAvailable = () => {
  
  
  const available = useGetAppointment();
  const data = available?.data?.filter((x)=> x.status === "SampleCollected")
 

  return { total: data?.length };
};

export const DispatchCompleted = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Appoint = useGetSampleDelivered(id);
  const appointmentMe = user?.id;

  const TotalMe = Appoint?.filter(
    (appointment) => appointment?.dispatcher?._id === appointmentMe
  );

  return { total: TotalMe?.length };
};

export const DispatchPending = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Appoint = useGetDispatchAcceptOrder(id);
  const appointmentMe = user?.id;
  const TotalMe = Appoint?.filter(
    (appointment) => appointment?.dispatcher?._id === appointmentMe || []
  );

  return { total: TotalMe?.length };
};

export const TotalOrder = () => {
  const { user } = useContext(AuthContext);
  const Appoint = useGetAppointment();
  const appointmentMe = user?.id;
  const RequestTotal =
    Appoint?.data?.filter(
      (appointment) => appointment?.dispatcher?._id === appointmentMe
    ) || [];

  return { total: RequestTotal?.length };
};

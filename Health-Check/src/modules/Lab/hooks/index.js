import { useParams } from "react-router-dom";
import {
  useGetAppointmentByTestCompleted,
  useGetDispatchCollectSample,
  useGetSampleDelivered,
} from "../../Patient/Hooks";
import { AuthContext } from "../../../context";
import { useContext } from "react";

export const LabPending = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Appoint = useGetSampleDelivered(id);
  const appointmentMe = user?.id;
  const TotalPend = Appoint?.filter(
    (appointment) => appointment?.labScientist?._id === appointmentMe
  );
  return { total: TotalPend?.length };
};

export const LabCompleted = () => {
  const { user } = useContext(AuthContext);
  const data = useGetAppointmentByTestCompleted();
  const appointmentMe = user?.email;
  const TotalTest = data?.filter(
    (appointment) => appointment?.labScientist?.email === appointmentMe
  );

  return { total: TotalTest?.length };
};

export const LabAvailableTest = () => {
  const dataSample = useGetDispatchCollectSample();

  const TotalTest = dataSample;
  return { total: TotalTest?.length };
};

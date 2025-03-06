import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context";
import {
  useGetAppointment,
  useGetChecklist,
  useGetSample,
  useGetTest,
} from "../modules/Admin/hooks";
import { useGetAllUsers } from "../modules/Auth/hooks";

export const useCompleted = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Appoint = useGetAppointment(id);
  const allAppointments = Appoint?.data || [];
  const appointmentMe = user?.id;

  const TotalMe = allAppointments?.filter(
    (appointment) =>
      appointment?.user?._id === appointmentMe &&
      appointment?.status === "Completed"
  );

  return { total: TotalMe?.length };
};

export const useAllApp = () => {
  const { id } = useParams();
  const Appoint = useGetAppointment(id);
  const allAppointments =
    Appoint?.data?.filter(
      (appointment) => appointment?.status === "AppointmentAccepted"
    ) || [];

  return { total: allAppointments?.length };
};

export const CompTest = () => {
  const { id } = useParams();
  const Appoint = useGetAppointment(id);
  const allAppointments =
    Appoint?.data?.filter(
      (appointment) => appointment?.status === "Completed"
    ) || [];

  return { total: allAppointments?.length };
};

export const usePending = () => {
  const Appoint = useGetAppointment();
  const allAppointments =
    Appoint?.data?.filter(
      (appointment) => appointment?.status !== "Completed"
    ) || [];

  return { total: allAppointments?.length };
};

export const useAll = () => {
  const Appoint = useGetAppointment();
  const allAppointments = Appoint?.data || [];
  return { total: allAppointments?.length };
};

export const useAllTest = () => {
  const { data } = useGetTest();
  const allAppointments = data || [];

  return { total: allAppointments?.length };
};

export const AllDoc = ({ propId, res }) => {
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers(propId || id);
  const AllDocs = allUsers?.filter((users) => users?.role === "Doctor");

  return { total: AllDocs?.length };
};

export const AllCollector = ({ propId, res }) => {
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers(propId || id);
  const AllColl = allUsers?.filter(
    (users) => users?.role === "SampleCollectionExpert"
  );

  return { total: AllColl?.length };
};

export const AllUsers = ({ propId, res }) => {
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers(propId || id);

  return { total: allUsers?.length };
};

export const AllPatient = ({ propId, res }) => {
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers(propId || id);
  const AllPat = allUsers?.filter((users) => users?.role === "Requester");

  return { total: AllPat?.length };
};

export const AllLab = ({ propId, res }) => {
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers(propId || id);
  const AllLab = allUsers?.filter((users) => users?.role === "Lab");

  return { total: AllLab?.length };
};

export const AllDispatch = ({ propId, res }) => {
  const { id } = useParams();
  const { data: allUsers } = useGetAllUsers(propId || id);
  const AllDispatcher = allUsers?.filter(
    (users) => users?.role === "MedicalDispatcher"
  );

  return { total: AllDispatcher?.length };
};

export const AllChecklist = () => {
  const allChecks = useGetChecklist();
  const AllCh = allChecks?.data || [];

  return { total: AllCh?.length };
};

export const AllSample = () => {
  const allChecks = useGetSample();
  const Allsamp = allChecks?.data || [];

  return { total: Allsamp?.length };
};

export const AllTest = () => {
  const allChecks = useGetSample();
  const Allsamp = allChecks?.data || [];

  return { total: Allsamp?.length };
};

// Logic Dashboard for Requester

export const ReqTotal = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Appoint = useGetAppointment(id);
  const allAppointments = Appoint?.data || [];
  const appointmentMe = user?.id;

  const TotalMe = allAppointments?.filter(
    (appointment) => appointment?.user?._id === appointmentMe
  );
  return { total: TotalMe?.length };
};

export const ReqPend = () => {
  const { user } = useContext(AuthContext);
  const appointmentMe = user?.id;
  const Appoint = useGetAppointment();
  const allAppointments = Appoint?.data || [];
  const TotalMe = allAppointments?.filter(
    (appointment) =>
      appointment?.user?._id === appointmentMe &&
      appointment?.status === "Pending"
  );

  return { total: TotalMe?.length };
};

export const ReqComp = () => {
  const { user } = useContext(AuthContext);
  const appointmentMe = user?.id;
  const Appoint = useGetAppointment();
  const allAppointments = Appoint?.data || [];
  const TotalMe = allAppointments?.filter(
    (appointment) =>
      appointment?.user?._id === appointmentMe &&
      appointment?.status === "Completed"
  );

  return { total: TotalMe?.length };
};

export const ReqResults = () => {
  const Appoint = useGetAppointment();

  const RequestTotal =
    Appoint?.data?.filter(
      (appointment) => appointment?.status === "TestAvailable"
    ) || [];

  return { total: RequestTotal?.length };
};

// Logic Dashboard for Doctor
export const DocTotal = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Appoint = useGetAppointment(id);
  const allAppointments = Appoint?.data || [];
  const appointmentMe = user?.id;
  const TotalMe = allAppointments?.filter(
    (appointment) => appointment?.doctor?._id === appointmentMe
  );

  return { total: TotalMe?.length };
};

export const DocPend = () => {
  
  const { id } = useParams();
  const Appoint = useGetAppointment(id);
 
  const DPend =
    Appoint?.data?.filter(
      (appointment) => appointment?.status === "TestCompleted"
    ) || [];

  return { total: DPend?.length };
};

export const ResComp = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const Appoint = useGetAppointment(id);
  const appointmentMe = user?.id;
  const DCompleted =
    Appoint?.data?.filter(
      (appointment) =>
        appointment?.doctor?._id === appointmentMe &&
        appointment?.status === "Completed"
    ) || [];

  return { total: DCompleted?.length };
};

export const AvailableConsults = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Appoint = useGetAppointment(id);
  const allAppointments = Appoint?.data || [];
  const appointmentMe = user?.role === "Doctor" && user?.id;
  const TotalMe = allAppointments?.filter(
    (appointment) => appointment?.user?._id === appointmentMe
  );
  return { total: TotalMe?.length };
};

// Logic Dashboard for Dispatcher
export const AvailCollection = () => {
  const Appoint = useGetAppointment();
  const allAppointments = Appoint?.data || [];
  const RequestTotal = allAppointments.filter((x) => x.status === "Pending");

  return { total: RequestTotal?.length };
};
export const PendCollection = () => {
  const { user } = useContext(AuthContext);
  const Appoint = useGetAppointment();
  const appointmentMe = user?.id;
  const RequestTotal =
    Appoint?.data?.filter(
      (appointment) =>
        appointment?.collector?._id === appointmentMe &&
        appointment?.status === "AppointmentAccepted"
    ) || [];

  return { total: RequestTotal?.length };
};

export const CompCollection = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Appoint = useGetAppointment(id);
  const appointmentMe = user?.id;
  const RequestTotal =
    Appoint?.data?.filter(
      (appointment) =>
        appointment?.collector?._id === appointmentMe &&
        appointment?.status === "SampleCollected"
    ) || [];

  return { total: RequestTotal?.length };
};

export const SampleTaken = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const Appoint = useGetAppointment(id);
  const appointmentMe = user?.id;
  const RequestTotal =
    Appoint?.data?.filter(
      (appointment) => appointment?.collector?._id === appointmentMe
    ) || [];

  return { total: RequestTotal?.length };
};

// Logic Dashboard for Collector
export const TotalLab = () => {
  const { user } = useContext(AuthContext);
 
  const Appoint = useGetAppointment();
  const appointmentMe = user?.id;
  const RequestTotal =
    Appoint?.data?.filter(
      (appointment) => appointment?.labScientist?._id === appointmentMe
    ) || [];

  return { total: RequestTotal?.length };
};

export const PendingLab = () => {
  const { user } = useContext(AuthContext);
  
  const Appoint = useGetAppointment();
  const appointmentMe = user?.id;
  const RequestTotal =
    Appoint?.data?.filter(
      (appointment) =>
        appointment?.labScientist?._id === appointmentMe &&
        appointment.status === "SampleDelivered"
    ) || [];

  return { total: RequestTotal?.length };
};

export const CompletedLab = () => {
  const { user } = useContext(AuthContext);
 
  const Appoint = useGetAppointment();
  const appointmentMe = user?.role === user?.id;
  const RequestTotal =
    Appoint?.data?.filter(
      (appointment) =>
        appointment?.status === "TestCompleted" &&
        appointment?.collector?._id === appointmentMe
    ) || [];

  return { total: RequestTotal?.length };
};

export const AvailableResults = () => {
  
  
  const Appoint = useGetAppointment();
 
  const RequestTotal =
    Appoint?.data?.filter(
      (appointment) => appointment?.status === "DispatchCollectSample"
    ) || [];

  return { total: RequestTotal?.length };
};

// Logic Dashboard for LAb
export const PendingOrder = () => {
  const { user } = useContext(AuthContext);
 
  const Appoint = useGetAppointment();
 
  const RequestTotal =
    Appoint?.data?.filter(
      (appointment) =>
        appointment?.dispatcher?._id === user.id &&
        appointment?.status === "DispatchAcceptOrder"
    ) || [];

  return { total: RequestTotal?.length };
};
export const CompletedOrder = () => {
  const { user } = useContext(AuthContext);
 
  const Appoint = useGetAppointment();
  const appointmentMe = user?.id;
  const RequestTotal =
    Appoint?.data?.filter(
      (appointment) =>
        appointment?.dispatcher?._id === appointmentMe &&
        appointment.status === "SampleDelivered"
    ) || [];

  return { total: RequestTotal?.length };
};
export const AvailableOrder = () => {
  
 
  const Appoint = useGetAppointment();
 
  const RequestTotal =
    Appoint?.data?.filter(
      (appointment) => appointment.status === "SampleCollected"
    ) || [];

  return { total: RequestTotal?.length };
};

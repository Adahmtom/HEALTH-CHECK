import { axiosInstance } from "../../../axios-Instance";
import { useQuery } from "@tanstack/react-query";
import { toastOptions } from "../../../utils";
import { getLoginToken } from "../../../storage";
import { queryKeys } from "../../../react-query/constants";
import { toast } from "react-toastify";


async function getAppointment() {
  const data = await axiosInstance({
    url: "/appointment",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetAppointment() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.appointment],
    queryFn: () => getAppointment(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getAppointmentByPending() {
  const data = await axiosInstance({
    url: "/appointment/pendingStatus",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetAppointmentByPending() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.pending],
    queryFn: () => getAppointmentByPending(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getAppointmentByCompleted() {
  const data = await axiosInstance({
    url: "/appointment/completedStatus",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetAppointmentByCompleted() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.completed],
    queryFn: () => getAppointmentByCompleted(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}
async function getAppointmentByTestCompleted() {
  const data = await axiosInstance({
    url: "/appointment/testCompletedStatus",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useGetAppointmentByTestCompleted() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.testCompleted],
    queryFn: () => getAppointmentByTestCompleted(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getAppointmentByAccepted() {
  const data = await axiosInstance({
    url: "/appointment/appointmentAcceptedStatus",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data?.data;
}

export function useGetAppointmentByAccepted() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.appointmentAccepted],
    queryFn: () => getAppointmentByAccepted(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getDispatchhAcceptOrder() {
  const data = await axiosInstance({
    url: "/appointment/dispatchAcceptOrderStatus",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data?.data;
}

export function useGetDispatchAcceptOrder() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.dispatchAcceptOrder],
    queryFn: () => getDispatchhAcceptOrder(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getDispatchCollectSample() {
  const data = await axiosInstance({
    url: "/appointment/dispatchCollectSampleStatus",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  
  return data;
}

export function useGetDispatchCollectSample() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.collectSample],
    queryFn: () => getDispatchCollectSample(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
 
  return data?.data;
}

async function getSampleDelivered() {
  const data = await axiosInstance({
    url: "/appointment/sampleDeliveredStatus",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data?.data;
}

export function useGetSampleDelivered() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.sampleDelivered],
    queryFn: () => getSampleDelivered(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

// Query API for appointments
export const PendingAppoints = () => {
  const Appoint = useGetAppointment();

  const allAppointments =
    Appoint?.data?.filter(
      (appointment) => appointment?.status !== "Completed"
    ) || [];
  return { total: allAppointments?.length };
};

export const CompletedAppoints = () => {
  const Appoint = useGetAppointment();

  const allAppointments =
    Appoint?.data?.filter(
      (appointment) => appointment?.status === "Completed"
    ) || [];
   
  return { total: allAppointments?.length };
 
};

export const TotalAppoints = () => {
  const data = useGetAppointment();
  // const PendAppoint = data?.data || [];
  return { total: data?.count };
};

export const TestCompleted = () => {
  const data = useGetAppointmentByTestCompleted();
  return { total: data?.length };
};

export const PendingConsultation = () => {
  const Appoint = useGetAppointment();
  const TotalAppoint =
    Appoint?.data?.filter(
      (appointment) =>
        appointment?.status !== "Completed" && appointment?.status !== "Pending"
    ) || [];

  return { total: TotalAppoint?.length };
};



export const AppAccepted = () => {
  const data = useGetAppointmentByAccepted();
  return { total: data?.length };
};

import { axiosInstance } from "../../../axios-Instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorAlert, successAlert, toastOptions } from "../../../utils";
import { getLoginToken } from "../../../storage";
import { queryKeys } from "../../../react-query/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

async function addChecklist(formData) {
  const data = await axiosInstance({
    url: "/checklist",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function getChecklist() {
  const data = await axiosInstance({
    url: "/checklist",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function getChecklistById(formData) {
  const data = await axiosInstance({
    url: `/checklist/${formData["id"]}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function updateChecklist(formData) {
  const data = await axiosInstance({
    url: `/checklist/${formData["_id"]}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}
async function deleteChecklist(formData) {
  const data = await axiosInstance({
    url: `/checklist/${formData["_id"]}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data;
}

export function useGetChecklist() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.checklist],
    queryFn: () => getChecklist(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}
export function useAddChecklist() {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => addChecklist(formData),
    onSuccess: () => {
      successAlert("Checklist added Successfully");
      queryClient.invalidateQueries([queryKeys.checklist]);
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

export function useGetChecklistById(formData) {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.checklist, formData],
    queryFn: () => getChecklistById(formData),
  });
  return data;
}

export function useUpdateChecklist() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => updateChecklist(formData),

    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.checklist]);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}
export function useDeleteChecklist() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => deleteChecklist(formData),

    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.checklist]);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}

// Samples Hooks moving forward
async function addSample(formData) {
  const data = await axiosInstance({
    url: "/sample",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function getSample() {
  const data = await axiosInstance({
    url: "/sample",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function getSampleById(formData) {
  const data = await axiosInstance({
    url: `/sample/${formData["_id"]}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function updateSample(formData) {
  const data = await axiosInstance({
    url: `/sample/${formData["_id"]}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}
async function deleteSample(formData) {
  const data = await axiosInstance({
    url: `/sample/${formData["_id"]}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data;
}

export function useGetSample() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.sample],
    queryFn: () => getSample(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

export function useAddSample() {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => addSample(formData),
    onSuccess: () => {
      successAlert("Sample added Successfully");
      queryClient.invalidateQueries([queryKeys.sample]);
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

export function useGetSampleById(formData) {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.sample, formData],
    queryFn: () => getSampleById(formData),
  });
  return data;
}

export function useUpdateSample() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => updateSample(formData),

    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.sample]);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}
export function useDeleteSample() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => deleteSample(formData),

    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.sample]);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}

// Test Hooks moving forward
async function addTest(formData) {
  const data = await axiosInstance({
    url: "/test",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function getTest() {
  const data = await axiosInstance({
    url: "/test",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function getTestById(formData) {
  const data = await axiosInstance({
    url: `/test/${formData}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function getAppointmentById(formData) {
  const data = await axiosInstance({
    url: `/appointment/${formData}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function updateAppointmentAction(formData) {
  const data = await axiosInstance({
    url: `/action/acceptAppointment/${formData}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function dispatcherAcceptOrder(formData) {
  const data = await axiosInstance({
    url: `/action/acceptOrder/${formData.appointmentID}`,
    method: "PUT",
    data: {
      labScientistId: formData.id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function dispatcherReceiveSample(formData) {
  const data = await axiosInstance({
    url: `/action/receiveSample/${formData.appointmentID}`,
    method: "PUT",
    data: {
      dispatchToken: formData.id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function labReceiveSample(formData) {
  const data = await axiosInstance({
    url: `/action/sampleDelivered/${formData.appointmentID}`,
    method: "PUT",
    data: {
      labScientistToken: formData.id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function labUploadResult(formData) {

  const data = await axiosInstance({
    url: `/action/testCompleted/${formData.appointmentID}`,
    method: "PUT",
    data:formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function doctorComment(formData) {
  const data = await axiosInstance({
    url: `/action/doctorComment/${formData.appointmentID}`,
    method: "PUT",
    data: {
      doctorComment: formData.docComment,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function collectSampleAction(formData) {
  const data = await axiosInstance({
    url: `/action/collect-sample/${formData[0]?.appointmentID}/${formData[0]?.testID}`,
    method: "PUT",
    data: {
      collectorToken: formData[0]?.collectorToken,
      sample: formData[0]?.sample,
      wrapperNumber: formData[0]?.wrapperNumber,
    },

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function updateTest(formData) {
  const data = await axiosInstance({
    url: `/test/${formData["id"]}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });
  return data;
}
async function deleteTest(formData) {
  const data = await axiosInstance({
    url: `/test/${formData["_id"]}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data;
}

export function useGetTest() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.test],
    queryFn: () => getTest(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

export function useAddTest() {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => addTest(formData),
    onSuccess: () => {
      successAlert("Test added Successfully");
      queryClient.invalidateQueries([queryKeys.test]);
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

export function useGetTestById(formData) {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.test, formData],
    queryFn: () => getTestById(formData),
  });
  return data;
}

export function useGetAppointmentById(formData) {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.appointment, formData],
    queryFn: () => getAppointmentById(formData),
  });
  return data;
}

export function useUpdateAppointmentActionById() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => updateAppointmentAction(formData),

    onSuccess: (data) => {
      successAlert("Successfully");
      queryClient.refetchQueries([queryKeys.appointmentAccepted]);
      queryClient.refetchQueries([queryKeys.pending]);
      navigate("/app/collector/collection/pending");
      reset()
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}

export function useCollectSampleActionById() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => collectSampleAction(formData),

    onSuccess: (data) => {
      successAlert("Sample Collected Successfully");
      queryClient.refetchQueries([queryKeys.appointment]);
      queryClient.refetchQueries([queryKeys.appointmentAccepted]);
      queryClient.invalidateQueries([queryKeys.appointment]);
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}
export function useDispatchAcceptOrder() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => dispatcherAcceptOrder(formData),

    onSuccess: (data) => {
      successAlert("Order Successfully");
      queryClient.refetchQueries([queryKeys.dispatchAcceptOrder]);
      queryClient.refetchQueries([queryKeys.appointment]);
      queryClient.refetchQueries([queryKeys.collectSample]);

    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}

export function useDispatchReceiveSample() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => dispatcherReceiveSample(formData),

    onSuccess: (data) => {
      successAlert("Sample Received Successfully");
      queryClient.refetchQueries([queryKeys.appointment])
      

    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}

export function useLabReceiveSample() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => labReceiveSample(formData),

    onSuccess: (data) => {
      successAlert("Sample Received by Lab Successfully");
      queryClient.refetchQueries([queryKeys.appointment]);
      queryClient.refetchQueries([queryKeys.collectSample]);
      queryClient.refetchQueries([queryKeys.sampleDelivered]);
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}

export function useLabUploadResult() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => labUploadResult(formData),

    onSuccess: (data) => {
      queryClient.refetchQueries([queryKeys.appointment]);
      queryClient.refetchQueries([queryKeys.testCompleted]);
      queryClient.refetchQueries([queryKeys.sampleDelivered]);
      queryClient.refetchQueries([queryKeys.collectSample]);

    },
  });
  return { mutate, isSuccess, reset, isError, error };
}

export function useDoctorComment() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => doctorComment(formData),

    onSuccess: (data) => {
      queryClient.refetchQueries([queryKeys.appointment]);
      queryClient.refetchQueries([queryKeys.testCompleted]);
     
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}
export function useUpdateTest() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => updateTest(formData),

    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.test]);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}
export function useDeleteTest() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => deleteTest(formData),

    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.test]);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}

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


async function addAppointment(formData) {
  const data = await axiosInstance({
    url: "/appointment",
    method: "POST",
    data: formData,
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

export function useGetAppointmentByPending() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.pendings],
    queryFn: () => getAppointmentByPending(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

export function useAddAppointment() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => addAppointment(formData),
    onSuccess: () => {
      successAlert("Appointment added Successfully");

      // Refetch the 'appointment' query to get fresh data
      queryClient.refetchQueries([queryKeys.appointment]);

      navigate("/app/patient/test/pending");
      reset();
    },
    onError: (error) => {
      errorAlert(error);
    },
  });

  return { mutate, isError, error, isSuccess, reset, data };
}

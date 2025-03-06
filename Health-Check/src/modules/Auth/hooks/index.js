import { axiosInstance } from "../../../axios-Instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorAlert, successAlert, toastOptions } from "../../../utils";
import { AuthContext } from "../../../context";
import { getLoginToken, setLoginToken } from "../../../storage";
import { useContext } from "react";
import { queryKeys } from "../../../react-query/constants";
import { toast } from "react-toastify";

async function userRegister(formData) {
  const data = await axiosInstance({
    url: "/auth/",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

async function getAllUser() {
  const data = await axiosInstance({
    url: "/auth",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function forgotPassword(formData) {
  const data = await axiosInstance({
    url: "/auth/forgotpassword",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

async function getMe() {
  const data = await axiosInstance({
    url: "/auth/me",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function getUserById(id) {
  const data = await axiosInstance({
    url: "/auth/:id",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  // Assuming the response contains user data
  return data?.data; // This should be the JSON user data
}

// delete USER
async function DelUserById(id) {
  const data = await axiosInstance({
    url: `/auth/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

async function userLogin(formData) {
  const data = await axiosInstance({
    url: "/auth/login",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

async function resetPassword(formData) {
  const data = await axiosInstance({
    url: `/auth/resetpassword/${formData.token}`,
    method: "PUT",
    data: {
      password: formData.password,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

async function bulkUserUpload(excelFile) {
  
  const formData = new FormData();
  formData.append("file", excelFile);
  const data = await axiosInstance({
    url: `/auth/register-users-from-excel`,
    method: "POST",
    data:formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getLoginToken()}`,
    },
  });

  return data?.data;
}

export function useRegister() {
 
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => userRegister(formData),
    onSuccess: (data) => {
      successAlert("Registration Successful");
      
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

export function useForgotPassword() {
  const { mutate, isError, error, isSuccess, reset, data } = useMutation({
    mutationFn: (formData) => forgotPassword(formData),
    onSuccess: () => {
      successAlert("Check your mailbox to retrieve your account");
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset, data };
}

export function useLogin() {
  const authCtx = useContext(AuthContext);
  const { mutate, isError, error, isSuccess, reset } = useMutation({
    mutationFn: (formData) => userLogin(formData),
    onSuccess: (data) => {
      successAlert("Login Successful");
      setLoginToken(data?.token);
      authCtx.authenticate(data?.token);
    },
    onError: (error) => {
      errorAlert(error);
    },
  });
  return { mutate, isError, error, isSuccess, reset };
}

export function useGetAllUsers() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.users],
    queryFn: () => getAllUser(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

export function useGetMe() {
  const fallback = {};
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: () => getMe(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

export function useGetUserById() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: () => getUserById(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

export function useDelUserById() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (id) => DelUserById(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.users]);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}

export function useResetPassword() {
  const { mutate, isError, error, isSuccess, reset } = useMutation({
    mutationFn: (formData) => resetPassword(formData),
  });
  return { mutate, isError, error, isSuccess, reset };
}


export function useUploadBulkUser() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => bulkUserUpload(formData),

    onSuccess: (data) => {
      queryClient.refetchQueries([queryKeys.users]);
    },
  });
 
  return { mutate, isSuccess, reset, isError, error };
}
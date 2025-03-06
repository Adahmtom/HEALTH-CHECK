
import { axiosInstance } from "../../../axios-Instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLoginToken } from "../../../storage";
import { queryKeys } from "../../../react-query/constants";




async function editMe(formData) {
	const data = await axiosInstance({
		url: `/auth/${formData._id}`,
		method: "PUT",
		data:formData,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLoginToken()}`
		},
      
	});

	return data?.data;
}
async function editPicture(formData) {
	

	const data = await axiosInstance({
		url: `/auth/${formData._id}/photo`,
		method: "PUT",
		data:formData,
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${getLoginToken()}`
		},
      
	});

	return data?.data;
}


export function useEditMe() {
	const queryClient = useQueryClient();
	const { mutate, isSuccess, reset, isError, error } = useMutation({
		mutationFn: (formData) => editMe(formData),

		onSuccess: (data) => {
			queryClient.invalidateQueries([queryKeys.user]);
		},
	});
	return { mutate, isSuccess, reset, isError, error };
}

export function useEditPicture() {
	const queryClient = useQueryClient();
	const { mutate, isSuccess, reset, isError, error } = useMutation({
		mutationFn: (formData) => editPicture(formData),

		onSuccess: (data) => {
			queryClient.invalidateQueries([queryKeys.user]);
			// queryClient.refetchQueries([queryKeys.user]);
		},
	});
	return { mutate, isSuccess, reset, isError, error };
}
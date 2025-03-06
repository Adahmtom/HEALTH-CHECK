import * as yup from "yup";

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email("Please enter a valid email address")
		.required("Please enter your email"),
	password: yup.string().required("Required"),
});

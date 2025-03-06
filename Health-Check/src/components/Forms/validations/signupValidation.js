import * as yup from "yup";

// STUB: min 8 chars; at least 1 uppercase, 1 lowercase, 1 numeric digit
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

export const signupSchema = yup.object().shape({
	firstname: yup.string().required("Please enter your first name"),
	lastname: yup.string().required("Please enter your surname"),
	email: yup
		.string()
		.email("Please enter a valid email address")
		.required("Please enter your email"),
	password: yup
		.string()
		.min(8)
		.matches(passwordRules, {
			message:
				"Password should be at least 8 characters long, & contain 1 uppercase, 1 lowercase, 1 numeric digit",
		})
		.required("Required"),
});

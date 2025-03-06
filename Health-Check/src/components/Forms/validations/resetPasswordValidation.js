import * as yup from "yup";

// STUB: min 8 chars; at least 1 uppercase, 1 lowercase, 1 numeric digit
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

export const resetPasswordSchema = yup.object().shape({
	password: yup
		.string()
		.min(8)
		.matches(passwordRules, {
			message:
				"Password should be at least 8 characters long, & contain 1 uppercase, 1 lowercase, 1 numeric digit",
		})
		.required("Required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match")
		.required("Required"),
});

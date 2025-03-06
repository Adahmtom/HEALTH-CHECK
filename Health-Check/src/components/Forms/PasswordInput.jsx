import React, { useState } from "react";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

import { getRegExp, getSentenceFromCamelCase } from "./Helpers";

import { ReactComponent as ShowPassword } from "../../assets/eye-solid.svg";
import { ReactComponent as HidePassword } from "../../assets/eye-slash-solid.svg";

const PasswordInput = ({
	className,
	disabled,
	error,
	fixLength,
	label,
	labelClassName,
	minLength,
	maxLength,
	name,
	onChange,
	placeholder,
	reqType,
	required,
	size,
	style,
	validationHandler,
	value,
}) => {
	const [isShowPassword, setIsShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setIsShowPassword(!isShowPassword);
	};

	const onChangeHandler = (event) => {
		const { name, value } = event.target;
		onChange && onChange(name, value);
	};

	const onValidationChange = (event) => {
		if (!validationHandler) return;
		const { value } = event.target;
		let errorMessage = "";
		if (!value && required) {
			errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`;
		} else if (minLength && value.length < minLength) {
			errorMessage = `${
				name.charAt(0).toUpperCase() +
				getSentenceFromCamelCase(name).slice(1)
			} must be at least ${minLength} characters long.`;
		} else if (maxLength && value.length > maxLength) {
			errorMessage = `${
				name.charAt(0).toUpperCase() +
				getSentenceFromCamelCase(name).slice(1)
			} must be ${minLength} characters long.`;
		} else if (fixLength && value.length !== fixLength) {
			errorMessage = `${
				name.charAt(0).toUpperCase() +
				getSentenceFromCamelCase(name).slice(1)
			} must be ${fixLength} characters.`;
		} else if (value && reqType && !getRegExp(reqType).test(value)) {
			errorMessage = `Please enter valid ${getSentenceFromCamelCase(
				name
			)}.`;
		}
		validationHandler(name, errorMessage);
	};

	return (
		<div className={`${styles.InputContainer} ${styles[size]}`}>
			<label htmlFor={name} className={labelClassName}>
				{label}
				{required && <span className={styles.required}>&nbsp;*</span>}
				{error ? (
					<span className={`${styles.required} ${styles.textSmall}`}>
						{error}
					</span>
				) : null}
			</label>
			<input
				type={isShowPassword ? "text" : "password"}
				name={name}
				id={name}
				value={value}
				placeholder={placeholder}
				className={`${styles.blackBorder} ${className}`}
				required={required}
				style={style}
				disabled={disabled}
				onChange={onChangeHandler}
				onBlur={onValidationChange}
			/>
			<span
				className={`${styles.span}`}
				onClick={togglePasswordVisibility}
			>
				{isShowPassword ? <ShowPassword /> : <HidePassword />}
			</span>
		</div>
	);
};
PasswordInput.defaultProps = {
	className: "",
	disabled: false,
	error: "",
	required: false,
	label: "",
	minLength: 0,
	maxLength: 0,
	placeholder: "",
	reqType: "",
	style: {},
	validationHandler: () => {},
	size: "medium",
	labelClassName: styles.labelBlack,
	value: "",
};

PasswordInput.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	error: PropTypes.string,
	required: PropTypes.bool,
	label: PropTypes.string.isRequired,
	minLength: PropTypes.number,
	maxLength: PropTypes.number,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	reqType: PropTypes.string,
	style: PropTypes.object,
	validationHandler: PropTypes.func,
	value: PropTypes.any.isRequired,
	size: PropTypes.string,
	labelClassName: PropTypes.string,
};

export default PasswordInput;

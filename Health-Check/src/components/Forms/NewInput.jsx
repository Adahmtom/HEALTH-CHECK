import React from "react";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

const NewInput = ({
	checked,
	className,
	disabled,
	error,
	required,
	label,
	name,
	onChange,
	onBlurHandler,
	placeholder,
	style,
	type,
	value,
	size,
	labelClassName,
}) => {
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
				type={type}
				name={name}
				id={name}
				value={value}
				checked={checked}
				placeholder={placeholder}
				className={`${styles.blackBorder} ${className}`}
				required={required}
				style={style}
				disabled={disabled}
				onBlur={onBlurHandler}
				onChange={onChange}
			/>
		</div>
	);
};

NewInput.defaultProps = {
	checked: false,
	className: "",
	disabled: false,
	error: "",
	required: false,
	label: "",
	placeholder: "",
	style: {},
	type: "text",
	size: "medium",
	labelClassName: styles.labelBlack,
	value: "",
};

NewInput.propTypes = {
	checked: PropTypes.bool,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	error: PropTypes.string,
	required: PropTypes.bool,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onBlurHandler: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	style: PropTypes.object,
	type: PropTypes.string,
	value: PropTypes.any.isRequired,
	size: PropTypes.string,
	labelClassName: PropTypes.string,
};

export default NewInput;

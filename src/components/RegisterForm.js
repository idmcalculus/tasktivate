import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";


import { registerUser } from "../services/api";
import styles from "../styles/Auth.module.scss";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

const RegisterSchema = Yup.object().shape({
	username: Yup.string().min(3, "Too Short!").required("Required"),
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string().min(6, "Too Short!").required("Required"),
});

const RegisterForm = () => {
	const [apiError, setApiError] = useState(null);
	const [apiSuccess, setApiSuccess] = useState(null);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
		validationSchema: RegisterSchema,
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const response = await registerUser(values);
				console.log(response);
				setApiSuccess("Registered successfully.");
				navigate("/login");
			} catch (error) {
				setApiError(error.response.data.message || "Something went wrong. Please try again later");
			} finally {
				setSubmitting(false);
			}
		}
	});

	const handleDismissError = () => {
		setApiError(null);
	};

	const handleDismissSuccess = () => {
		setApiSuccess(null);
	};

	return (
		<form onSubmit={formik.handleSubmit} className={styles.formGroup}>
			{apiError && <ErrorMessage message={apiError} onDismiss={handleDismissError} />}
      		{apiSuccess && <SuccessMessage message={apiSuccess} onDismiss={handleDismissSuccess} />}

			<div className={styles.formField}>
				<input
					id="username"
					type="text"
					name="username"
					placeholder=" "
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.username}
					className={formik.touched.username && formik.errors.username ? styles.inputError : ''}
				/>
				<label htmlFor="username">Username</label>
				{formik.touched.username && formik.errors.username ? (
					<div className={styles.formError}>{formik.errors.username}</div>
				) : null}
			</div>
			<div className={styles.formField}>
				<input
					id="email"
					type="email"
					name="email"
					placeholder=" "
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
					className={formik.touched.email && formik.errors.email ? styles.inputError : ''}
				/>
				<label htmlFor="email">Email</label>
				{formik.touched.email && formik.errors.email ? (
					<div className={styles.formError}>{formik.errors.email}</div>
				) : null}
			</div>
			<div className={styles.formField}>
				<input
					id="password"
					type="password"
					name="password"
					placeholder=" "
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
					className={formik.touched.password && formik.errors.password ? styles.inputError : ''}
				/>
				<label htmlFor="password">Password</label>
				{formik.touched.password && formik.errors.password ? (
					<div className={styles.formError}>{formik.errors.password}</div>
				) : null}
			</div>
			<button 
				type="submit" 
				disabled={formik.isSubmitting} 
				className={styles.submitBtn}
			>
				{formik.isSubmitting ? 'Registering...' : 'Register'}
			</button>
			<div className={styles.authLink}>
				<span>Already have an account? </span>
				<Link to="/login">Login</Link>
			</div>
		</form>
	);
};

export default RegisterForm;

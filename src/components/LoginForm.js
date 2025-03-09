import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../AuthContext";
import styles from "../styles/Auth.module.scss";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string().min(6, "Too Short!").required("Required"),
});

const LoginForm = () => {
	const [apiError, setApiError] = useState(null);
	const [apiSuccess, setApiSuccess] = useState(null);
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

  	const formik = useFormik({
		initialValues: { email: '', password: '' },
		validationSchema: LoginSchema,
		onSubmit: async (values, { setSubmitting }) => {
			try {
				await login(values);
				setApiSuccess("Logged in successfully.");
				navigate("/tasks");
			} catch (error) {
				setApiError(error.response.data.message || "Something went wrong. Please try again later");
			} finally {
				setSubmitting(false);
			}
		},
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
				{formik.isSubmitting ? 'Logging in...' : 'Login'}
			</button>
			<div className={styles.authLink}>
				<span>Don't have an account? </span>
				<Link to="/register">Register</Link>
			</div>
		</form>
	);
};

export default LoginForm;

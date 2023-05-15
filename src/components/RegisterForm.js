import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";


import { registerUser } from "../services/api";
import "../styles/auth.scss";
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
		<form onSubmit={formik.handleSubmit} className="formGroup">
			{apiError && <ErrorMessage message={apiError} onDismiss={handleDismissError} />}
      		{apiSuccess && <SuccessMessage message={apiSuccess} onDismiss={handleDismissSuccess} />}

			<div>
				<label htmlFor="username">Username:</label>
				<input
					id="username"
					type="text"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.username}
				/>
				{formik.touched.username && formik.errors.username ? (
					<div className="formError">{formik.errors.username}</div>
				) : null}
			</div>
			<div>
				<label htmlFor="email">Email:</label>
				<input
					id="email"
					type="email"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
				/>
				{formik.touched.email && formik.errors.email ? (
					<div className="formError">{formik.errors.email}</div>
				) : null}
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input
					id="password"
					type="password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
				/>
				{formik.touched.password && formik.errors.password ? (
					<div className="formError">{formik.errors.password}</div>
				) : null}
			</div>
			<button type="submit" disabled={formik.isSubmitting} className="submitBtn">
				Register
			</button>
			<div className="auth-link">
				<span>Already have an account? </span>
				<Link to="/login">Login</Link>
			</div>
		</form>
	);
};

export default RegisterForm;

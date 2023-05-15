import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/api";
import { AuthContext } from "../AuthContext";
import "../styles/auth.scss";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string().min(6, "Too Short!").required("Required"),
});

const LoginForm = () => {
	const [apiError, setApiError] = useState(null);
	const [apiSuccess, setApiSuccess] = useState(null);
	const { login, setLoggedInUser } = useContext(AuthContext);
	const navigate = useNavigate();

  	const formik = useFormik({
		initialValues: { email: '', password: '' },
		validationSchema: LoginSchema,
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const response = await loginUser(values);
				console.log(response);
				setApiSuccess("Logged in successfully.");
				setLoggedInUser(response);
				login();
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
		<form onSubmit={formik.handleSubmit} className="formGroup">
			{apiError && <ErrorMessage message={apiError} onDismiss={handleDismissError} />}
      		{apiSuccess && <SuccessMessage message={apiSuccess} onDismiss={handleDismissSuccess} />}

			<div>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					name="email"
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
					type="password"
					name="password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
				/>
				{formik.touched.password && formik.errors.password ? (
					<div className="formError">{formik.errors.password}</div>
				) : null}
			</div>
			<button type="submit" disabled={formik.isSubmitting} className="submitBtn">
				Login
			</button>
			<div className="auth-link">
				<span>Don't have an account? </span>
				<Link to="/register">Register</Link>
			</div>
		</form>
	);
};

export default LoginForm;

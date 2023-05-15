import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../AuthContext";
import { createTask } from "../../services/api";
import styles from "../../styles/NewTask.module.scss";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import { getTask } from "../../services/api";

const NewTaskSchema = Yup.object().shape({
	title: Yup.string().required("Required"),
	description: Yup.string().notRequired(),
	dueDate: Yup.date().required("Required"),
	priority: Yup.string().oneOf(["Low", "Medium", "High"], "Invalid priority").required("Required"),
	status: Yup.string().oneOf(["Not Started", "In Progress", "Completed"], "Invalid status").required("Required"),
	assignedTo: Yup.string().notRequired(),
	createdBy: Yup.string().notRequired(),
});

const NewTask = (props) => {
	const [apiError, setApiError] = useState(null);
	const [apiSuccess, setApiSuccess] = useState(null);
	const { loggedInUser } = useContext(AuthContext);
	const { id } = useParams();
	const token = loggedInUser?.token;

	useEffect(() => {
		if (id && token) {
			getTask(token, id)
			.then(response => {
				console.log({ response })
				const { title, description, dueDate, priority, status, assignedTo, createdBy } = response;
				formik.setValues({ title, description, dueDate, priority, status, assignedTo, createdBy });
			})
			.catch(error => {
				console.error('Error fetching task:', error);
			});
		}
	});

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			dueDate: new Date(),
			priority: "Low",
			status: "Not Started",
			assignedTo: "",
			createdBy: `${loggedInUser?.user?.username} (${loggedInUser?.user?.email})`,
		},
		validationSchema: NewTaskSchema,
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const response = await createTask(token, values);
				console.log(response);
				setApiSuccess("Task created successfully.");
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
		<div className={styles.taskContainer}>
			<div className={styles.taskForm}>
				<h2>Create a New Task</h2>
				<form onSubmit={formik.handleSubmit}  className={styles.formGroup}>
					{apiError && <ErrorMessage message={apiError} onDismiss={handleDismissError} />}
					{apiSuccess && <SuccessMessage message={apiSuccess} onDismiss={handleDismissSuccess} />}

					<div>
						<label htmlFor="title">Title:</label>
						<input
							type="text"
							name="title"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.title}
						/>
						{formik.touched.title && formik.errors.title ? (
							<div className={styles.formError}>{formik.errors.title}</div>
						) : null}
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="description">Description:</label>
						<textarea
							name="description"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.description}
						/>
						{formik.touched.description && formik.errors.description ? (
							<div className={styles.formError}>{formik.errors.description}</div>
						) : null}
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="dueDate">Due Date:</label>
						<input
							type="date"
							name="dueDate"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.dueDate}
							placeholder="YYYY-MM-DD"
						/>
						{formik.touched.dueDate && formik.errors.dueDate ? (
							<div className={styles.formError}>{formik.errors.dueDate}</div>
						) : null}
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="priority">Priority:</label>
						<select
							name="priority"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.priority}
						>
							<option value="">Select priority</option>
							<option value="Low">Low</option>
							<option value="Medium">Medium</option>
							<option value="High">High</option>
						</select>
						{formik.touched.priority && formik.errors.priority ? (
							<div className={styles.formError}>{formik.errors.priority}</div>
						) : null}
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="status">Status:</label>
						<select
							name="status"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.status}
						>
							<option value="">Select status</option>
							<option value="Not Started">Not Started</option>
							<option value="In Progress">In Progress</option>
							<option value="Completed">Completed</option>
						</select>
						{formik.touched.status && formik.errors.status ? (
							<div className={styles.formError}>{formik.errors.status}</div>
						) : null}
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="assignedTo">Assigned To:</label>
						<input
							type="text"
							name="assignedTo"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.assignedTo}
						/>
						{formik.touched.assignedTo && formik.errors.assignedTo ? (
							<div className={styles.formError}>{formik.errors.assignedTo}</div>
						) : null}
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="createdBy">Created By:</label>
						<input
							type="text"
							name="createdBy"
							readOnly
							value={`${loggedInUser?.user?.username} (${loggedInUser?.user?.email})`}
						/>
						{formik.touched.createdBy && formik.errors.createdBy ? (
							<div className={styles.formError}>{formik.errors.createdBy}</div>
						) : null}
					</div>
					<button type="submit" disabled={formik.isSubmitting} className={styles.submitBtn}>
						{props.editMode ? 'Update Task' : 'Create Task'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default NewTask;

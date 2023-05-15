import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../AuthContext";
import styles from "../../styles/TaskForm.module.scss";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import { getTask, updateTask, createTask } from "../../services/api";

const TaskFormSchema = Yup.object().shape({
	title: Yup.string().required("Required"),
	description: Yup.string().notRequired(),
	dueDate: Yup.date().required("Required"),
	priority: Yup.string().oneOf(["Low", "Medium", "High"], "Invalid priority").required("Required"),
	status: Yup.string().oneOf(["Not Started", "In Progress", "Completed"], "Invalid status").required("Required"),
	assignedTo: Yup.string().notRequired(),
	createdBy: Yup.string().notRequired(),
});

const TaskForm = () => {
	const [apiError, setApiError] = useState(null);
	const [apiSuccess, setApiSuccess] = useState(null);
	const { loggedInUser } = useContext(AuthContext);
	const { id } = useParams();
	const token = loggedInUser ? loggedInUser.token : null;
	const user = loggedInUser ? loggedInUser.user : null;
	const navigate = useNavigate();

	const formatDate = date => new Date(date).toISOString().slice(0, 10);


	useEffect(() => {
		if (!token) {
			navigate('/login');
		} else if (id && token) {
			async function fetchTask() {
				try {
					const response =  await getTask(token, id);
					const { title = "", description = "", priority = "", status = "", assignedTo = "" } = response.data;
					const date = response.data.dueDate;
					const dueDate = date ? formatDate(date) : null;
					const createdBy = response.data.createdBy && `${response.data.createdBy.username} (${response.data.createdBy.email})`
					formik.setValues({ title, description, dueDate, priority, status, assignedTo, createdBy });
				} catch (error) {
					setApiError(error.response.data.message || "There was an error fetching Tasks. Please try again later.");
				}
			}

			fetchTask();
		}
	}, [id, token, navigate]);

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			setSubmitting(true);

			const formattedValues = { ...values };
			
			if (formattedValues.dueDate) {
				const date = formattedValues.dueDate;
				formattedValues.dueDate = formatDate(date);
			}
		
			let response;
			if (id) {
				response = await updateTask(token, id, formattedValues);
			} else {
				response = await createTask(token, formattedValues);
			}
			console.log({ response });
			
			setApiSuccess(`Task ${id ? 'updated' : 'created'} successfully.`);
			navigate('/tasks');
		} catch (error) {
			setApiError(error.response.data.message || "Something went wrong. Please try again later");
		} finally {
			setSubmitting(false);
		}
	};
	
	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			dueDate: formatDate(new Date()),
			priority: "Low",
			status: "Not Started",
			assignedTo: "",
			createdBy: `${user && user.username} (${user && user.email})`,
		},
		validationSchema: TaskFormSchema,
		onSubmit: handleSubmit,
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
				<h2>{id ? 'Update Task' : 'Create a New Task'}</h2>
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
							value={`${user && user.username} (${user && user.email})`}
						/>
						{formik.touched.createdBy && formik.errors.createdBy ? (
							<div className={styles.formError}>{formik.errors.createdBy}</div>
						) : null}
					</div>
					<button type="submit" disabled={formik.isSubmitting} className={styles.submitBtn}>
						{id ? 'Update' : 'Create Task'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default TaskForm;

import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AsyncSelect from 'react-select/async';

import { AuthContext } from "../../AuthContext";
import styles from "../../styles/TaskForm.module.scss";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import { getTask, updateTask, createTask, getUsers } from "../../services/api";

const TaskFormSchema = Yup.object().shape({
	title: Yup.string().required("Required"),
	description: Yup.string().notRequired(),
	dueDate: Yup.date().required("Required"),
	priority: Yup.string().oneOf(["Low", "Medium", "High"], "Invalid priority").required("Required"),
	status: Yup.string().oneOf(["Not Started", "In Progress", "Completed"], "Invalid status").required("Required"),
	assignedTo: Yup.string().notRequired(),
	createdBy: Yup.string().notRequired(),
	attachment: Yup.mixed().notRequired(),
});

const TaskForm = () => {
	const [apiError, setApiError] = useState(null);
	const [apiSuccess, setApiSuccess] = useState(null);
	const { isAuthenticated, loggedInUser } = useContext(AuthContext);
	const { id } = useParams();
	const { token, email, username } = loggedInUser || { token: null, email: null, username: null };
	const navigate = useNavigate();

	// format date to yyyy-MM-ddThh:mm
	const formatDate = date => {
		const dateObj = new Date(date);
		const year = dateObj.getFullYear();
		const month = dateObj.getMonth() + 1;
		const day = dateObj.getDate();
		const hours = dateObj.getHours();
		const minutes = dateObj.getMinutes();
		const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}T${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
		return formattedDate;
	};

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			setSubmitting(true);

			const formattedValues = { ...values };

			if (formattedValues.dueDate) {
				const date = formattedValues.dueDate;
				formattedValues.dueDate = formatDate(date);
			}

			formattedValues.createdBy = loggedInUser.id;
			formattedValues.assignedTo = formattedValues.assignedTo ? formattedValues.assignedTo.id : null;

			const { title, description, dueDate, priority, status, assignedTo, createdBy, attachment } = formattedValues;
			const formData = new FormData();

			formData.append("title", title);
			formData.append("description", description);
			formData.append("dueDate", dueDate);
			formData.append("priority", priority);
			formData.append("status", status);
			formData.append("assignedTo", assignedTo);
			formData.append("createdBy", createdBy);
			if (attachment) {
				console.log(attachment);
				formData.append("attachment", attachment);
			}
		
			let response;
			if (id) {
				response = await updateTask(token, id, formData);
			} else {
				response = await createTask(token, formData);
			}
			console.log({ response });
			
			setApiSuccess(`Task ${id ? 'updated' : 'created'} successfully.`);
			navigate('/tasks');
		} catch (error) {
			console.error(error);
			setApiError(error.response.data.message || "Something went wrong. Please try again later");
		} finally {
			setSubmitting(false);
		}
	};

	// Define formik after handleSubmit
	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			dueDate: formatDate(new Date()),
			priority: "Low",
			status: "Not Started",
			assignedTo: null,
			createdBy: `${username} (${email})`,
			attachment: null,
		},
		validationSchema: TaskFormSchema,
		onSubmit: handleSubmit,
	});

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login');
		}
		
		if (id && token) {
			async function fetchTask() {
				try {
					const response =  await getTask(token, id);
					const { title = "", description = "", priority = "", status = "", assignedTo = "" } = response.data;
					const date = response.data.dueDate;
					const dueDate = date ? formatDate(date) : null;
					const createdByObj = response.data.createdBy;
					const createdBy = createdByObj ? `${createdByObj.username} (${createdByObj.email})` : null;
					console.log({ createdBy })
					formik.setValues({ title, description, dueDate, priority, status, assignedTo, createdBy });
				} catch (error) {
					setApiError(error.response.data.message || "There was an error fetching Tasks. Please try again later.");
				}
			}

			fetchTask();
		}
	}, [id, token, isAuthenticated, navigate, formik]);

	const loadUserOptions = async (inputValue) => {
		const response = await getUsers(inputValue);
	  
		return response.data.map(user => ({
		  value: user.id,
		  label: `${user.username} (${user.email})`
		}));
	};

	const customStyles = {
		control: (provided) => ({
			...provided,
			width: '100%',
			padding: '1rem',
			border: '1px solid #ccc',
			borderRadius: '5px',
			fontSize: '1.5rem',
			boxSizing: 'border-box',
			'&:hover': {
				borderColor: '#2af598'
			}
		}),
		option: (provided, state) => ({
			...provided,
			color: state.isSelected ? 'white' : 'black',
			backgroundColor: state.isSelected ? '#007bff' : 'white',
			'&:hover': {
				backgroundColor: '#e9ecef'
			}
		}),
		menu: (provided) => ({
			...provided,
			marginLeft: '1rem',
			marginRight: '1rem'
		}),
		singleValue: (provided) => ({
			...provided,
			marginLeft: '0'
		}),
		input: (provided) => ({
			...provided,
			marginLeft: '0',
			marginRight: '0'
		}),
		valueContainer: (provided) => ({
			...provided,
			justifyContent: 'left',
		}),
		Container: (provided) => ({
			...provided,
			marginLeft: '0',
			marginRight: '0'
		}),
	};

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
					<div>
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
					<div>
						<label htmlFor="dueDate">Due Date:</label>
						<input
							type="datetime-local"
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
					<div>
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
					<div>
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
					<div>
						<label htmlFor="assignedTo">Assigned To:</label>
						<AsyncSelect 
							cacheOptions
							loadOptions={loadUserOptions}
							defaultOptions
							onChange={(option) => formik.setFieldValue('assignedTo', option ? option.value : '')}
							onBlur={() => formik.setFieldTouched('assignedTo')}
							styles={customStyles}
						/>
						{formik.touched.assignedTo && formik.errors.assignedTo ? (
							<div className={styles.formError}>{formik.errors.assignedTo}</div>
						) : null}
					</div>
					<div>
						<label htmlFor="createdBy">Created By:</label>
						<input
							type="text"
							name="createdBy"
							readOnly
							value={formik.values.createdBy ? formik.values.createdBy : `${username} (${email})`}
						/>
						{formik.touched.createdBy && formik.errors.createdBy ? (
							<div className={styles.formError}>{formik.errors.createdBy}</div>
						) : null}
					</div>
					<div>
						<label htmlFor="attachment">Attachment:</label>
						<input
							type="file"
							name="attachment"
							onChange={(event) => {
								console.log(event.currentTarget.files[0]);
								formik.setFieldValue("attachment", event.currentTarget.files[0]);
							}}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.attachment && formik.errors.attachment ? (
							<div className={styles.formError}>{formik.errors.attachment}</div>
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

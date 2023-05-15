import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/TaskTable.module.scss";
import { AuthContext } from "../../AuthContext";

const TaskTable = ({ tasks, onDeleteTask }) => {
	const { isAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login');
		}
	}, [isAuthenticated, navigate]);

	const handleDeleteTask = (taskId) => {
		onDeleteTask(taskId);
	};

	const formatDate = (date) => {
		const dateObj = new Date(date);
		const formattedDate = dateObj.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
		return formattedDate;
	};

	return (
		<div className={styles.taskTableContainer}>
			<table className={styles.taskTable}>
				<thead>
					<tr>
						<th>Title</th>
						<th>Due Date</th>
						<th>Priority</th>
						<th>Status</th>
						<th>Assigned To</th>
						<th>Created By</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map(({ _id: id, dueDate, ...task }) => (
						<tr key={id}>
							<td>{task.title}</td>
							<td>{formatDate(dueDate)}</td>
							<td>{task.priority}</td>
							<td>{task.status}</td>
							<td>{task.assignedTo}</td>
							<td>{task.createdBy?.email}</td>
							<td>
								<div className={styles.actionButtons}>
            						<Link to={`/taskform/${id}`} className="btn btn-primary">Edit</Link>
									<button className={styles.delete} onClick={() => handleDeleteTask(id)}>Delete</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TaskTable;

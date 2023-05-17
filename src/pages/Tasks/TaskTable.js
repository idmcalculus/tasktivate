import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import styles from "../../styles/TaskTable.module.scss";

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
							<td data-label="Title">{task.title}</td>
							<td data-label="Due Date">{formatDate(dueDate)}</td>
							<td data-label="Priority">{task.priority}</td>
							<td data-label="Status">{task.status}</td>
							<td data-label="Assigned To">{task.assignedTo && task.assignedTo.email}</td>
							<td data-label="Created By">{task.createdBy.email}</td>
							<td data-label="Actions">
								<div className={styles.actionButtons}>
									<Link to={`/taskform/${id}`} className={`${styles.btn} ${styles.btnPrimary}`}>Edit</Link>
									<Link className={`${styles.btn} ${styles.btnDanger}`} onClick={() => handleDeleteTask(id)}>Delete</Link>
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


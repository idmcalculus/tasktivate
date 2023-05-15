import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/TaskTable.module.scss";

const TaskTable = ({ tasks, onDeleteTask }) => {

	const handleDeleteTask = (taskId) => {
		onDeleteTask(taskId);
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
					{tasks.map((task) => (
						<tr key={task._id}>
							<td>{task.title}</td>
							<td>{task.dueDate}</td>
							<td>{task.priority}</td>
							<td>{task.status}</td>
							<td>{task.assignedTo}</td>
							<td>{task.createdBy?.email}</td>
							<td>
								<div className={styles.actionButtons}>
            						<Link to={`/newtask/${task._id}`} className="btn btn-primary">Edit</Link>
									<button className={styles.delete} onClick={() => handleDeleteTask(task.id)}>Delete</button>
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

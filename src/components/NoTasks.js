import React from "react";
import styles from "../styles/NoTasks.module.scss";

const NoTasks = () => (
	<div className={styles.noTasksContainer}>
		<h2>No tasks yet</h2>
		<p>Looks like you haven't created any tasks yet. Click on the "Create Task" button to get started!</p>
	</div>
);

export default NoTasks;

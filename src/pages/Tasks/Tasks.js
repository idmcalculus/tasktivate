import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../AuthContext";
import TaskTable from "./TaskTable";
import { getTasks, deleteTask } from "../../services/api";
import styles from "../../styles/Tasks.module.scss";

const Tasks = () => {
	const { loggedInUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const token = loggedInUser?.token;

	useEffect(() => {
		if (!token) {
			navigate('/login');
		} else {
			fetchTasks(token);
		}
	}, [token, navigate]);

	const [tasks, setTasks] = useState([]);

	const fetchTasks = async (token) => {
		try {
			const response = await getTasks(token);
			setTasks(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteTask = async (taskId) => {
		console.log({ taskId, token, tasks })
		try {
			await deleteTask(token, taskId);
			const updatedTasks = tasks.filter((task) => task._id !== taskId);
			setTasks(updatedTasks);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={styles.tasksContainer}>
			<h1>Tasks</h1>
			<Link to="/taskform" className="btn btn-primary">Create New Task</Link>
			<div className={styles.taskTable}>
				<TaskTable tasks={tasks} onDeleteTask={handleDeleteTask} />
			</div>
		</div>
	);
};

export default Tasks;


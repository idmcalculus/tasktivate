import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../AuthContext";
import TaskTable from "./TaskTable";
import { getTasks, deleteTask } from "../../services/api";
import Loading from "../../components/Loading";
import NoTasks from "../../components/NoTasks";
import styles from "../../styles/Tasks.module.scss";

const Tasks = () => {
	const { isAuthenticated, loggedInUser } = useContext(AuthContext);
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [priorityFilter, setPriorityFilter] = useState('');

	const navigate = useNavigate();
	const token = loggedInUser ? loggedInUser.token : null;

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login');
		} else {
			fetchTasks(token, page, searchTerm, statusFilter, priorityFilter);
		}
	}, [token, navigate, isAuthenticated, page, searchTerm, statusFilter, priorityFilter]);

	const fetchTasks = async (token, page, searchTerm, statusFilter, priorityFilter) => {
		setIsLoading(true);
		try {
			const response = await getTasks(token, page, searchTerm, statusFilter, priorityFilter);
			console.log({ response })
			setTasks(response.data.tasks);
			setPage(response.data.currentPage);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDeleteTask = async (taskId) => {
		try {
			await deleteTask(token, taskId);
			const updatedTasks = tasks.filter((task) => task._id !== taskId);
			setTasks(updatedTasks);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleStatusFilterChange = (e) => {
		setStatusFilter(e.target.value);
	};
	
	const handlePriorityFilterChange = (e) => {
		setPriorityFilter(e.target.value);
	};

	const DefaultTaskPage = () => {
		return (
			<>
				<h1>Tasks</h1>
				<Link to="/taskform" className={styles.btnPrimary}>Create New Task</Link>
				<div className={styles.searchFilterSection}>
					<input 
						type="text" 
						value={searchTerm} 
						onChange={handleSearchChange} 
						placeholder="Search tasks"
						className={styles.searchBar}
					/>
					<select 
						value={statusFilter} 
						onChange={handleStatusFilterChange} 
						className={styles.filterDropdown}
					>
						<option value="">Filter by status</option>
						<option value="Not Started">Not Started</option>
						<option value="In Progress">In Progress</option>
						<option value="Completed">Completed</option>
					</select>
					<select 
						value={priorityFilter} 
						onChange={handlePriorityFilterChange} 
						className={styles.filterDropdown}
					>
						<option value="">Filter by priority</option>
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
				</div>
			</>
		);
	};

	if (isLoading) {
		return (
			<div className={styles.tasksContainer}>
				<DefaultTaskPage />
				<Loading />
			</div>
		)
	}

	if (!isLoading && tasks.length === 0) {
		return (
			<div className={styles.tasksContainer}>
				<DefaultTaskPage />
				<NoTasks />
			</div>
		);
	}

	return (
		<div className={styles.tasksContainer}>
			<DefaultTaskPage />
			<div className={styles.taskTable}>
				<TaskTable tasks={tasks} onDeleteTask={handleDeleteTask} />
			</div>
			<div className={styles.pagination}>
				<button onClick={() => setPage((prevPage) => prevPage - 1)} disabled={page === 1}>Previous</button>
				<span>{page}</span>
				<button onClick={() => setPage((prevPage) => prevPage + 1)} disabled={page === totalPages}>Next</button>
			</div>
		</div>
	);
};

export default Tasks;

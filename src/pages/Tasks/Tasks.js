import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

import { AuthContext } from "../../AuthContext";
import TaskTable from "./TaskTable";
import Loading from "../../components/Loading";
import NoTasks from "../../components/NoTasks";
import { useTasksQuery, useDeleteTaskMutation } from "../../hooks/useTasks";
import styles from "../../styles/Tasks.module.scss";

const Tasks = () => {
	const { isAuthenticated, loggedInUser } = useContext(AuthContext);
	const [searchInputValue, setSearchInputValue] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [priorityFilter, setPriorityFilter] = useState('');
	const searchInputRef = useRef(null);
	const navigate = useNavigate();
	const token = loggedInUser ? loggedInUser.token : null;

	// Use react-query for tasks
	const {
		data,
		isLoading,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		error
	} = useTasksQuery(token, searchTerm, statusFilter, priorityFilter);

	// Use react-query for delete mutation
	const deleteMutation = useDeleteTaskMutation(token);

	// Redirect if not authenticated
	if (!isAuthenticated) {
		navigate('/login');
		return null;
	}

	// Handle task deletion
	const handleDeleteTask = async (taskId) => {
		try {
			await deleteMutation.mutateAsync(taskId);
		} catch (error) {
			console.error('Error deleting task:', error);
		}
	};

	// Handle infinite scroll
	const handleLoadMore = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	const handleSearchChange = (e) => {
		setSearchInputValue(e.target.value);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		setSearchTerm(searchInputValue);
		
		// Ensure the input maintains focus after submission
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	};

	const handleStatusFilterChange = (e) => {
		setStatusFilter(e.target.value);
	};
	
	const handlePriorityFilterChange = (e) => {
		setPriorityFilter(e.target.value);
	};

	if (error) {
		return <div>Error loading tasks: {error.message}</div>;
	}

	const allTasks = data?.pages.flatMap(page => page.tasks) || [];
	const hasAnyTasks = allTasks.length > 0;

	return (
		<div className={styles.tasksContainer}>
			<h1>Tasks</h1>
			<Link to="/taskform" className={styles.btnPrimary}>Create New Task</Link>
			<div className={styles.searchFilterSection}>
				<form className={styles.searchContainer} onSubmit={handleSearchSubmit}>
					<input 
						ref={searchInputRef}
						type="text" 
						value={searchInputValue} 
						onChange={handleSearchChange} 
						placeholder="Search tasks"
						className={styles.searchBar}
						autoComplete="off"
					/>
					<button 
						type="submit"
						className={styles.searchButton} 
						title="Search"
					>
						<FaSearch />
					</button>
				</form>
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
			{isLoading ? (
				<Loading />
			) : !hasAnyTasks ? (
				<NoTasks />
			) : (
				<>
					<div className={styles.taskTable}>
						<TaskTable 
							tasks={allTasks} 
							onDeleteTask={handleDeleteTask} 
						/>
					</div>
					{isFetchingNextPage && (
						<div className={styles.loadingMore}>Loading more tasks...</div>
					)}
					{hasNextPage && (
						<button 
							onClick={handleLoadMore}
							className={styles.loadMoreButton}
							disabled={isFetchingNextPage}
						>
							{isFetchingNextPage ? 'Loading more...' : 'Load More'}
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default Tasks;

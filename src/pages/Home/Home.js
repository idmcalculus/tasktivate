import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
	return (
		<div className="home">
			<h1>Welcome to Tasktivate!</h1>
			<p className="description">
				Tasktivate is your one-stop solution for managing tasks efficiently and effectively. With Tasktivate, you can:
			</p>
			<ul>
				<li>Create and manage tasks with ease</li>
				<li>Assign tasks to team members and track their progress</li>
				<li>Filter tasks based on status, priority, or other criteria</li>
				<li>Search tasks with keywords</li>
				<li>Receive email notifications on task updates</li>
				<li>Attach files to tasks for better context</li>
				<li>Enjoy real-time updates on tasks using WebSockets</li>
			</ul>
			<Link to="/register">
				<button className="cta-button">Get Started</button>
			</Link>
		</div>
	);
};

export default Home;

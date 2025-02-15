import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Tasks from './pages/Tasks/Tasks';
import TaskForm from './pages/Tasks/TaskForm';
import Navbar from './components/NavBar/NavBar';

const App = () => {
	return (
		<AuthProvider>
			<Navbar />
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/tasks" element={<Tasks />} />
					<Route path="/taskform" element={<TaskForm />} />
					<Route path="/taskform/:id" element={<TaskForm />} />
				</Routes>
			</div>
		</AuthProvider>
	);
};

export default App;

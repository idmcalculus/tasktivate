import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './AuthContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Tasks from './pages/Tasks/Tasks';
import TaskForm from './pages/Tasks/TaskForm';
import Navbar from './components/NavBar/NavBar';

// Create a client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
			staleTime: 5 * 60 * 1000, // 5 minutes
		},
	},
});

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
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
		</QueryClientProvider>
	);
};

export default App;

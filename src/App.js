import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from "./AuthContext";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Tasks from './pages/Tasks/Tasks';
import NewTask from './pages/Tasks/NewTask';
import Navbar from "./components/NavBar/NavBar";

const App = () => {
	
	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/tasks" element={<Tasks />} />
						<Route path="/newtask" element={<NewTask editMode={false} />} />
						<Route path="/newtask/:id" element={<NewTask editMode={true} />} />
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;

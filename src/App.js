import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
// import Tasks from './pages/Tasks/Tasks';

function App() {
	return (
		<Router>
			<div>
				<Routes>
					{/* <Route path="/" element={<Home />} /> */}
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					{/* <Route path="/tasks" element={<Tasks />} /> */}
					{/* Add more routes here as needed */}
				</Routes>
			</div>
		</Router>
	);
}

export default App;

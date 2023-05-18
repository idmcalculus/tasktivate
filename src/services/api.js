import axios from "axios";

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 
process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_LOCAL_API_URL;

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	}
});

// Get Users
export const getUsers = async (searchTerm) => {
	try {
		return await apiClient.get(`/users?query=${searchTerm}`, {
			withCredentials: true,
		});
	} catch (error) {
		throw error;
	}
};

// User Authentication
export const registerUser = async (userData) => {
	try {
		return await apiClient.post("/users/register", userData, {
			withCredentials: true,
		});
	} catch (error) {
		throw error;
	}
};

export const loginUser = async (credentials) => {
	try {
		return await apiClient.post("/users/login", credentials, {
			withCredentials: true,
		});
	} catch (error) {
	  	throw error;
	}
};
  
export const sessionStatus = async () => {
	try {
		return await apiClient.get("/users/session-status", {
			withCredentials: true,
		});
	} catch (error) {
		throw error;
	}
};

export const logoutUser = async () => {
	try {
		return await apiClient.post("/users/logout", {}, {
			withCredentials: true,
		});
	} catch (error) {
		throw error;
	}
};

// Task CRUD Operations
export const getTasks = async (token, page, search, status, priority) => {
	return await apiClient.get("/tasks", {
		params: {
			page, search, status, priority
		},
		headers: {
			Authorization: `Bearer ${token}`,
		},
		withCredentials: true
	});
};

export const getTask = async (token, taskId) => {
	return await apiClient.get(`/tasks/${taskId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		withCredentials: true
	});
};

export const createTask = async (token, taskData) => {
	return await apiClient.post('/tasks', taskData, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${token}`,
		},
		withCredentials: true
	});
};

export const updateTask = async (token, taskId, updatedData) => {
	return await apiClient.put(`/tasks/${taskId}`, updatedData, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${token}`,
		},
		withCredentials: true
	});
};

export const deleteTask = async (token, taskId) => {
	return await apiClient.delete(`/tasks/${taskId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		withCredentials: true
	});
};

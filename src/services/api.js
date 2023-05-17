import axios from "axios";

axios.defaults.withCredentials = true;

const API_BASE_URL = "https://task-manager-api-puce.vercel.app/v1";

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Get Users
export const getUsers = async (searchTerm) => {
	try {
		return await apiClient.get(`/users?query=${searchTerm}`);
	} catch (error) {
		throw error;
	}
};

// User Authentication
export const registerUser = async (userData) => {
	try {
		return await apiClient.post("/users/register", userData);
	} catch (error) {
		throw error;
	}
};

export const loginUser = async (credentials) => {
	try {
		return await apiClient.post("/users/login", credentials);
	} catch (error) {
	  	throw error;
	}
};
  
export const sessionStatus = async () => {
	try {
		return await apiClient.get("/users/session-status");
	} catch (error) {
		throw error;
	}
};

export const logoutUser = async () => {
	try {
		return await apiClient.post("/users/logout");
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
	});
};

export const getTask = async (token, taskId) => {
	return await apiClient.get(`/tasks/${taskId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const createTask = async (token, taskData) => {
	return await apiClient.post('/tasks', taskData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const updateTask = async (token, taskId, updatedData) => {
	return await apiClient.put(`/tasks/${taskId}`, updatedData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const deleteTask = async (token, taskId) => {
	return await apiClient.delete(`/tasks/${taskId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

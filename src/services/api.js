// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8008/v1";

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// User Authentication
export const registerUser = async (userData) => {
	return await apiClient.post("/users/register", userData);
};

export const loginUser = async (credentials) => {
	try {
		const response = await apiClient.post("/users/login", credentials);
		if (response.data && response.data.token) {
			localStorage.setItem('authToken', response.data.token);
		}
		return response.data;
	} catch (error) {
	  	throw error;
	}
};
  

// Task CRUD Operations
export const getTasks = async (token) => {
	return await apiClient.get("/tasks", {
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

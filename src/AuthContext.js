import React, { createContext, useState, useEffect } from "react";
import { loginUser, logoutUser, sessionStatus } from "./services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState(null);

	const checkAuthStatus = async () => {
		try {
			const response = await sessionStatus();
			setLoggedInUser(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const authStatus = async () => {
			try {
				await checkAuthStatus();
			} catch (error) {
				console.error(error);
			}
		}
		authStatus();
	}, []);

	const login = async (credentials) => {
		try {
			await loginUser(credentials);
			await checkAuthStatus();
		} catch (error) {
			console.error(error);
		}
	};

	const logout = async () => {
		try {
			await logoutUser();
			setLoggedInUser(null);
		} catch (error) {
			console.error(error);
		}
	};

	const isAuthenticated = !!loggedInUser;

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout, loggedInUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };

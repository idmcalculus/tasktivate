import React, { createContext, useEffect } from "react";
import { useSessionQuery, useLoginMutation, useLogoutMutation } from "./hooks/useAuth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	// Use React Query to manage session state
	const { data: loggedInUser, isLoading, error } = useSessionQuery();
	
	// Login mutation
	const loginMutation = useLoginMutation();
	
	// Logout mutation
	const logoutMutation = useLogoutMutation();
	
	// Log any errors
	useEffect(() => {
		if (error) {
			console.error('Session error:', error);
		}
	}, [error]);
	
	const login = async (credentials) => {
		try {
			await loginMutation.mutateAsync(credentials);
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	};
	
	const logout = async () => {
		try {
			await logoutMutation.mutateAsync();
		} catch (error) {
			console.error('Logout error:', error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider value={{
			isAuthenticated: !!loggedInUser,
			loggedInUser,
			isLoading,
			login,
			logout
		}}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };

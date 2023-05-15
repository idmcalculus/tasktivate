import { useState, useEffect } from 'react';

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		setIsAuthenticated(token !== null);
	}, []);

	return isAuthenticated;
};

export default useAuth;

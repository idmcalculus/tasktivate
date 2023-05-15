import React from 'react';
import RegisterForm from '../../components/RegisterForm';

const Register = () => {
	return (
		<div className="auth-container">
			<div className="auth-form">
				<h2>Register</h2>
				<RegisterForm />
			</div>
		</div>
	);
};

export default Register;

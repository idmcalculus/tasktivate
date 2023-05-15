import React from 'react';
import LoginForm from '../../components/LoginForm';
import '../../styles/auth.scss';

const Login = () => {
    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Login to Tasktivate</h2>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
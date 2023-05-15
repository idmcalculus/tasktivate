import React from "react";
import LoginForm from "../../components/LoginForm";
import "../../styles/auth.scss";

const Login = () => {
    return (
        <div className="authContainer">
            <div className="authForm">
                <h2>Login to Tasktivate</h2>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
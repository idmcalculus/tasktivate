import React from "react";
import LoginForm from "../../components/LoginForm";
import styles from "../../styles/Auth.module.scss";

const Login = () => {
    return (
        <div className={styles.authContainer}>
            <div className={styles.authForm}>
                <h2>Login to Tasktivate</h2>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
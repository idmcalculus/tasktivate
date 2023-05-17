import React from "react";
import RegisterForm from "../../components/RegisterForm";
import styles from "../../styles/Auth.module.scss";

const Register = () => {
	return (
		<div className={styles.authContainer}>
			<div className={styles.authForm}>
				<h2>Register</h2>
				<RegisterForm />
			</div>
		</div>
	);
};

export default Register;

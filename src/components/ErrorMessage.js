import React from "react";
import styles from "../styles/Auth.module.scss";

const ErrorMessage = ({ message, onDismiss }) => {
	return (
		<div className={styles.apiError}>
			{message}
			<button type="button" className={styles.dismissError} onClick={onDismiss}>
					x
			</button>
		</div>
	);
};

export default ErrorMessage;
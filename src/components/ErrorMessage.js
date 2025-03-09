import React from "react";
import styles from "../styles/Auth.module.scss";

const ErrorMessage = ({ message, onDismiss }) => {
	return (
		<div className={styles.apiError}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={styles.icon}
			>
				<circle cx="12" cy="12" r="10" />
				<line x1="12" y1="8" x2="12" y2="12" />
				<line x1="12" y1="16" x2="12.01" y2="16" />
			</svg>
			<span>{message}</span>
			<button type="button" className={styles.dismissError} onClick={onDismiss} aria-label="Dismiss error">
				×
			</button>
		</div>
	);
};

export default ErrorMessage;
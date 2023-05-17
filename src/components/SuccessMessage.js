import React from "react";
import styles from "../styles/Auth.module.scss";

const SuccessMessage = ({ message, onDismiss }) => {
	return (
		<div className={styles.apiSuccess}>
			{message}
			<button type="button" className={styles.dismissSuccess} onClick={onDismiss}>
				x
			</button>
		</div>
	);
};

export default SuccessMessage;
import React from "react";
import styles from "../styles/Loading.module.scss";

const Loading = () => (
	<div className={styles.loadingContainer}>
		<div className={styles.spinner}></div>
		<p>Loading...</p>
	</div>
);

export default Loading;

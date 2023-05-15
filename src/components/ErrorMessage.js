import React from 'react';
import '../styles/auth.scss'

const ErrorMessage = ({ message, onDismiss }) => {
	return (
		<div className="api-error">
			{message}
			<button type="button" className="dismiss-error" onClick={onDismiss}>
					x
			</button>
		</div>
	);
};

export default ErrorMessage;
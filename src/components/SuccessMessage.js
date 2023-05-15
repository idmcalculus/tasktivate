import React from 'react';
import '../styles/auth.scss'

const SuccessMessage = ({ message, onDismiss }) => {
	return (
		<div className="api-success">
			{message}
			<button type="button" className="dismiss-success" onClick={onDismiss}>
				x
			</button>
		</div>
	);
};

export default SuccessMessage;
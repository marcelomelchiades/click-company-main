import React, { useEffect, useState } from 'react';

type LoadingProps = {
	showLoading: boolean;
	className?: string;
};

const Loading: React.FC<LoadingProps> = ({ showLoading, className }) => {
	return (
		<div
			className={`${className === undefined ? 'loading-full' : className} ${
				showLoading ? 'active' : ''
			}`}
		>
			<i className="fas fa-spinner fa-spin" />
		</div>
	);
};

Loading.defaultProps = {
	className: undefined,
};

export default Loading;

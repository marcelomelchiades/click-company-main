import React, { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type InputProps = {
	label: string;
	icon: string | ReactElement;
	to: string;
	onClick?: any;
};

const MenuItem: React.FC<InputProps> = ({ label, icon, to, onClick }) => {
	const iconEl =
		typeof icon === 'string' ? (
			<img src={icon} className="img-menu-item" alt="" />
		) : (
			icon
		);

	return (
		<Link to={to}>
			{label === 'Sair' ? (
				<div
					role="button"
					tabIndex={0}
					onClick={onClick}
					onKeyDown={onClick}
					className="bloco-menu-item"
				>
					<div className="inline-block bloco-icon-menu-item mr-4">{iconEl}</div>
					<div className="inline-block">{label}</div>
					<div className="float-right">
						<i className="fas fa-chevron-right" />
					</div>
				</div>
			) : (
				<div className="bloco-menu-item">
					<div className="inline-block bloco-icon-menu-item mr-4">{iconEl}</div>
					<div className="inline-block">{label}</div>
					<div className="float-right">
						<i className="fas fa-chevron-right" />
					</div>
				</div>
			)}
		</Link>
	);
};

MenuItem.defaultProps = {
	onClick: () => undefined,
};

export default MenuItem;

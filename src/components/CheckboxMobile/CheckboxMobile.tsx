import React, { ReactNode } from 'react';

type CheckboxMobileProps = {
	label: string;
	isChecked: boolean;
	onClick: any;
	descricaoCampo?: string;
};

const CheckboxMobile: React.FC<CheckboxMobileProps> = ({
	label,
	isChecked,
	onClick,
	descricaoCampo,
}) => {
	const activeButton = isChecked ? 'active' : '';
	const elDescricaoCampo =
		descricaoCampo !== '' ? (
			<span className={'descricao-campo-checkbox-mobile'}>
				<br />
				<a href="/regras">
					{descricaoCampo}
				</a>
			</span>
		) : null;
	return (
		<div className="bloco-campo-checkbox-mobile">
			<p className="label-checkbox-mobile">
				{label}
				{elDescricaoCampo}
				<button
					type="button"
					className={`button-checkbox-mobile ${activeButton}`}
					onClick={onClick}
				>
					<span className={'bolinha-on-off-checkbox'}>On / Off</span>
				</button>
			</p>
		</div>
	);
};

CheckboxMobile.defaultProps = {
	descricaoCampo: undefined,
};

export default CheckboxMobile;

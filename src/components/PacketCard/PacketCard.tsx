import React, { ReactElement, ReactNode, useState } from 'react';

type InputProps = {
	id: number;
	elementDescricao: ReactElement;
	labelPreco: string;
	labelBonus?: string;
	cabecalhoCard?: string;
	onClick?: () => void;
	isActive?: boolean;
};

const PacketCard: React.FC<InputProps> = ({
	id,
	elementDescricao,
	labelPreco,
	labelBonus,
	cabecalhoCard,
	onClick,
	isActive,
}) => {

	const elLabelBonus =
		labelBonus !== '' ? (
			<div className="descricao-bonus-card-packets">{labelBonus}</div>
		) : null;
	const elCabecalhoCard =
		labelBonus !== '' ? (
			<div className="cabecalho-card-packets">{cabecalhoCard}</div>
		) : (
			<div className="pt-4" />
		);
	return (
		<div role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick} className={`card-packets ${isActive ? "ativo" : ""}`}>
			{elCabecalhoCard}
			<div className="py-10px pb-4">
				<div className="descricao-card-packets">{elementDescricao}</div>
				<hr className={'my-2'} />
				<div className="preco-card-packets text-center">{labelPreco}</div>
				{elLabelBonus}
			</div>
		</div>
	);
};

PacketCard.defaultProps = {
	labelBonus: '',
	cabecalhoCard: '',
	isActive: false,
	onClick: () => undefined,
};

export default PacketCard;

import React, { ReactElement, ReactNode } from 'react';

type InputProps = {
	elementDescricao: ReactElement;
	labelPreco: string;
	labelInicio: string;
	labelFim: string;
	labelBonus?: string;
	cabecalhoCard?: string;
};

const PacketCardBig: React.FC<InputProps> = ({
	elementDescricao,
	labelPreco,
	labelInicio,
	labelFim,
	labelBonus,
	cabecalhoCard,
}) => {
	const elLabelBonus =
		labelBonus !== '' ? (
			<div className="descricao-bonus-card-packets">{labelBonus}</div>
		) : null;
	const elCabecalhoCard =
		labelBonus !== '' ? (
			<div className="cabecalho-card-packets p-3">{cabecalhoCard}</div>
		) : (
			<div className="pt-4" />
		);
	return (
		<div className="card-packets">
			{elCabecalhoCard}
			<div className="py-10px pb-4">
				<div className="descricao-card-packets p-3">{elementDescricao}</div>
				<hr className={'my-2'} />
				<div className="flex flex-row justify-center">
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div
							className="preco-card-packets text-center"
							style={{ color: '#ababab', fontSize: '15px' }}
						>
							{`Inicio:  ${labelInicio}`}
						</div>
						<div
							className="preco-card-packets text-center flex flex-row"
							style={{ color: '#ababab', fontSize: '15px' }}
						>
							{`Termina:`}
							<div style={{ color: '#3abe54' }}>{`  ${labelFim}`}</div>
						</div>
					</div>
				</div>
				<div className="text-center flex flex-row justify-center">
					<div className="mb-4" style={{ color: '#413872', fontWeight: 600 }}>
						{`Valor: ${labelPreco}`}
						{/* <div style={{fontSize: '12px'}}>
							{'  2x de R$ 52,50'}
						</div> */}
					</div>
				</div>
				{elLabelBonus}
			</div>
		</div>
	);
};

PacketCardBig.defaultProps = {
	labelBonus: '',
	cabecalhoCard: '',
};

export default PacketCardBig;

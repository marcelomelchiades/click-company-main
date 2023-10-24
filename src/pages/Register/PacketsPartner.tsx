import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PacketCard from '../../components/PacketCard/PacketCard';

const PacketsPartner: React.FC = () => {
	const packets = [
		{
			cabecalhoCard: '1 Mês',
			elementDescricao: (
				<div className="bloco-descricao-card-packets text-center" />
			),
			labelPreco: 'R$ 18,00',
			id: 1,
		},
		{
			cabecalhoCard: '2 Meses',
			elementDescricao: (
				<div className="bloco-descricao-card-packets text-center" />
			),
			labelPreco: 'R$ 36,00',
			id: 2,
		},
		{
			cabecalhoCard: '3 Meses',
			elementDescricao: (
				<div className="bloco-descricao-card-packets text-center" />
			),
			labelPreco: 'R$ 54,00',
			id: 3,
		},
		{
			cabecalhoCard: '6 Meses',
			elementDescricao: (
				<div className="bloco-descricao-card-packets text-center" />
			),
			labelPreco: 'R$ 108,00',
			id: 4,
		},
		{
			cabecalhoCard: '12 Meses',
			elementDescricao: (
				<div className="bloco-descricao-card-packets text-center" />
			),
			labelPreco: 'R$ 216,00',
			id: 5,
		},
	];

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Pacotes publicidade
					<Link to={'/login'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="mt-6 px-20px">
				<div className="mb-2">
					<div className="passos-bolinhas-packets">
						<div className="bloco-passo-bolinha-packets active">
							<div className="passo-bolinha-packets" />
							<div className="text-bolinha-packets">Pacote</div>
						</div>
						<div className="bloco-passo-bolinha-packets">
							<div className="passo-bolinha-packets" />
							<div className="text-bolinha-packets">Pagamento</div>
						</div>
					</div>
				</div>
				<div className="text-escolha-pacote-preferencia text-center mb-6">
					Escolha um pacote de sua preferência
				</div>
			</div>
			<div className="mt-6 mb-24 px-20px">
				{/* <div className="text-pacotes-premium mb-4">Pacotes Premium</div> */}
				<div className="grid grid-cols-2 gap-4">
					{packets.map(packet => {
						return (
							<PacketCard
								id={packet.id}
								cabecalhoCard={packet.cabecalhoCard}
								elementDescricao={packet.elementDescricao}
								labelPreco={packet.labelPreco}
							/>
						);
					})}
				</div>
			</div>
			<div className="footer-register">
				<Link
					to={'/payment-method'}
					className="block w-full p-2 rounded-full text-center bg-white"
				>
					Continuar
				</Link>
			</div>
		</div>
	);
};

export default PacketsPartner;

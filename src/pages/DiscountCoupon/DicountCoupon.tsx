import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input/Input';
import Tabs from '../../components/Tabs/Tabs';

const DiscountCoupon: React.FC = () => {
	const tabsCoupons = [
		{
			tabHeader: 'Ativos',
			tabActive: true,
			tabContent: (
				<div className="px-20px py-5">
					<div className="cupom mb-4 cupom-ativo">
						<div className="titulo-valor-cupom">
							<div className="titulo-cupom font-semibold">
								<i className="fas fa-ticket-alt" />
								<span> TOMA40</span>
							</div>

							<div className="valor-cupom">
								<p className="texto-valor-cupom">desconto</p>
								<p className="preco-valor-cupom font-semibold">R$ 40,00</p>
							</div>
						</div>
						<div className="validade-cupom">
							<span>válido até 31/11</span>
						</div>
					</div>
				</div>
			),
		},
		{
			tabHeader: 'Vencidos',
			tabActive: false,
			tabContent: (
				<div className="px-20px py-5">
					<div className="cupom mb-4">
						<div className="titulo-valor-cupom">
							<div className="titulo-cupom font-semibold">
								<i className="fas fa-ticket-alt" />
								<span> TOMA20</span>
							</div>

							<div className="valor-cupom">
								<p className="texto-valor-cupom">desconto</p>
								<p className="preco-valor-cupom font-semibold">R$ 20,00</p>
							</div>
						</div>
						<div className="validade-cupom">
							<span>válido até 31/11</span>
						</div>
					</div>
				</div>
			),
		},
	];

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Cupom de desconto
					<Link to={'/perfil'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="px-20px pt-5">
				<div className="bloco-adiciona-cupom">
					<Input
						name="adiciona-cupom"
						placeholder="Insira aqui seu cód. Promocional"
						type="text"
					/>
					<button type="button" className="btn-adiciona-cupom">
						Aplicar
					</button>
				</div>
			</div>
			<div className="tabs-cupons my-5">
				<Tabs allTabs={tabsCoupons} />
			</div>
		</div>
	);
};

export default DiscountCoupon;

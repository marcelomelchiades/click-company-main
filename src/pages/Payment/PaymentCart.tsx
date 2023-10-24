import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import pix from '../../assets/images/pix-icon.png';
import { selectedPlan } from '../../recoil/atoms';

const PaymentInstallment: React.FC = () => {
	const plan = useRecoilState(selectedPlan);
	const [typePlan, setTypePlan] = useState('');

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Pagamento
					<Link to={'/packets'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="px-20px text-center mt-6">
				<p className="text-color-413872 font-semibold font-size-17px mb-8">
					Sacola
				</p>
			</div>
			<div className="separador-create-perfil-2" />
			<div className="pt-2 px-20px">
				<p className="text-color-413872 font-semibold mb-4">Serviços</p>
				<p>
					<span className="font-semibold">{plan[0].typePlan}</span>
					<span className="float-right">
						{`R$ ${plan[0].pricePlan.toFixed(2).replace('.', ',')}`}
					</span>
				</p>
				<p>
					<span>{`${plan[0].timePlan} de anúncio`}</span>
				</p>
				<hr className="my-4" />
				<Link to="/packets">
					<p className="text-color-FF4767 text-center font-size-17px mb-4">
						Trocar plano
					</p>
				</Link>
			</div>
			<div className="separador-create-perfil-2" />
			<div className="resumo-pedido-cart py-3 px-20px">
				<p className="text-color-413872 font-semibold mb-4">Resumo do pedido</p>
				<p className="font-medium">
					<span>1 serviço</span>
					<span className="float-right">
						{`R$ ${plan[0].pricePlan.toFixed(2).replace('.', ',')}`}
					</span>
				</p>
				<hr className="border-color-413872 my-4" />
				<p className="text-color-413872">
					<span className="font-medium">Total</span>
					<span className="float-right font-semibold">
						{`R$ ${plan[0].pricePlan.toFixed(2).replace('.', ',')}`}
					</span>
				</p>
				{/* <p className="text-right font-size-11px text-color-413872">
					2x sem juros R$ 52,50
				</p> */}
			</div>
			<div className="separador-create-perfil-2" />
			<div className="mt-5 px-20px">
				<p className="font-medium text-color-413872 mb-3">Forma de pagamento</p>
				<div className="font-size-13px flex items-center w-full relative mt-4 mb-6">
					<img src={pix} alt="" style={{ width: 43, height: 'auto' }} />
					<div className="text-color-413872 text-left ml-3">
						<p className="font-size-13px">Chave Pix: a822479e-be70-464d-9909-05211f22e12f</p>
						<p className="font-size-11px text-green-500">
							Obs.: Enviar o comprovante via WhatsApp (+55 21 9 87930117) para
							ativação do anúncio
						</p>
					</div>
				</div>
			</div>

			<div className="pb-20" />
			<div className="fixed left-0 bottom-0 w-full bg-gray-100 px-20px py-4">
				<Link
					to={'/payment-approved-pix'}
					className="block w-full p-2 rounded-full text-center background-color-FF4767 text-white"
				>
					<p className="text-17px">Pagar</p>
				</Link>
			</div>
		</div>
	);
};

export default PaymentInstallment;

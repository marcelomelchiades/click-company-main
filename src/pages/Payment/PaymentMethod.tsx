import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { selectedPlan } from '../../recoil/atoms';
import Input from '../../components/Input/Input';

import masterCard from '../../assets/images/mastercard.png';
import visa from '../../assets/images/visa.png';
import pix from '../../assets/images/pix-icon.png';
import credit from '../../assets/images/credit-card.png';

const PaymentMethod: React.FC = () => {
	const location = useLocation();

	const plan = useRecoilState(selectedPlan);
	const [hiddenCupom, setHiddenCupom] = useState(false);

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
			<div className="px-20px text-center my-6">
				<p className="text-color-FF4767 font-semibold font-size-17px">
					Confirme o metódo de pagamento
				</p>
			</div>
			<div className="separador-create-perfil-2" />
			{/* <div className="px-20px my-6">
				<button
					type="button"
					className="font-size-17px flex items-center w-full relative"
					onClick={() => {
						setHiddenCupom(!hiddenCupom);
					}}
				>
					<i className="fas fa-ticket-alt text-color-FF4767 font-size-24px" />
					<span className="text-color-413872 ml-3">Inserir cupom</span>
					<i className="fas fa-chevron-down text-color-FF4767 font-size-24px absolute right-0" />
				</button>
				<div
					className={`bloco-adiciona-cupom mt-3 ${hiddenCupom ? '' : 'hidden'}`}
				>
					<Input
						name="adiciona-cupom"
						placeholder="Insira aqui seu cód. Promocional"
						type="text"
					/>
					<button type="button" className="btn-adiciona-cupom">
						Aplicar
					</button>
				</div>
			</div> */}
			<div className="separador-create-perfil-2" />
			<div className="px-20px my-6">
				<p className="font-size-17px text-color-413872 mb-6">
					Escolha uma formas de pagamento
				</p>
				<Link
					to={'/payment-cart'}
					className="font-size-17px flex text-left items-center w-full relative py-2 px-4 bg-white shadow rounded mt-4"
				>
					<img src={pix} alt="" style={{ width: 43, height: 'auto' }} />
					<div className="text-color-413872 ml-3">
						<p className="font-size-13px">Chave Pix: a822479e-be70-464d-9909-05211f22e12f</p>
						<p className="font-size-11px text-green-500">
							Obs.: Enviar o comprovante via WhatsApp (+55 21 9 87930117) para
							ativação do anúncio
						</p>
					</div>
					<i className="fas fa-chevron-right text-color-FF4767 font-size-24px absolute right-4" />
				</Link>

				<Link
					to={'/payment-card'}
					className="font-size-17px flex text-left items-center w-full relative py-2 px-4 bg-white shadow rounded mt-4"
				>
					<img src={credit} alt="" style={{ width: 43, height: 'auto' }} />
					<div className="text-color-413872 ml-3">
						<p className="font-size-13px">Cartão de crédito</p>
						<p className="font-size-11px text-green-500">
							Forma de pagamento mais rápida. Seu plano será liberado logo após a aprovação do pagamento.
						</p>
					</div>
					<i className="fas fa-chevron-right text-color-FF4767 font-size-24px absolute right-4" />
				</Link>

				<div className="footer-plano-escolhido fixed left-0 bottom-0 w-full px-20px py-3">
					<p className="font-size-13px text-color-413872 font-semibold mb-2">
						{plan[0].descriptionPlan}
					</p>
					<p className="font-size-13px text-color-575757 flex items-center w-full relative">
						<span>Total do pedido</span>
						<span className="absolute right-0 text-color-413872 font-size-17px font-semibold">
							{`R$ ${plan[0].pricePlan.toFixed(2).replace('.', ',')}`}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default PaymentMethod;

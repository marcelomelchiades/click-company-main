import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import pix from '../../assets/images/pix-icon.png';

const PaymentApprovedPix: React.FC = () => {
	const location = useLocation();

	const userType = localStorage.getItem('user_type');

	let urlClose = '/home-companions';

	if (userType === '2') {
		urlClose = '/home-companions';
	} else if (userType === '3') {
		urlClose = '/home-swing';
	} else if (userType === '4') {
		urlClose = '/home-close-friends';
	} else if (userType === '5') {
		urlClose = '/perfil';
	}

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Pagamento
					<Link to={urlClose} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="pagamento-aprovado text-center">
				<span>Comprovante pedente!</span>
			</div>
			<div className="body-payment">
				<div className="py-4 pt-8 text-center">
					<img
						src={pix}
						className="m-auto"
						style={{ width: 60, height: 'auto' }}
						alt="Logo Pix"
					/>
				</div>
				<div className="py-4 text-center">
					<p>
						Envie o comprovante para o WhatsApp
						<br />
						(+55 21 9 87930117)
					</p>
				</div>
				<div className="py-4 text-center">
					<button
						style={{
							borderRadius: 10,
							backgroundColor: '#bababa',
							paddingLeft: 20,
							paddingRight: 20,
							paddingTop: 10,
							paddingBottom: 10,
						}}
						type="button"
						onClick={() => {
							window.alert("Copiado para a área de transferência!");
							navigator.clipboard.writeText('a822479e-be70-464d-9909-05211f22e12f');
						}}
					>
						Copiar
					</button>
				</div>
				<div className="py-4">
					<hr />
				</div>
				<a
					href="https://api.whatsapp.com/send?phone=5521987930117&text=Acabei%20de%20me%20cadastrar!"
					target="_blank"
					rel="noreferrer"
				>
					<div className="size-xl footer-whatsapp">
						<i className="fab fa-whatsapp text-xl mr-2" />
						<span>Enviar Comprovante</span>
					</div>
				</a>
			</div>
		</div>
	);
};

export default PaymentApprovedPix;

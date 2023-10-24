import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { successfulBuy } from '../../recoil/atoms';

import iconPaymentApproved from '../../assets/images/icon-payment-approved.png';

const PaymentApproved: React.FC = () => {
	const location = useLocation();
	const transaction = useRecoilState(successfulBuy);

	const GetStatus = () => {
		switch(transaction[0].status){
			case 'AUTHORIZED':
				return (
					<div className="pagamento-aprovado text-center">
						<span>Pagamento processado!</span>
					</div>
				);
			case 'IN_ANALYSIS':
				return (
					<div className="pagamento-pendente text-center">
						<span>Pagamento pendente!</span>
					</div>
				);
			case 'DECLINED':
				return (
					<div className="pagamento-recusado text-center">
						<span>Pagamento negata!</span>
					</div>
				);
			case 'CANCELED':
				return (
					<div className="pagamento-recusado text-center">
						<span>Pagamento cancelada!</span>
					</div>
				);
			case 'PAID':
				return (
					<div className="pagamento-aprovado text-center">
						<span>Pagamento aprovada!</span>
					</div>
				);
			default:
				return (
					<div className="pagamento-pendente text-center">
						<span>Pagamento pendente!</span>
					</div>
				);			
		}
	}

	useEffect( () => {
		console.log(transaction[0])
	})

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Pagamento
					<Link to={'/home-companions'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<GetStatus />
			<div className="body-payment">
				<div className="py-4 pt-8 text-center">
					<img src={iconPaymentApproved} className="m-auto" alt="" />
				</div>
				<div className="py-4 text-center">
					<p className="text-color-FF4767">
						Id de transação:
					</p>
					<p className="text-color-FF4767">
						{transaction[0].referenceId}
					</p>
				</div>
				<div className="py-4">
					<hr />
				</div>
			</div>
		</div>
	);
};

export default PaymentApproved;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PaymentInstallment: React.FC = () => {
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
				<p className="text-color-FF4767 font-semibold font-size-17px mb-8">
					Em quantas vezes você deseja pagar?
				</p>
				<Link
					to={'/payment-cart'}
					className="font-size-17px flex text-left items-center w-full relative py-4 px-4 bg-white shadow rounded my-2"
				>
					<div className="">
						<p className="font-size-17px font-semibold inline-flex items-start">
							<span>1x R$ 94 </span>
							<span className="font-size-8px ml-1 mt-1">‘50</span>
						</p>
						<s className="font-size-8px ml-3">R$ 105,00</s>
					</div>
					<div className="absolute right-4 flex items-center">
						<span className="font-size-13px mr-4 text-green-500 font-semibold">
							(-10%)
						</span>
						<i className="fas fa-chevron-right text-color-FF4767 font-size-17px" />
					</div>
				</Link>
				<Link
					to={'/payment-cart'}
					className="font-size-17px flex text-left items-center w-full relative py-4 px-4 bg-white shadow rounded my-2"
				>
					<div className="">
						<p className="font-size-17px font-semibold flex items-start">
							<span>2x R$ 52 </span>
							<span className="font-size-8px ml-1 mt-1">‘50</span>
						</p>
					</div>
					<div className="absolute right-4 flex items-center">
						<span className="font-size-13px mr-4 text-green-500 font-semibold">
							Sem juros
						</span>
						<i className="fas fa-chevron-right text-color-FF4767 font-size-17px" />
					</div>
				</Link>
				<Link
					to={'/payment-cart'}
					className="font-size-17px flex text-left items-center w-full relative py-4 px-4 bg-white shadow rounded my-2"
				>
					<div className="">
						<p className="font-size-17px font-semibold flex items-start">
							<span>3x R$ 35 </span>
							<span className="font-size-8px ml-1 mt-1">‘50</span>
						</p>
					</div>
					<div className="absolute right-4 flex items-center">
						<span className="font-size-13px mr-4 text-green-500 font-semibold">
							Sem juros
						</span>
						<i className="fas fa-chevron-right text-color-FF4767 font-size-17px" />
					</div>
				</Link>
				<Link
					to={'/payment-cart'}
					className="font-size-17px flex text-left items-center w-full relative py-4 px-4 bg-white shadow rounded my-2"
				>
					<div className="">
						<p className="font-size-17px font-semibold flex items-start">
							<span>4x R$ 28 </span>
							<span className="font-size-8px ml-1 mt-1">‘00</span>
						</p>
					</div>
					<div className="absolute right-4 flex items-center">
						<span className="font-size-13px mr-4 font-semibold">R$ 112</span>
						<i className="fas fa-chevron-right text-color-FF4767 font-size-17px" />
					</div>
				</Link>
				<Link
					to={'/payment-cart'}
					className="font-size-17px flex text-left items-center w-full relative py-4 px-4 bg-white shadow rounded my-2"
				>
					<div className="">
						<p className="font-size-17px font-semibold flex items-start">
							<span>5x R$ 23 </span>
							<span className="font-size-8px ml-1 mt-1">‘20</span>
						</p>
					</div>
					<div className="absolute right-4 flex items-center">
						<span className="font-size-13px mr-4 font-semibold">R$ 121</span>
						<i className="fas fa-chevron-right text-color-FF4767 font-size-17px" />
					</div>
				</Link>
			</div>
		</div>
	);
};

export default PaymentInstallment;

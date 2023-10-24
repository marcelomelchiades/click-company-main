import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { fotosKyc } from '../../recoil/atoms';

const DocumentsFrontConfirmation: React.FC = () => {
	const { documentFrontTemporaryUrl } = useRecoilValue(fotosKyc);

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Anunciar serviços
					<Link to={'/login'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="mt-4 px-20px">
				<div className="text-center text-color-413872 font-size-17px font-semibold">
					<p>As informações do seu documento ficaram legíveis na foto?</p>
				</div>
				<div className="text-center my-6">
					<img
						src={documentFrontTemporaryUrl}
						className="inline-block"
						alt=""
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="text-center btn-confirmar-documents">
						<Link
							to={'/documents-front'}
							className="block w-full p-2 rounded-full text-center border-2 bg-white border-color-FF4767 text-color-FF4767"
						>
							<p className="text-17px">Tirar outra Foto</p>
						</Link>
					</div>

					<div className="text-center btn-confirmar-documents">
						<Link
							to={'/documents-back'}
							className="block w-full p-2 rounded-full text-center border-2 border-color-FF4767 background-color-FF4767 text-white"
						>
							<p className="text-17px">Sim</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DocumentsFrontConfirmation;

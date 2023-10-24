import React, { useState } from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';

import { useSetRecoilState, useRecoilValue } from 'recoil';
import { fotosKyc } from '../../recoil/atoms';

import imgFrenteDocumento from '../../assets/images/img-frente-documento.png';

const DocumentsFront: React.FC<RouteComponentProps> = ({ history }) => {
	const setFotosKyc = useSetRecoilState(fotosKyc);
	const currentFotosKyc = useRecoilValue(fotosKyc);

	const handleTakePhoto = (event: any) => {
		setFotosKyc({
			documentFront: event.target.files[0],
			documentBack: currentFotosKyc.documentBack,
			documentSelfie: currentFotosKyc.documentSelfie,
			documentFrontTemporaryUrl: URL.createObjectURL(event.target.files[0]),
			documentBackTemporaryUrl: currentFotosKyc.documentBackTemporaryUrl,
			documentSelfieTemporaryUrl: currentFotosKyc.documentSelfieTemporaryUrl,
		});
		history.push('/documents-front-confirmation');
	};

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
			<div className="mt-10 px-20px w-300px mx-auto">
				<div className="text-center text-color-413872 font-size-17px font-semibold">
					<p>
						<span>Vamos tirar foto da parte da </span>
						<span className="text-color-FF4767">frente </span>
						<span>do seu </span>
						<span className="text-color-FF4767">documento </span>
						<span>com foto.</span>
					</p>
				</div>
				<div className="text-center text-color-413872 font-normal">
					<p>Apenas CHN e RG</p>
				</div>
				<div className="text-center my-10">
					<img src={imgFrenteDocumento} className="inline-block" alt="" />
				</div>
				<div className="text-center text-color-413872 mb-10">
					<p>Para a foto ficar boa, tire o documento do plástico</p>
				</div>
				<div className="text-center btn-confirmar-documents cursor-pointer">
					<label
						htmlFor="btn-tirar-foto-mobile"
						className="block w-full p-2 rounded-full text-center background-color-FF4767 text-white cursor-pointer"
					>
						<p className="text-17px">Tirar Foto</p>
						<input
							style={{ display: 'none' }}
							id="btn-tirar-foto-mobile"
							type="file"
							accept="image/*"
							capture="environment"
							onChange={handleTakePhoto}
						/>
					</label>
				</div>
			</div>
		</div>
	);
};

export default DocumentsFront;

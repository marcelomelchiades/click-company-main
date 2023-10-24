import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import imgDocumentoSelfie from '../../assets/images/img-documento-selfie.png';
import { fotosKyc } from '../../recoil/atoms';

const DocumentsFrontSelfie: React.FC<RouteComponentProps> = ({ history }) => {
	const setFotosKyc = useSetRecoilState(fotosKyc);
	const currentFotosKyc = useRecoilValue(fotosKyc);

	const handleTakePhoto = (event: any) => {
		setFotosKyc({
			documentFront: currentFotosKyc.documentFront,
			documentBack: currentFotosKyc.documentBack,
			documentSelfie: event.target.files[0],
			documentFrontTemporaryUrl: currentFotosKyc.documentFrontTemporaryUrl,
			documentBackTemporaryUrl: currentFotosKyc.documentBackTemporaryUrl,
			documentSelfieTemporaryUrl: URL.createObjectURL(event.target.files[0]),
		});
		history.push('/documents-front-selfie-confirmation');
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
			<div className="mt-14 px-20px">
				<div className="text-center text-color-413872 font-size-17px font-semibold">
					<p>
						<span>Agora vamos tirar uma </span>
						<span className="text-color-FF4767">foto sua de frente </span>
						<span>
							segurando o documento com a parte da frente Virada para câmera.
						</span>
					</p>
				</div>
				<div className="text-center my-20">
					<img src={imgDocumentoSelfie} className="inline-block" alt="" />
				</div>
				<div className="text-center font-size-11px text-color-575757 mb-5">
					<p>
						Não esquenta , os documentos são 100% privados e a gente nunca vai
						mostrar pra ninguém
					</p>
				</div>
				<div className="text-center btn-confirmar-documents">
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

export default DocumentsFrontSelfie;

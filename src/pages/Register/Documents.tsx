import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import imgFrenteVersoDocumento from '../../assets/images/img-frente-verso-documento.png';

const Documents: React.FC = () => {
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
			<div className="mt-6 px-20px">
				<div className="grid grid-cols-4 gap-3 mb-8">
					<div className="aba-anuciar-servicos active">
						<p>Dados Anúncio</p>
					</div>
					<div className="aba-anuciar-servicos">
						<p>Perfil</p>
					</div>
					<div className="aba-anuciar-servicos">
						<p>Plano</p>
					</div>
					<div className="aba-anuciar-servicos">
						<p>Pagamento</p>
					</div>
				</div>
				<div className="mb-8">
					<div className="text-center text-precisamos-de-tres-fotos mb-2">
						Agora vamos precisar de 3 fotos do seu RG ou CNH
					</div>
					<div className="text-center text-passos-documents">Passo 3 de 3</div>
				</div>
				<div className="text-center mb-8">
					<img src={imgFrenteVersoDocumento} className="inline-block" alt="" />
				</div>
				<div className="mb-10">
					<div className="photos-documents-need">
						<span className="numero-photos-documents-need">1</span>
						<span className="text-photos-documents-need">
							Uma foto de frente
						</span>
					</div>
					<div className="photos-documents-need">
						<span className="numero-photos-documents-need">2</span>
						<span className="text-photos-documents-need">
							Uma foto de verso
						</span>
					</div>
					<div className="photos-documents-need">
						<span className="numero-photos-documents-need">3</span>
						<span className="text-photos-documents-need">
							Uma foto do seu rosto junto ao documento
						</span>
					</div>
				</div>
				<div className="text-center text-documents-private mb-4">
					<p>
						Não esquenta , os documentos são 100% privados e a gente nunca vai
						mostrar pra ninguém
					</p>
				</div>
				<div className="text-center btn-confirmar-documents">
					<Link
						to={'/documents-front'}
						className="block w-full p-2 rounded-full text-center background-color-FF4767 text-white"
					>
						<p className="text-17px">Começar</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Documents;

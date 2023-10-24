import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fluxoCreatePerfil, typeCreatePerfil } from '../../recoil/atoms';

const DocumentsFinal: React.FC = () => {
	const [fluxoCreatePerfilState, setFluxoCreatePerfilState] =
		useRecoilState(fluxoCreatePerfil);

	const { typePerfil } = useRecoilValue(typeCreatePerfil);
	const perfilCreate = localStorage.getItem('perfilCreate');

	let nextUrl = '/creat-perfil';

	if (typePerfil === 'acompanhante' && perfilCreate === '1') {
		nextUrl = '/update-perfil';
	} else if (typePerfil === 'swing' && perfilCreate === '1') {
		nextUrl = '/update-perfil-swing';
	} else if (typePerfil === 'close-friends' && perfilCreate === '1') {
		nextUrl = '/update-perfil-close-friends';
	} else if (typePerfil === 'partner' && perfilCreate === '1') {
		nextUrl = '/update-perfil-partner';
	} else if (typePerfil === 'acompanhante') {
		nextUrl = '/create-perfil';
	} else if (typePerfil === 'swing') {
		nextUrl = '/create-perfil-swing';
	} else if (typePerfil === 'close-friends') {
		nextUrl = '/create-perfil-close-friends';
	} else if (typePerfil === 'partner') {
		nextUrl = '/create-perfil-partner';
	}

	useEffect(() => {
		setFluxoCreatePerfilState({
			finalSendTo: '/packets',
		});
	}, []);

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
			<div className="mt-20 px-20px">
				<div className="text-center text-color-413872 font-size-17px font-semibold mb-20">
					<p className="font-size-24px text-color-FF4767">Pronto!</p>
					<p>
						<span>Enquanto analisamos suas fotos, você pode </span>
						{perfilCreate === '1' ? (
							<span className="text-color-FF4767">
								atualizar o seu cadastro
							</span>
						) : (
							<span className="text-color-FF4767">
								continuar o seu cadastro
							</span>
						)}
						{perfilCreate === '1' ? (
							''
						) : (
							<span> e escolher um plano de sua preferência (:</span>
						)}
					</p>
				</div>
				<div className="text-center btn-confirmar-documents">
					<Link
						to={nextUrl}
						className="block w-full p-2 rounded-full text-center border-2 border-color-FF4767 background-color-FF4767 text-white"
					>
						<p className="text-17px">Continuar</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DocumentsFinal;

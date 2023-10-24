import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import axios from 'axios';
import { useRecoilValue } from 'recoil';
import Logo from '../../components/Logo/Logo';
import { endpointState } from '../../recoil/atoms';

const Login: React.FC = () => {
	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			width: '400px',
			maxWidth: '100%',
			paddingBottom: '8px',
		},
		overlay: {
			background: 'rgba(0,0,0,0.4)',
		},
	};

	const [modalIsOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const { urlEndpoint } = useRecoilValue(endpointState);
	const urlAccount = `${urlEndpoint}/api/account`;

	const [token, setToken] = useState(localStorage.getItem('token'));

	function handleLogOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user_type');
		localStorage.removeItem('perfilCreate');
		localStorage.removeItem('kyc');
	}

	useEffect(() => {
		axios
			.get(urlAccount, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.catch(error => {
				setToken(null);
				handleLogOut();
			});
	}, []);

	return (
		<div className="fundo-degrade-azul-roxo">
			<div className="conteudo-login">
				<div className="text-center logo-home mb-12">
					<Logo logoType={'red vertical'} classes={'inline'} />
				</div>
				<div className="text-white text-center mb-12">
					<p className="font-bold text-20px">É um prazer ter você aqui</p>
					<p className="text-17px">Vamos começar?</p>
				</div>
				{token !== null ? (
					''
				) : (
					<div className="w-full mb-8">
						<Link
							to={'/login-with-account'}
							className="block w-full p-2 rounded-full text-center background-color-FF4767 text-white"
						>
							<p className="text-15px font-bold">Entrar</p>
							<p className="text-13px mb-0">Já tenho conta</p>
						</Link>
					</div>
				)}
				{token !== null ? (
					''
				) : (
					<div>
						<div className="mb-4 text-white">
							<p>O que você deseja?</p>
						</div>
						<div className="mb-5">
							<Link
								to={'/home-companions'}
								className="block w-full p-2 rounded-full text-center bg-white"
							>
								<p className="text-15px font-bold text-color-413872">
									Acompanhantes
								</p>
								<p className="text-13px mb-0">Mulheres / Homens / Trans</p>
							</Link>
						</div>
						<div className="mb-5">
							<Link
								to={'/home-swing'}
								className="block w-full p-2 rounded-full text-center bg-white"
							>
								<p className="text-15px font-bold text-color-413872">Swing</p>
								<p className="text-13px mb-0">
									Anuncie em dupla e interaja com diversos casais
								</p>
							</Link>
						</div>
						<div className="mb-5">
							<Link
								to={'/home-close-friends'}
								className="block w-full p-2 rounded-full text-center bg-white"
							>
								<p className="text-15px font-bold text-color-413872">
									Close Friends
								</p>
								<p className="text-13px mb-0">
									Veja conteúdos sensuais
								</p>
							</Link>
						</div>
						<div className="mb-10">
							<Link
								to={'/home-partners'}
								className="block w-full p-2 rounded-full text-center bg-white"
							>
								<p className="text-15px font-bold text-color-413872">
									Nossos Parceiros
								</p>
								<p className="text-13px mb-0">
									Veja todos os nossos parceiros
								</p>
							</Link>
						</div>
					</div>
				)}

				{token !== null ? (
					<div>
						<div className="text-center">
							<p className="text-17px text-white">Crie o seu anuncio?</p>
						</div>
						<div className="mb-4 mt-4">
							<Link
								to={'/register-companions'}
								className="block w-full p-2 rounded-full text-center bg-white"
							>
								<p className="text-15px font-bold text-color-413872">
									Acompanhantes
								</p>
								<p className="text-13px mb-0">Mulheres / Homens / Trans</p>
							</Link>
						</div>
						<div className="mb-4 mt-4">
							<Link
								to={'/register-swing'}
								className="block w-full p-2 rounded-full text-center bg-white"
							>
								<p className="text-15px font-bold text-color-413872">Swing</p>
								<p className="text-13px mb-0">Anuncie em dupla e intereja com diversos casais</p>
							</Link>
						</div>
						<div className="mt-4">
							<Link
								to={'/register-close-friends'}
								className="block w-full p-2 rounded-full text-center bg-white"
							>
								<p className="text-15px font-bold text-color-413872">
									Close Friends
								</p>
								<p className="text-13px mb-0">Anuncie aqui os seus conteúdos sensuais</p>
							</Link>
						</div>
						<div className="mb-4 mt-4">
							<Link
								to={'/register-partner'}
								className="block w-full p-2 rounded-full text-center bg-white"
							>
								<p className="text-15px font-bold text-color-413872">
									Parceiros Click Company
								</p>
								<p className="text-13px mb-0">Anuncie aqui sua loja, empresa ou serviço</p>
							</Link>
						</div>
					</div>
				) : (
					<div className="text-center text-white text-17px font-semibold">
						<button type="button" onClick={openModal}>
							Crie o seu perfil e anuncie aqui!
						</button>
					</div>
				)}
			</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => closeModal()}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div className="text-center">
					<p className="text-17px">Faça o seu anuncio!</p>
				</div>
				<div className="mb-4 mt-4">
					<Link
						to={'/home-companions'}
						className="block w-full p-2 rounded-full text-center bg-gradient"
					>
						<p className="text-white text-15px font-bold ">Acompanhantes</p>
						<p className="text-white text-13px mb-0">
							Mulheres / Homens / Trans
						</p>
					</Link>
				</div>
				<div className="mb-4 mt-4">
					<Link
						to={'/home-swing'}
						className="block w-full p-2 rounded-full text-center bg-gradient"
					>
						<p className="text-white text-15px font-bold ">Swing</p>
						<p className="text-white text-13px mb-0">
							Intereja com diversos casais
						</p>
					</Link>
				</div>
				<div className="mt-4">
					<Link
						to={'/home-close-friends'}
						className="block w-full p-2 rounded-full text-center bg-gradient"
					>
						<p className="text-white text-15px font-bold ">Close Friends</p>
						<p className="text-white text-13px mb-0">Veja conteúdos sensuais</p>
					</Link>
				</div>
				<div className="mt-4">
					<Link
						to={'/home-partners'}
						className="block w-full p-2 rounded-full text-center bg-gradient"
					>
						<p className="text-white text-15px font-bold ">Parceiros</p>
						<p className="text-white text-13px mb-0">
							Veja todos nossos parceiros
						</p>
					</Link>
				</div>
				<button type="button" onClick={closeModal}>
					<i className="fas fa-times position-close-icon" />
				</button>
			</Modal>
		</div>
	);
};

export default Login;

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	endpointState,
	fluxoCreatePerfil,
	typeCreatePerfil,
} from '../../recoil/atoms';

import defaultAvatar from '../../assets/images/default-avatar.png';
import iconUserRosa from '../../assets/images/icon-user-rosa.svg';
import iconMinhasAssinaturas from '../../assets/images/icon-minhas-assinaturas.svg';
import iconSair from '../../assets/images/icon-sair.svg';
import iconTicket from '../../assets/images/icon-ticket.svg';

import MenuItem from '../../components/MenuItem/MenuItem';

const Perfil: React.FC = () => {
	interface UserData {
		kyc: any;
	}

	const history = useHistory();

	const { urlEndpoint } = useRecoilValue(endpointState);
	const urlAccount = `${urlEndpoint}/api/account`;
	const urlOrderUser = `${urlEndpoint}/api/checkout/order/user`;

	const userType = localStorage.getItem('user_type');

	const token = localStorage.getItem('token');
	const userAccount: any = localStorage.getItem('user_type');
	const profileCreate: any = localStorage.getItem('perfilCreate');
	const [kyc, setKyc] = useState<UserData | any>(localStorage.getItem('kyc'));
	const [nickname, setNickname] = useState('');
	const [avatar, setAvatar] = useState('');
	const [idUser, setIdUser] = useState('');
	let updatePage = '';

	useEffect(() => {
		axios
			.get(urlAccount, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(responseAccount => {
				if (kyc !== responseAccount.data.kyc) {
					localStorage.setItem('kyc', responseAccount.data.kyc);
					setKyc(responseAccount.data.kyc);
				}
				setNickname(responseAccount.data.profile?.nickname);
				setIdUser(responseAccount.data.id);
				if (userType !== '5') {
					setAvatar(responseAccount.data.profile?.midias[0]?.link['50']);
				}
			})
			.catch(error => {
				console.log(error);
				handleLogOut();
				history.push('/home');
			});
	}, []);

	if (
		userAccount === '2' &&
		profileCreate === '0' &&
		(kyc === 'pending' || kyc === 'okay')
	) {
		updatePage = '/create-perfil';
	} else if (userAccount === '2' && kyc === null) {
		updatePage = '/documents';
	} else if (userAccount === '2' && profileCreate === '1') {
		updatePage = '/update-perfil';
	} else if (userAccount === '2' && profileCreate === '0') {
		updatePage = '/documents';
	}

	if (
		userAccount === '3' &&
		profileCreate === '0' &&
		(kyc === 'pending' || kyc === 'okay')
	) {
		updatePage = '/create-perfil-swing';
	} else if (userAccount === '3' && kyc === null) {
		updatePage = '/documents';
	} else if (userAccount === '3' && profileCreate === '1') {
		updatePage = '/update-perfil-swing';
	} else if (userAccount === '3' && profileCreate === '0') {
		updatePage = '/documents';
	}

	if (
		userAccount === '4' &&
		profileCreate === '0' &&
		(kyc === 'pending' || kyc === 'okay')
	) {
		updatePage = '/create-perfil-close-friends';
	} else if (userAccount === '4' && kyc === null) {
		updatePage = '/documents';
	} else if (userAccount === '4' && profileCreate === '1') {
		updatePage = '/update-perfil-close-friends';
	} else if (userAccount === '4' && profileCreate === '0') {
		updatePage = '/documents';
	}

	if (
		userAccount === '5' &&
		profileCreate === '0' &&
		(kyc === 'pending' || kyc === 'okay')
	) {
		updatePage = '/create-perfil-partner';
	} else if (userAccount === '5' && kyc === null) {
		updatePage = '/documents';
	} else if (userAccount === '5' && profileCreate === '1') {
		updatePage = '/update-perfil-partner';
	} else if (userAccount === '5' && profileCreate === '0') {
		updatePage = '/documents';
	}

	let urlHome = '/home-companions';
	if (userType === '2') {
		urlHome = '/home-companions';
	} else if (userType === '3') {
		urlHome = '/home-swing';
	} else if (userType === '4') {
		urlHome = '/home-close-friends';
	} else if (userType === '5') {
		urlHome = '/login';
	}

	const itemsMenu = [
		{
			label: 'Home',
			icon: <i className="fas fa-home" />,
			to: urlHome,
		},
		{
			label: 'Meu Perfil',
			icon: iconUserRosa,
			to: updatePage,
		},
		{
			label: 'Minhas assinaturas',
			icon: iconMinhasAssinaturas,
			to: '/signatures',
		},
		// {
		// 	label: 'Cupom',
		// 	icon: iconTicket,
		// 	to: '/discount-coupon',
		// },
		// {
		// 	label: 'Ajuda',
		// 	icon: <i className="far fa-comment-alt" />,
		// 	to: '/help',
		// },
		{
			label: 'Termos e Politicas',
			icon: <i className="far fa-sticky-note" />,
			to: '/perfil',
		},
		{
			label: 'Sair',
			icon: iconSair,
			to: '/login',
		},
	];

	if (userType === '5') {
		itemsMenu.splice(2, 0, {
			label: 'Minhas Publicidades',
			icon: <i className="far fa-sticky-note" />,
			to: '/update-publication',
		});
	}

	const [fluxoCreatePerfilState, setFluxoCreatePerfilState] =
		useRecoilState(fluxoCreatePerfil);

	useEffect(() => {
		setFluxoCreatePerfilState({
			finalSendTo: '/perfil-companion',
		});
	}, []);

	function handleLogOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user_type');
		localStorage.removeItem('perfilCreate');
		localStorage.removeItem('kyc');
	}

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center bg-white">
				<p>
					Conta
					<button
						type="button"
						onClick={() => {
							history.goBack();
						}}
						className="float-right"
					>
						<i className="fas fa-times" />
					</button>
				</p>
			</div>
			<div className="body-perfil">
				<div className="bloco-thumb-nome-perfil">
					{avatar !== '' ? (
						<div className="inline-block mr-4">
							<img src={avatar} className="img-avatar-perfil" alt="" />
						</div>
					) : null}

					<Link to={`/perfil-user/${idUser}`}>
						<div className="inline-block">
							<p className="nome-perfil">{nickname}</p>
							<p className="text-dados-perfil">Meus dados</p>
						</div>
					</Link>
					<div className="float-right">
						<i className="fas fa-chevron-right" />
					</div>
				</div>
				<Link to={'/packets'} className="btn-contratar-plano mb-6">
					Contratar plano
				</Link>
				<div className="px-20px">
					{itemsMenu.map(item => {
						return (
							<MenuItem
								onClick={() => handleLogOut()}
								label={item.label}
								icon={item.icon}
								to={item.to}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Perfil;

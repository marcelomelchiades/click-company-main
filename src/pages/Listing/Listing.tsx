import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Loading from '../../components/Loading/Loading';
import { endpointState } from '../../recoil/atoms';

type ListingParams = {
	type: string;
	name: string;
};

type typeResponseAxios = {
	[key: string]: any;
};

type typeCardsAcompanhantes = {
	id: string;
	fotoDestaque: string;
	premium: string;
	basico: string;
	nome: string;
	idade: string;
	cidade: string;
	estado: string;
	sexo: string;
	qtdFotos: string;
	qtdVideos: string;
	price: string;
}[];

const Listing: React.FC = () => {
	const params = useParams<ListingParams>();
	const history = useHistory();
	const { urlEndpoint } = useRecoilValue(endpointState);

	const [showLoading, setShowLoading] = useState(true);

	const [cardsMulheresPremium, setCardsMulheresPremium] =
		useState<typeCardsAcompanhantes>([]);
	const [cardsMulheresBasic, setCardsMulheresBasic] =
		useState<typeCardsAcompanhantes>([]);

	const [cardsTransPremium, setCardsTransPremium] =
		useState<typeCardsAcompanhantes>([]);
	const [cardsTransBasic, setCardsTransBasic] =
		useState<typeCardsAcompanhantes>([]);

	const [cardsHomemPremium, setCardsHomemPremium] =
		useState<typeCardsAcompanhantes>([]);
	const [cardsHomemBasic, setCardsHomemBasic] =
		useState<typeCardsAcompanhantes>([]);
	const [cardsSwing, setCardsSwing] = useState<typeCardsAcompanhantes>([]);
	const [cardsCloseFriends, setCardsCloseFriends] =
		useState<typeCardsAcompanhantes>([]);

	const newCardsAcompanhantes: typeCardsAcompanhantes = [];
	const newCardsWomanBasic: typeCardsAcompanhantes = [];

	const newCardsTrans: typeCardsAcompanhantes = [];
	const newCardsTransBasic: typeCardsAcompanhantes = [];

	const newCardsHomem: typeCardsAcompanhantes = [];
	const newCardsHomemBasic: typeCardsAcompanhantes = [];

	const urlEndpointAcompanhantes = `${urlEndpoint}/api/account/list/2`;
	const urlEndpointSwing = `${urlEndpoint}/api/account/list/3`;
	const urlEndpointCloseFriends = `${urlEndpoint}/api/account/list/4`;

	useEffect(() => {
		if (params.type === '1') {
			searchWomanPremium();
			searchWomanBasic();
		} else if (params.type === '2') {
			searchTransPremium();
			searchTransBasic();
		} else if (params.type === '3') {
			searchHomemPremium();
			searchHomemBasic();
		} else if (params.type === '4') {
			searchSwingState();
		} else if (params.type === '5') {
			searchCloseState();
		}
	}, []);

	const searchWomanPremium = () => {
		setCardsMulheresPremium([]);
		setShowLoading(true);

		axios
			.get(urlEndpointAcompanhantes, {
				params: {
					state: localStorage.getItem('estadoName'),
					product_type_name: 'Premium',
					gender: 'Mulher',
				},
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.data.length > 0) {
					response.data.data.forEach((profile: any, index: number) => {
						if (profile.profile !== null) {
							let qtdVideos = 0;
							let qtdImages = 0;

							if (profile.profile.midias?.length > 0) {
								const midiasProfile = profile.profile.midias;

								midiasProfile.forEach((midia: any) => {
									if (midia.type === 'image') {
										qtdImages += 1;
									} else if (midia.type === 'video') {
										qtdVideos += 1;
									}
								});
							}

							newCardsAcompanhantes.push({
								id: profile.id,
								fotoDestaque:
									typeof profile.profile?.midias[0]?.link['512'] !==
									typeof undefined
										? profile.profile?.midias[0]?.link['512']
										: profile.profile?.midias[0]?.link['50'],
								premium: 'Premium',
								basico: 'Basico',
								nome: profile.profile.nickname,
								idade: profile.profile.age,
								cidade: profile.address?.city,
								estado: profile.address?.state,
								sexo: profile.profile.gender,
								qtdFotos: qtdImages.toString(),
								qtdVideos: qtdVideos.toString(),
								price: `R$ ${profile.profile.price
									.toFixed(2)
									.replace('.', ',')}`,
							});
						}
					});
					setCardsMulheresPremium(newCardsAcompanhantes);
					setShowLoading(false);
				} else {
					setShowLoading(false);
				}
			});
	};

	const searchWomanBasic = () => {
		setCardsMulheresBasic([]);
		setShowLoading(true);
		axios
			.get(urlEndpointAcompanhantes, {
				params: {
					state: localStorage.getItem('estadoName'),
					product_type_name: 'Básico',
					gender: 'Mulher',
				},
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.data.length > 0) {
					response.data.data.forEach((profile: any, index: number) => {
						if (profile.profile !== null) {
							let qtdVideos = 0;
							let qtdImages = 0;

							if (profile.profile.midias?.length > 0) {
								const midiasProfile = profile.profile.midias;

								midiasProfile.forEach((midia: any) => {
									if (midia.type === 'image') {
										qtdImages += 1;
									} else if (midia.type === 'video') {
										qtdVideos += 1;
									}
								});
							}

							newCardsWomanBasic.push({
								id: profile.id,
								fotoDestaque:
									typeof profile.profile?.midias[0]?.link['512'] !==
									typeof undefined
										? profile.profile?.midias[0]?.link['512']
										: profile.profile?.midias[0]?.link['50'],
								premium: 'Premium',
								basico: 'Basico',
								nome: profile.profile.nickname,
								idade: profile.profile.age,
								cidade: profile.address?.city,
								estado: profile.address?.state,
								sexo: profile.profile.gender,
								qtdFotos: qtdImages.toString(),
								qtdVideos: qtdVideos.toString(),
								price: `R$ ${profile.profile.price
									.toFixed(2)
									.replace('.', ',')}`,
							});
						}
					});
					setCardsMulheresBasic(newCardsWomanBasic);
					setShowLoading(false);
				} else {
					setShowLoading(false);
				}
			});
	};

	const searchTransPremium = () => {
		setCardsTransPremium([]);
		setShowLoading(true);

		axios
			.get(urlEndpointAcompanhantes, {
				params: {
					state: localStorage.getItem('estadoName'),
					product_type_name: 'Premium',
					gender: 'Trans',
				},
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.data.length > 0) {
					response.data.data.forEach((profile: any, index: number) => {
						if (profile.profile !== null) {
							let qtdVideos = 0;
							let qtdImages = 0;

							if (profile.profile.midias?.length > 0) {
								const midiasProfile = profile.profile.midias;

								midiasProfile.forEach((midia: any) => {
									if (midia.type === 'image') {
										qtdImages += 1;
									} else if (midia.type === 'video') {
										qtdVideos += 1;
									}
								});
							}

							newCardsTrans.push({
								id: profile.id,
								fotoDestaque:
									typeof profile.profile?.midias[0]?.link['512'] !==
									typeof undefined
										? profile.profile?.midias[0]?.link['512']
										: profile.profile?.midias[0]?.link['50'],
								premium: 'Premium',
								basico: 'Basico',
								nome: profile.profile.nickname,
								idade: profile.profile.age,
								cidade: profile.address?.city,
								estado: profile.address?.state,
								sexo: profile.profile.gender,
								qtdFotos: qtdImages.toString(),
								qtdVideos: qtdVideos.toString(),
								price: `R$ ${profile.profile.price
									.toFixed(2)
									.replace('.', ',')}`,
							});
						}
					});
					setCardsTransPremium(newCardsTrans);
					setShowLoading(false);
				} else {
					setShowLoading(false);
				}
			});
	};

	const searchTransBasic = () => {
		setCardsTransBasic([]);
		setShowLoading(true);
		axios
			.get(urlEndpointAcompanhantes, {
				params: {
					state: localStorage.getItem('estadoName'),
					product_type_name: 'Básico',
					gender: 'Trans',
				},
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.data.length > 0) {
					response.data.data.forEach((profile: any, index: number) => {
						if (profile.profile !== null) {
							let qtdVideos = 0;
							let qtdImages = 0;

							if (profile.profile.midias?.length > 0) {
								const midiasProfile = profile.profile.midias;

								midiasProfile.forEach((midia: any) => {
									if (midia.type === 'image') {
										qtdImages += 1;
									} else if (midia.type === 'video') {
										qtdVideos += 1;
									}
								});
							}

							newCardsTransBasic.push({
								id: profile.id,
								fotoDestaque:
									typeof profile.profile?.midias[0]?.link['512'] !==
									typeof undefined
										? profile.profile?.midias[0]?.link['512']
										: profile.profile?.midias[0]?.link['50'],
								premium: 'Premium',
								basico: 'Basico',
								nome: profile.profile.nickname,
								idade: profile.profile.age,
								cidade: profile.address?.city,
								estado: profile.address?.state,
								sexo: profile.profile.gender,
								qtdFotos: qtdImages.toString(),
								qtdVideos: qtdVideos.toString(),
								price: `R$ ${profile.profile.price
									.toFixed(2)
									.replace('.', ',')}`,
							});
						}
					});
					setCardsTransBasic(newCardsTransBasic);
					setShowLoading(false);
				} else {
					setShowLoading(false);
				}
			});
	};

	const searchHomemPremium = () => {
		setCardsHomemPremium([]);
		setShowLoading(true);

		axios
			.get(urlEndpointAcompanhantes, {
				params: {
					state: localStorage.getItem('estadoName'),
					product_type_name: 'Premium',
					gender: 'Homem',
				},
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.data.length > 0) {
					response.data.data.forEach((profile: any, index: number) => {
						if (profile.profile !== null) {
							let qtdVideos = 0;
							let qtdImages = 0;

							if (profile.profile.midias?.length > 0) {
								const midiasProfile = profile.profile.midias;

								midiasProfile.forEach((midia: any) => {
									if (midia.type === 'image') {
										qtdImages += 1;
									} else if (midia.type === 'video') {
										qtdVideos += 1;
									}
								});
							}

							newCardsHomem.push({
								id: profile.id,
								fotoDestaque:
									typeof profile.profile?.midias[0]?.link['512'] !==
									typeof undefined
										? profile.profile?.midias[0]?.link['512']
										: profile.profile?.midias[0]?.link['50'],
								premium: 'Premium',
								basico: 'Basico',
								nome: profile.profile.nickname,
								idade: profile.profile.age,
								cidade: profile.address?.city,
								estado: profile.address?.state,
								sexo: profile.profile.gender,
								qtdFotos: qtdImages.toString(),
								qtdVideos: qtdVideos.toString(),
								price: `R$ ${profile.profile.price
									.toFixed(2)
									.replace('.', ',')}`,
							});
						}
					});
					setCardsHomemPremium(newCardsHomem);
					setShowLoading(false);
				} else {
					setShowLoading(false);
				}
			});
	};

	const searchHomemBasic = () => {
		setCardsHomemBasic([]);
		setShowLoading(true);
		axios
			.get(urlEndpointAcompanhantes, {
				params: {
					state: localStorage.getItem('estadoName'),
					product_type_name: 'Básico',
					gender: 'Homem',
				},
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.data.length > 0) {
					response.data.data.forEach((profile: any, index: number) => {
						if (profile.profile !== null) {
							let qtdVideos = 0;
							let qtdImages = 0;

							if (profile.profile.midias?.length > 0) {
								const midiasProfile = profile.profile.midias;

								midiasProfile.forEach((midia: any) => {
									if (midia.type === 'image') {
										qtdImages += 1;
									} else if (midia.type === 'video') {
										qtdVideos += 1;
									}
								});
							}

							newCardsHomemBasic.push({
								id: profile.id,
								fotoDestaque:
									typeof profile.profile?.midias[0]?.link['512'] !==
									typeof undefined
										? profile.profile?.midias[0]?.link['512']
										: profile.profile?.midias[0]?.link['50'],
								premium: 'Premium',
								basico: 'Basico',
								nome: profile.profile.nickname,
								idade: profile.profile.age,
								cidade: profile.address?.city,
								estado: profile.address?.state,
								sexo: profile.profile.gender,
								qtdFotos: qtdImages.toString(),
								qtdVideos: qtdVideos.toString(),
								price: `R$ ${profile.profile.price
									.toFixed(2)
									.replace('.', ',')}`,
							});
						}
					});
					setCardsHomemBasic(newCardsHomemBasic);
					setShowLoading(false);
				} else {
					setShowLoading(false);
				}
			});
	};

	const searchSwingState = () => {
		setCardsSwing([]);
		setShowLoading(true);
		axios
			.get(urlEndpointSwing, {
				params: {
					state: localStorage.getItem('estadoName'),
				},
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.data.length > 0) {
					response.data.data.forEach((profile: any, index: number) => {
						if (profile.profile !== null) {
							let qtdVideos = 0;
							let qtdImages = 0;

							if (profile.profile.midias?.length > 0) {
								const midiasProfile = profile.profile.midias;

								midiasProfile.forEach((midia: any) => {
									if (midia.type === 'image') {
										qtdImages += 1;
									} else if (midia.type === 'video') {
										qtdVideos += 1;
									}
								});
							}

							newCardsAcompanhantes.push({
								id: profile.id,
								fotoDestaque:
									typeof profile.profile?.midias[0]?.link['512'] !==
									typeof undefined
										? profile.profile?.midias[0]?.link['512']
										: profile.profile?.midias[0]?.link['50'],
								premium: 'Premium',
								basico: 'Basico',
								nome: profile.profile.nickname,
								idade: profile.profile.age,
								cidade: profile.address?.city,
								estado: profile.address?.state,
								sexo: profile.profile.gender,
								qtdFotos: qtdImages.toString(),
								qtdVideos: qtdVideos.toString(),
								price: `R$ ${profile.profile.price
									.toFixed(2)
									.replace('.', ',')}`,
							});
						}
					});
					// console.log(newCardsAcompanhantes);
					setCardsSwing(newCardsAcompanhantes);
					setShowLoading(false);
				} else {
					setShowLoading(false);
				}
			});
	};

	const searchCloseState = () => {
		setCardsCloseFriends([]);
		setShowLoading(true);
		axios
			.get(urlEndpointCloseFriends, {
				params: {
					state: localStorage.getItem('estadoName'),
				},
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.data.length > 0) {
					response.data.data.forEach((profile: any, index: number) => {
						if (profile.profile !== null) {
							let qtdVideos = 0;
							let qtdImages = 0;

							if (profile.profile.midias?.length > 0) {
								const midiasProfile = profile.profile.midias;

								midiasProfile.forEach((midia: any) => {
									if (midia.type === 'image') {
										qtdImages += 1;
									} else if (midia.type === 'video') {
										qtdVideos += 1;
									}
								});
							}

							newCardsAcompanhantes.push({
								id: profile.id,
								fotoDestaque:
									typeof profile.profile?.midias[0]?.link['512'] !==
									typeof undefined
										? profile.profile?.midias[0]?.link['512']
										: profile.profile?.midias[0]?.link['50'],
								premium: 'Premium',
								basico: 'Basico',
								nome: profile.profile.nickname,
								idade: profile.profile.age,
								cidade: profile.address?.city,
								estado: profile.address?.state,
								sexo: profile.profile.gender,
								qtdFotos: qtdImages.toString(),
								qtdVideos: qtdVideos.toString(),
								price: `R$ ${profile.profile.price
									.toFixed(2)
									.replace('.', ',')}`,
							});
						}
					});
					// console.log(newCardsAcompanhantes);
					setCardsCloseFriends(newCardsAcompanhantes);
					setShowLoading(false);
				} else {
					setShowLoading(false);
				}
			});
	};

	const showItem = (item: any) => {
		return (
			<div
				key={item.id}
				style={{
					padding: 5,
					width: '50%',
					boxSizing: 'border-box',
				}}
			>
				<Link to={`/perfil-user/${item.id}`}>
					<img
						style={{ borderRadius: 5 }}
						src={item.fotoDestaque}
						alt={item.nome}
					/>
				</Link>
			</div>
		);
	};

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center bg-white">
				<p>
					{params?.name}
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
				<div
					style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
				>
					{showLoading && (
						<div
							style={{
								display: 'flex',
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Loading
								showLoading={showLoading}
								className="inline-loading loading-center"
							/>
						</div>
					)}
					{cardsMulheresPremium.map((item: any) => showItem(item))}
					{cardsMulheresBasic.map((item: any) => showItem(item))}
					{cardsTransPremium.map((item: any) => showItem(item))}
					{cardsTransBasic.map((item: any) => showItem(item))}
					{cardsHomemPremium.map((item: any) => showItem(item))}
					{newCardsHomemBasic.map((item: any) => showItem(item))}
					{cardsSwing.map((item: any) => showItem(item))}
					{cardsCloseFriends.map((item: any) => showItem(item))}
				</div>
			</div>
		</div>
	);
};

export default Listing;

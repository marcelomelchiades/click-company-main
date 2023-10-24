/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useRecoilValue } from 'recoil';
import { endpointState } from '../../recoil/atoms';

import Logo from '../../components/Logo/Logo';
import Loading from '../../components/Loading/Loading';
import CampaignsCarousel from '../../components/CampaignsCarousel/CampaignsCarousel';
import CategoriesCarousel from '../../components/CategoriesCarousel/CategoriesCarousel';

const HomeCompanions: React.FC<RouteComponentProps> = ({ history }) => {
	type typeResponseAxios = {
		[key: string]: any;
	};

	type selectValues = {
		label: string;
		value: string;
	}[];

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

	const { urlEndpoint, urlEndpointEstados } = useRecoilValue(endpointState);

	const [showLoading, setShowLoading] = useState(true);
	const [estadoSelect, setEstadoSelect] = useState<selectValues>([]);
	const [cidadeSelect, setCidadeSelect] = useState<selectValues>([]);

	const urlEndpointAcompanhantes = `${urlEndpoint}/api/account/list/2`;

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

	const newCardsAcompanhantes: typeCardsAcompanhantes = [];
	const newCardsWomanBasic: typeCardsAcompanhantes = [];

	const newCardsTrans: typeCardsAcompanhantes = [];
	const newCardsTransBasic: typeCardsAcompanhantes = [];

	const newCardsHomem: typeCardsAcompanhantes = [];
	const newCardsHomemBasic: typeCardsAcompanhantes = [];

	useEffect(() => {
		searchWomanPremium();
		searchWomanBasic();
		searchTransPremium();
		searchTransBasic();
		searchHomemPremium();
		searchHomemBasic();
		setSelectsAxiosIbge('estados');
		if (localStorage.getItem('estado') === null) {
			localStorage.setItem('estado', '33');
			localStorage.setItem('estadoName', 'RJ');
		}
		console.log("cardsMulheresPremium:",cardsMulheresPremium || cardsMulheresBasic)
	}, []);

	const verifyImg = (profile: any) => {
		const image = profile.profile?.midias.filter( (e: any) => e.type === 'image') || [];
		if(image.length){
			if(typeof image[0]?.link === 'object'){
				return typeof image[0]?.link[512] !== 'undefined' ? image[0]?.link[512] : image[0]?.link[50]
			}
		}
		return '/notload.png'
	}

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
								fotoDestaque: verifyImg(profile),
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
					console.log({"joins": newCardsAcompanhantes})
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
								fotoDestaque: verifyImg(profile),
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
								fotoDestaque: verifyImg(profile),
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
								fotoDestaque: verifyImg(profile),
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
								fotoDestaque: verifyImg(profile),
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
								fotoDestaque: verifyImg(profile),
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

	const setSelectsAxiosIbge = (
		tipoEstadoCidade: 'estados' | 'cidades' = 'estados',
		idEstado = '33',
	) => {
		const url = {
			estados: urlEndpointEstados,
			cidades: `${urlEndpointEstados}${idEstado}/municipios`,
		};

		const setSelect = {
			estados: setEstadoSelect,
			cidades: setCidadeSelect,
		};

		const orderByName = {
			estados: 'sigla',
			cidades: 'nome',
		};

		axios
			.get(url[tipoEstadoCidade], {
				// headers: {
				// 	Authorization: `Bearer ${token}`,
				// },
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.length > 0) {
					const newValue: selectValues = [];

					const cidadesEstados = response.data.sort((a: any, b: any) =>
						a[orderByName[tipoEstadoCidade]] > b[orderByName[tipoEstadoCidade]]
							? 1
							: -1,
					);

					response.data.forEach((element: any) => {
						if (tipoEstadoCidade === 'estados') {
							if (element.id === 33) {
								newValue.push({
									label: element[orderByName[tipoEstadoCidade]],
									value: element.id,
								});
							}
						} else {
							newValue.push({
								label: element[orderByName[tipoEstadoCidade]],
								value: element.id,
							});
						}
					});

					setSelect[tipoEstadoCidade]([]);
					setSelect[tipoEstadoCidade](newValue);
				} else {
					setSelect[tipoEstadoCidade]([]);
				}
			});
	};

	function handleLogin() {
		const isLogged = localStorage.getItem('token');
		if (isLogged) {
			history.push('/perfil');
		} else {
			history.push('/login-with-account');
		}
	}

	return (
		<div className="background-color-413872 home-companions-view">
			<div className="padding-sides-20px relative text-center py-4">
				<div
					role="button"
					tabIndex={0}
					onClick={handleLogin}
					onKeyDown={handleLogin}
					className="icone-user-with-menu"
				>
					<div className="icone-user">
						<i className="far fa-user" />
					</div>
					<div className="icone-menu">
						<i className="fas fa-bars" />
					</div>
				</div>

				<Logo logoType={'white horizontal'} classes={'inline w-200px'} />

				<div className="search-menu">
					<div className="icone-search">
						<select
							name="estado"
							id="estado"
							onChange={(event: any) => {
								localStorage.setItem('estado', event.target.value);
								localStorage.setItem(
									'estadoName',
									event.target.options[event.target.selectedIndex].text,
								);
								searchWomanPremium();
								searchWomanBasic();
								searchTransPremium();
								searchTransBasic();
								searchHomemPremium();
								searchHomemBasic();
							}}
						>
							{estadoSelect.map(state => {
								return (
									<option
										value={state.value}
										selected={
											localStorage.getItem('estado')?.toString() ===
											state.value.toString()
										}
									>
										{state.label}
									</option>
								);
							})}
						</select>
					</div>
				</div>
			</div>
			<div className="padding-sides-20px background-companions pt-2 pb-6">
				<CategoriesCarousel />
				<Link to={'/search-companions'}>
					<div className="w-full p-2 rounded-full chamada-parceiro pesquisa">
						<div className="container-botao-parceiro">
							<p>Pesquisar</p>
						</div>
					</div>
				</Link>
				<div className="py-2">
					<p className="font-bold">
						Acompanhantes
						{cardsMulheresPremium.length === 0 &&
						cardsMulheresBasic.length === 0 ? (
							''
						) : (
							<div>
								<a
									className="float-right font-light text-color-FF4767"
									style={{ cursor: 'pointer' }}
									href={`listing/1/Acompanhantes`}
									rel="noreferrer noopener"
								>
									<span>ver tudo </span>
									<i className="fas fa-chevron-right" />
								</a>
							</div>
						)}
					</p>
				</div>
				<Loading showLoading={showLoading} className="loading-center" />
				{showLoading === true ? (
					''
				) : (
					<div>
						{cardsMulheresPremium.length === 0 &&
						cardsMulheresBasic.length === 0 ? (
							<div>
								<h1>Em breve novas acompanhantes</h1>
							</div>
						) : (
							<div>
								{cardsMulheresPremium.length === 0 ? (
									''
								) : (
									<div>
										<p className="tipo-plano">Premium</p>
									</div>
								)}

								<div className="py-2">
									<Swiper freeMode={true} spaceBetween={15} slidesPerView={1.3}>
										{cardsMulheresPremium.map(acompanhante => {
											return (
												<SwiperSlide>
													<Link to={`/perfil-user/${acompanhante.id}`}>
														<div className={'card-acompanhante'}>
															<div className="foto-destaque-acompanhante">
																<img
																	src={acompanhante.fotoDestaque}
																	alt="Foto Acompanhante"
																/>
															</div>
															<div className="grid grid-cols-2 gap-2 card-infos-acompanhante">
																<div className="card-info-1-acompanhante">
																	<p className="card-nome-idade-acompanhante">{`${acompanhante.nome}, ${acompanhante.idade}`}</p>
																	<p>{`${acompanhante.cidade} - ${acompanhante.estado}`}</p>
																	<p>{acompanhante.price}</p>
																</div>
																<div className="card-info-2-acompanhante text-right">
																	<p>{acompanhante.sexo}</p>
																	<p>
																		<i className="fas fa-camera" />
																		{` ${acompanhante.qtdFotos} `}
																		<i className="far fa-play-circle" />
																		{` ${acompanhante.qtdVideos}`}
																	</p>
																</div>
															</div>
														</div>
													</Link>
												</SwiperSlide>
											);
										})}
									</Swiper>
								</div>
								{cardsMulheresBasic.length === 0 ? (
									''
								) : (
									<div>
										<p className="titulo-plano-basico">Basico</p>
									</div>
								)}

								<div className="py-2">
									<Swiper freeMode={true} spaceBetween={15} slidesPerView={2.7}>
										{cardsMulheresBasic.map(acompanhante => {
											return (
												<SwiperSlide>
													<Link to={`/perfil-user/${acompanhante.id}`}>
														<div className={'card-acompanhante'}>
															<div className="foto-destaque-acompanhante plano-basico">
																<img
																	src={acompanhante.fotoDestaque}
																	alt="Foto Acompanhante"
																/>
															</div>
															<div className="grid grid-cols-2 gap-2 card-infos-acompanhante">
																<div className="card-info-1-acompanhante">
																	<p className="card-nome-idade-acompanhante">{`${acompanhante.nome}, ${acompanhante.idade}`}</p>
																	<p>{`${acompanhante.cidade} - ${acompanhante.estado}`}</p>
																</div>
																<div className="card-info-2-acompanhante text-right">
																	<p>{acompanhante.sexo}</p>
																	<p>
																		<i className="fas fa-camera" />
																		{` ${acompanhante.qtdFotos} `}
																		<i className="far fa-play-circle" />
																		{` ${acompanhante.qtdVideos}`}
																	</p>
																</div>
															</div>
														</div>
													</Link>
												</SwiperSlide>
											);
										})}
									</Swiper>
								</div>
							</div>
						)}
					</div>
				)}
				<div className="py-2">
					<p className="font-bold">
						Trans
						<Loading
							showLoading={showLoading}
							className="inline-loading loading-center"
						/>
						{cardsTransPremium.length === 0 && cardsTransBasic.length === 0 ? (
							''
						) : (
							<div>
								<a
									className="float-right font-light text-color-FF4767"
									style={{ cursor: 'pointer' }}
									href={`listing/2/Trans`}
									rel="noreferrer noopener"
								>
									<span>ver tudo </span>
									<i className="fas fa-chevron-right" />
								</a>
							</div>
						)}
					</p>
				</div>
				{showLoading === true ? (
					''
				) : (
					<div>
						{cardsTransPremium.length === 0 && cardsTransBasic.length === 0 ? (
							<div>
								<h1>Em breve novas trans</h1>
							</div>
						) : (
							<div>
								{cardsTransPremium.length === 0 ? (
									''
								) : (
									<div>
										<p className="tipo-plano">Premium</p>
									</div>
								)}
								<div className="py-2">
									<Swiper freeMode={true} spaceBetween={15} slidesPerView={1.3}>
										{cardsTransPremium.map(acompanhante => {
											return (
												<SwiperSlide>
													<Link to={`/perfil-user/${acompanhante.id}`}>
														<div className={'card-acompanhante'}>
															<div className="foto-destaque-acompanhante">
																<img
																	src={acompanhante.fotoDestaque}
																	alt="Foto Acompanhante"
																/>
															</div>
															<div className="grid grid-cols-2 gap-2 card-infos-acompanhante">
																<div className="card-info-1-acompanhante">
																	<p className="card-nome-idade-acompanhante">{`${acompanhante.nome}, ${acompanhante.idade}`}</p>
																	<p>{`${acompanhante.cidade} - ${acompanhante.estado}`}</p>
																	<p>{acompanhante.price}</p>
																</div>
																<div className="card-info-2-acompanhante text-right">
																	<p>{acompanhante.sexo}</p>
																	<p>
																		<i className="fas fa-camera" />
																		{` ${acompanhante.qtdFotos} `}
																		<i className="far fa-play-circle" />
																		{` ${acompanhante.qtdVideos}`}
																	</p>
																</div>
															</div>
														</div>
													</Link>
												</SwiperSlide>
											);
										})}
									</Swiper>
								</div>
								{cardsTransBasic.length === 0 ? (
									''
								) : (
									<div>
										<p className="tipo-plano">Básico</p>
									</div>
								)}
								<div className="py-2">
									<Swiper freeMode={true} spaceBetween={15} slidesPerView={2.7}>
										{cardsTransBasic.map(acompanhante => {
											return (
												<SwiperSlide>
													<Link to={`/perfil-user/${acompanhante.id}`}>
														<div className={'card-acompanhante'}>
															<div className="foto-destaque-acompanhante plano-basico">
																<img
																	src={acompanhante.fotoDestaque}
																	alt="Foto Acompanhante"
																/>
															</div>
															<div className="grid grid-cols-2 gap-2 card-infos-acompanhante">
																<div className="card-info-1-acompanhante">
																	<p className="card-nome-idade-acompanhante">{`${acompanhante.nome}, ${acompanhante.idade}`}</p>
																	<p>{`${acompanhante.cidade} - ${acompanhante.estado}`}</p>
																</div>
																<div className="card-info-2-acompanhante text-right">
																	<p>{acompanhante.sexo}</p>
																	<p>
																		<i className="fas fa-camera" />
																		{` ${acompanhante.qtdFotos} `}
																		<i className="far fa-play-circle" />
																		{` ${acompanhante.qtdVideos}`}
																	</p>
																</div>
															</div>
														</div>
													</Link>
												</SwiperSlide>
											);
										})}
									</Swiper>
								</div>
							</div>
						)}
					</div>
				)}

				<div className="py-2">
					<p className="font-bold">
						Homens
						<Loading
							showLoading={showLoading}
							className="inline-loading loading-center"
						/>
						{cardsMulheresPremium.length === 0 &&
						cardsHomemBasic.length === 0 ? (
							''
						) : (
							<div>
								<a
									className="float-right font-light text-color-FF4767"
									style={{ cursor: 'pointer' }}
									href={`listing/3/Homens`}
									rel="noreferrer noopener"
								>
									<span>ver tudo </span>
									<i className="fas fa-chevron-right" />
								</a>
							</div>
						)}
					</p>
				</div>
				{showLoading === true ? (
					''
				) : (
					<div>
						{cardsHomemPremium.length === 0 && cardsHomemBasic.length === 0 ? (
							<div>
								<h1>Em breve novos acompanhantes</h1>
							</div>
						) : (
							<div>
								{cardsHomemPremium.length === 0 ? (
									''
								) : (
									<div>
										<p className="tipo-plano">Premium</p>
									</div>
								)}
								<div className="py-2">
									<Swiper freeMode={true} spaceBetween={15} slidesPerView={1.3}>
										{cardsHomemPremium.map(acompanhante => {
											return (
												<SwiperSlide>
													<Link to={`/perfil-user/${acompanhante.id}`}>
														<div className={'card-acompanhante'}>
															<div className="foto-destaque-acompanhante">
																<img
																	src={acompanhante.fotoDestaque}
																	alt="Foto Acompanhante"
																/>
															</div>
															<div className="grid grid-cols-2 gap-2 card-infos-acompanhante">
																<div className="card-info-1-acompanhante">
																	<p className="card-nome-idade-acompanhante">{`${acompanhante.nome}, ${acompanhante.idade}`}</p>
																	<p>{`${acompanhante.cidade} - ${acompanhante.estado}`}</p>
																	<p>{acompanhante.price}</p>
																</div>
																<div className="card-info-2-acompanhante text-right">
																	<p>{acompanhante.sexo}</p>
																	<p>
																		<i className="fas fa-camera" />
																		{` ${acompanhante.qtdFotos} `}
																		<i className="far fa-play-circle" />
																		{` ${acompanhante.qtdVideos}`}
																	</p>
																</div>
															</div>
														</div>
													</Link>
												</SwiperSlide>
											);
										})}
									</Swiper>
								</div>
								{cardsHomemBasic.length === 0 ? (
									''
								) : (
									<div>
										<p className="tipo-plano">Básico</p>
									</div>
								)}
								<div className="py-2">
									<Swiper freeMode={true} spaceBetween={15} slidesPerView={2.7}>
										{cardsHomemBasic.map(acompanhante => {
											return (
												<SwiperSlide>
													<Link to={`/perfil-user/${acompanhante.id}`}>
														<div className={'card-acompanhante'}>
															<div className="foto-destaque-acompanhante plano-basico">
																<img
																	src={acompanhante.fotoDestaque}
																	alt="Foto Acompanhante"
																/>
															</div>
															<div className="grid grid-cols-2 gap-2 card-infos-acompanhante">
																<div className="card-info-1-acompanhante">
																	<p className="card-nome-idade-acompanhante">{`${acompanhante.nome}, ${acompanhante.idade}`}</p>
																	<p>{`${acompanhante.cidade} - ${acompanhante.estado}`}</p>
																</div>
																<div className="card-info-2-acompanhante text-right">
																	<p>{acompanhante.sexo}</p>
																	<p>
																		<i className="fas fa-camera" />
																		{` ${acompanhante.qtdFotos} `}
																		<i className="far fa-play-circle" />
																		{` ${acompanhante.qtdVideos}`}
																	</p>
																</div>
															</div>
														</div>
													</Link>
												</SwiperSlide>
											);
										})}
									</Swiper>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default HomeCompanions;

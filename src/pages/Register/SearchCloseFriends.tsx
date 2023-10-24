import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useRecoilValue } from 'recoil';
import { endpointState } from '../../recoil/atoms';
import Input from '../../components/Input/Input';

import Logo from '../../components/Logo/Logo';
import Loading from '../../components/Loading/Loading';
import CampaignsCarousel from '../../components/CampaignsCarousel/CampaignsCarousel';

const SearchCloseFriends: React.FC = () => {
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

	const urlEndpointAcompanhantes = `${urlEndpoint}/api/account/list/4`;

	const [showLoading, setShowLoading] = useState(true);

	const [estadoSelect, setEstadoSelect] = useState<selectValues>([]);
	const [cidadeSelect, setCidadeSelect] = useState<selectValues>([]);

	const [cardsAcompanhantes, setCardsAcompanhantes] =
		useState<typeCardsAcompanhantes>([]);

	const [city, setCity] = useState('');
	const [neighborhood, setNeighborhood] = useState('');

	const [gender, setGender] = useState('');
	const buttonGender = [
		{
			label: 'Mulher',
			className: 'botao-home-companions',
		},
		{
			label: 'Trans',
			className: 'botao-home-companions',
		},
		{
			label: 'Homem',
			className: 'botao-home-companions',
		},
	];

	const newCardsAcompanhantes: typeCardsAcompanhantes = [];

	useEffect(() => {
		setSelectsAxiosIbge('estados');
		setSelectsAxiosIbge('cidades', localStorage.getItem('estado')?.toString());
		if (localStorage.getItem('estado') === null) {
			localStorage.setItem('estado', '33');
		}
		searchCompanions();
	}, []);

	const searchCompanions = () => {
		setCardsAcompanhantes([]);
		setShowLoading(true);

		axios
			.get(urlEndpointAcompanhantes, {
				params: {
					state: localStorage.getItem('estadoName'),
					city,
					neighborhood,
					gender,
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
					setCardsAcompanhantes(newCardsAcompanhantes);
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
						if(tipoEstadoCidade === 'estados'){
							if(element.id===33){
								newValue.push({
									label: element[orderByName[tipoEstadoCidade]],
									value: element.id,
								});
							}
						}else{
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

	return (
		<div className="background-color-413872">
			<div className="padding-sides-20px relative text-center py-4">
				<Link to={'/perfil'}>
					<div className="icone-user-with-menu">
						<div className="icone-user">
							<i className="far fa-user" />
						</div>
						<div className="icone-menu">
							<i className="fas fa-bars" />
						</div>
					</div>
				</Link>

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
								setSelectsAxiosIbge('cidades', event.target.value);
								searchCompanions();
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
			<div className="padding-sides-20px bg-white pt-2 pb-6">
				<CampaignsCarousel />
				<div className="py-2">
					<Swiper freeMode={true} spaceBetween={10} slidesPerView={3}>
						{buttonGender.map(button => {
							return (
								<SwiperSlide>
									<button
										type="button"
										className={`w-full ${button.className} ${
											button.label === gender ? 'active' : ''
										} borda-compania-botao`}
										onClick={() => {
											if (button.label === gender) {
												setGender('');
											} else {
												setGender(button.label);
											}
										}}
									>
										{button.label}
									</button>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-2">
					<Input
						name="cidade"
						type="select"
						placeholder="Cidade"
						valueSelect={cidadeSelect}
						value={city}
						onChange={(e: any) => {
							setCity(
								e.target.options[e.target.selectedIndex].text === 'Cidade'
									? ''
									: e.target.options[e.target.selectedIndex].text,
							);
						}}
					/>
					<Input
						name={'district_companion'}
						type={'text'}
						placeholder={'Bairro'}
						onChange={(event: any) => setNeighborhood(event.target.value)}
						onKeyPress={(event: any) => {
							if (event.key === 'Enter') {
								searchCompanions();
							}
						}}
					/>
				</div>
				<button
					type="button"
					onClick={() => searchCompanions()}
					className="mt-4 mb-4 block w-full p-2 rounded-full text-center pesquisar-acompanhante text-white font-bold"
				>
					Pesquisar
				</button>
				<div className="py-2">
					<p className="font-bold">Close Friends</p>
				</div>
				<Loading showLoading={showLoading} className="loading-center" />
				{showLoading === true ? (
					''
				) : (
					<div>
						{cardsAcompanhantes.length === 0 ? (
							<div>
								<h1>Close Friends não encontrados</h1>
							</div>
						) : null}
						<div className="grid grid-cols-2 gap-4 py-2">
							{cardsAcompanhantes.map(acompanhante => {
								return (
									<Link to={`/perfil-user/${acompanhante.id}`}>
										<div className={'card-acompanhante pequisa-companina-card'}>
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
													{/* <p>{acompanhante.price}</p> */}
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
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchCloseFriends;

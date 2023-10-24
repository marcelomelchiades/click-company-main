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

const HomePartner: React.FC = () => {
	type typeResponseAxios = {
		[key: string]: any;
	};

	type selectValues = {
		label: string;
		value: string;
	}[];

	type typeCardsPartners = {
		url: string;
		img: string;
		userId: string;
	}[];

	const styleDivImgCampaign: React.CSSProperties = {
		width: '100%',
		paddingTop: '50%',
		position: 'relative',
	};

	const styleImgCampaign: React.CSSProperties = {
		width: '100%',
		height: '100%',
		position: 'absolute',
		left: 0,
		top: 0,
		objectFit: 'cover',
		objectPosition: 'center',
	};

	const { urlEndpoint, urlEndpointEstados } = useRecoilValue(endpointState);

	const urlEndpointParceiros = `${urlEndpoint}/api/partner/campaign`;
	const urlEndpointCategories = `${urlEndpoint}/api/profile/categories-partner/list`;

	const [showLoading, setShowLoading] = useState(true);

	const [estadoSelect, setEstadoSelect] = useState<selectValues>([]);
	const [cidadeSelect, setCidadeSelect] = useState<selectValues>([]);

	const [categoriaSelect, setCategoriaSelect] = useState([]);
	const [categoria1, setCategoria1] = useState('');

	const [cardsPartners, setCardsPartners] = useState<typeCardsPartners>([]);

	const [city, setCity] = useState('');
	const [neighborhood, setNeighborhood] = useState('');

	const newCardsPartners: typeCardsPartners = [];

	useEffect(() => {
		searchPartners();
		setSelectsAxiosIbge('estados');
		setSelectsAxiosIbge('cidades', localStorage.getItem('estado')?.toString());
		if (localStorage.getItem('estado') === null) {
			localStorage.setItem('estado', '33');
		}

		axios.get(urlEndpointCategories).then(response => {
			const categories: any = [];
			response.data.data.forEach((categoria: any) => {
				categories.push({ label: categoria.name, value: categoria.id });
			});
			setCategoriaSelect(categories);
		});
	}, []);

	const searchPartners = () => {
		setCardsPartners([]);
		setShowLoading(true);

		axios
			.get(urlEndpointParceiros, {
				params: {
					state: localStorage.getItem('estadoName'),
					category_id: categoria1,
					distinct: 'true'
				},
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.data.length > 0) {
					const newCampaigns: any[] = [];
					response.data.data.forEach((campaignResponse: any) => {
						newCampaigns.push({
							img:
								campaignResponse.banner !== ''
									? `https://zapgrupos-bucket.s3.us-west-2.amazonaws.com/${campaignResponse.banner}`
									: '',
							url: campaignResponse.target_url,
							userId: campaignResponse.user_id,
						});
					});
					setCardsPartners(newCampaigns);
					console.log(newCampaigns);
				}

				setShowLoading(false);
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
					setCity('');
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
								searchPartners();
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
				<div className="grid grid-cols-1 gap-4 mt-2">
					<Input
						name="categorias"
						type="select"
						placeholder="Selecione uma categoria"
						valueSelect={categoriaSelect}
						value={categoria1}
						onChange={(e: any) => {
							setCategoria1(e.currentTarget.value);
						}}
					/>
				</div>

				<button
					type="button"
					onClick={() => searchPartners()}
					className="mt-4 mb-4 block w-full p-2 rounded-full text-center pesquisar-acompanhante text-white font-bold"
				>
					Pesquisar
				</button>
				<div className="py-2">
					<p className="font-bold">Parceiros</p>
				</div>
				<Loading showLoading={showLoading} className="loading-center" />
				{showLoading === true ? (
					''
				) : (
					<div>
						{cardsPartners.length === 0 ? (
							<div>
								<h1>Parceiros não encontrados</h1>
							</div>
						) : null}
						<div className="grid grid-cols-2 gap-4 py-2">
							{cardsPartners.map(campaign => {
								return campaign.url !== '' ? (
									<div style={styleDivImgCampaign}>
										<Link to={`/perfil-partner/${campaign.userId}`}>
											<img style={styleImgCampaign} src={campaign.img} alt="" />
										</Link>
									</div>
								) : (
									<div style={styleDivImgCampaign}>
										<img style={styleImgCampaign} src={campaign.img} alt="" />
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePartner;

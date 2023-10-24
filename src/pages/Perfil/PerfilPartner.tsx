/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useHistory, useParams } from 'react-router-dom';

import { Masonry } from 'react-masonry-responsive';
import { SRLWrapper } from 'simple-react-lightbox';

import { useRecoilValue } from 'recoil';
import { endpointState } from '../../recoil/atoms';

import 'swiper/swiper-bundle.css';

import Tabs from '../../components/Tabs/Tabs';

const PerfilPartner: React.FC = () => {
	type typeResponseAxios = {
		[key: string]: any;
	};

	type typeFotosVideos = {
		key: number;
		url: string;
		node: any;
	}[];

	type typeAcompanhante = {
		nome: string;
		document: string;
		cidade: string;
		endereco: string;
		estado: string;
		bairro: string;
		numero: string;
		cep: string;
		referencia: string;
		fotos: typeFotosVideos;
		phone: string;
		email: string;
		phoneNumber: string;
	};

	type typeTabs = {
		tabHeader: string;
		tabActive: boolean;
		tabContent: any;
	}[];

	const history = useHistory();

	interface ParamTypes {
		id: string;
	}

	const { id } = useParams<ParamTypes>();

	const { urlEndpoint } = useRecoilValue(endpointState);

	const urlEndpointAcompanhantes = `${urlEndpoint}/api/account/list/user/${id}`;

	const [infoAcompanhante, setInfoAcompanhante] = useState<typeAcompanhante>({
		nome: '',
		document: '',
		endereco: '',
		cidade: '',
		estado: '',
		bairro: '',
		numero: '',
		cep: '',
		referencia: '',
		fotos: [],
		phone: '',
		email: '',
		phoneNumber: '',
	});

	const [url, setUrl] = useState('');

	const [allTabsCompanion, setAllTabsCompanion] = useState<typeTabs>([
		{
			tabHeader: 'Fotos',
			tabActive: true,
			tabContent: <div className="px-20px">Carregando</div>,
		},
		{
			tabHeader: 'Sobre',
			tabActive: true,
			tabContent: <div className="px-20px">Carregando</div>,
		},
	]);

	const formatAddress = () => {
		let address = '';
		if (infoAcompanhante.endereco) address += `${infoAcompanhante.endereco}, `;
		if (infoAcompanhante.numero) address += `${infoAcompanhante.numero}, `;
		if (infoAcompanhante.bairro) address += `${infoAcompanhante.bairro}`;
		if (infoAcompanhante.cep) address += ` - ${infoAcompanhante.cep}`;
		return address;
	};

	useEffect(() => {
		axios
			.get(urlEndpointAcompanhantes, {
				// headers: {
				// 	Authorization: `Bearer ${token}`,
				// },
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.length > 0) {
					const profile = response.data[0];

					const fotos: typeFotosVideos = [];

					if (profile.campaigns?.length > 0) {
						const midiasProfile = profile.campaigns;

						midiasProfile.forEach((midia: any) => {
							setUrl(midia.target_url);
							fotos.push({
								key: midia.id,
								url: `https://zapgrupos-bucket.s3.us-west-2.amazonaws.com/${midia.banner}`,
								node: (
									<img
										src={`https://zapgrupos-bucket.s3.us-west-2.amazonaws.com/${midia.banner}`}
										alt=""
									/>
								),
							});
						});
					}

					setInfoAcompanhante({
						nome: profile.profile?.nickname,
						document: profile.profile?.document,
						endereco: profile.address?.address,
						numero: profile.address?.number,
						bairro: profile.address?.neighborhood,
						cidade: profile.address?.city,
						estado: profile.address?.state,
						cep: profile.address?.zipcode,
						referencia: profile.profile?.reference,
						fotos,
						phone: profile.profile?.phone,
						email: profile.email,
						phoneNumber: `55${profile.profile?.phone?.replace(
							/[-|(|)| ]/g,
							'',
						)}`,
					});
				}
			});
	}, []);

	useEffect(() => {
		setAllTabsCompanion([
			{
				tabHeader: 'Fotos',
				tabActive: true,
				tabContent: (
					<div className="px-20px">
						<p className="py-5 text-color-413872">
							{infoAcompanhante.fotos.length > 1
								? `${infoAcompanhante.fotos.length} fotos`
								: `${infoAcompanhante.fotos.length} foto`}
						</p>
						<SRLWrapper>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									flexWrap: 'wrap',
								}}
							>
								{infoAcompanhante.fotos.map(m => (
									<div
										key={m.key}
										style={{
											padding: 5,
											width: '50%',
										}}
									>
										<img
											src={m.url}
											alt={`${infoAcompanhante.nome}`}
											style={{ borderRadius: 5 }}
										/>
									</div>
								))}
							</div>
						</SRLWrapper>
					</div>
				),
			},
			{
				tabHeader: 'Sobre',
				tabActive: false,
				tabContent: (
					<div className="px-20px">
						<hr className="my-4" />

						<div className="sobre-acompanhante">
							<i className="fas fa-comment-dots mr-2 text-color-413872" />
							<span className="text-color-413872 font-semibold">
								{infoAcompanhante.nome}
							</span>
						</div>
						<hr className="my-4" />

						<div className="sobre-acompanhante">
							<i className="fa fa-phone mr-2 text-color-413872" />
							<span className="text-color-413872 font-semibold">
								{infoAcompanhante.phone}
							</span>
						</div>
						<hr className="my-4" />

						<div className="sobre-acompanhante">
							<i className="fa fa-envelope mr-2 text-color-413872" />
							<span className="text-color-413872 font-semibold">
								{infoAcompanhante.email}
							</span>
						</div>
						<hr className="my-4" />

						<div className="py-4 text-center">
							<button
								style={{
									borderRadius: 10,
									backgroundColor: '#bababa',
									paddingLeft: 20,
									paddingRight: 20,
									paddingTop: 10,
									paddingBottom: 10,
								}}
								type="button"
								onClick={() => {
									window.open(url);
								}}
							>
								Visitar website
							</button>
						</div>

						{/* <hr className="my-4" />

						<div className="localizacao-acompanhante">
							<i className="fas fa-map-marker-alt mr-2 text-color-413872" />
							<span className="text-color-413872 font-semibold">
								Localização
							</span>
							<div className="grid grid-cols-2 gap-2">
								<div className="todos-bairros-acompanhante">
									<p>{formatAddress()}</p>
									{infoAcompanhante.referencia && (
										<p>{`${infoAcompanhante.referencia}`}</p>
									)}
								</div>
							</div>
						</div> */}
						<hr className="my-4" />
					</div>
				),
			},
		]);
	}, [infoAcompanhante]);

	return (
		<div className="bg-white pb-20">
			<div className="cabecalho-register text-center">
				<p>
					Perfil
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
			<div className="background-color-413872 px-20px py-2 text-white relative">
				<div className="descricao-cabecalho-acompanhante">
					<p className="nome-acompanhante">{infoAcompanhante.nome}</p>
					{/* <div>
						{' '}
						<p className="cidade-estado-acompanhante">{`${infoAcompanhante.document}`}</p>
					</div> */}
					{infoAcompanhante.cidade === undefined ||
					infoAcompanhante.cidade === '' ||
					infoAcompanhante.estado === undefined ||
					infoAcompanhante.estado === '' ? (
						''
					) : (
						<div>
							{' '}
							<p className="cidade-estado-acompanhante">{`${infoAcompanhante.cidade} - ${infoAcompanhante.estado}`}</p>
						</div>
					)}
				</div>

				<div className="bloco-compartilhar">
					<i className="fas fa-share-alt" />
				</div>
			</div>
			<div className="abas-companion">
				<Tabs allTabs={allTabsCompanion} />
			</div>
			<a
				href={`https://wa.me/?phone=${infoAcompanhante.phoneNumber}&text=Olá, estou entrando em contato através do click company.`}
				target="_blank"
				rel="noreferrer"
			>
				<div className="size-xl footer-whatsapp">
					<i className="fab fa-whatsapp text-xl mr-2" />
					<span>Enviar mensagem</span>
				</div>
			</a>
		</div>
	);
};

export default PerfilPartner;

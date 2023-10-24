/* eslint-disable indent */
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { Link, useHistory, useParams } from 'react-router-dom';

import { Masonry } from 'react-masonry-responsive';
import { SRLWrapper } from 'simple-react-lightbox';

import { useRecoilValue } from 'recoil';
import { endpointState } from '../../recoil/atoms';

import 'swiper/swiper-bundle.css';

import Tabs from '../../components/Tabs/Tabs';

import iconTikTok from '../../assets/images/icon-tiktok-rose.svg';
import iconInstagram from '../../assets/images/icon-instagram-rose.svg';
import iconTwitter from '../../assets/images/icon-twitter-rose.svg';
import iconLinktree from '../../assets/images/icon-linktree.png';
import iconOnlyfans from '../../assets/images/icon-onlyfans.png';
import iconWeb from '../../assets/images/icon-web.png';

const PerfilUser: React.FC = () => {
	const [price, setPrice] = useState();

	type typeResponseAxios = {
		[key: string]: any;
	};

	type typeFotosVideos = {
		key: number;
		url: string;
		node: any;
	}[];

	type typeAcompanhante = {
		userType: number;
		nome: string;
		idade: string;
		cidade: string;
		estado: string;
		bairro: string;
		sexo: string;
		fotos: typeFotosVideos;
		videos: typeFotosVideos;
		price: string;
		info: string;
		canLocal: boolean;
		estilo: string;
		ocasiao: string;
		idiomas: string;
		olhos: string;
		altura: string;
		peso: string;
		manequim: string;
		corDaPele: string;
		corCabelo: string;
		seios: string;
		tamanhoPes: string;
		metodoPagamento: string;
		tiktok: string;
		twitter: string;
		instagram: string;
		whatsapp: string;
		linktree: string;
		onlyfans: string;
		web: string;
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
		userType: 0,
		nome: '',
		idade: '',
		cidade: '',
		estado: '',
		bairro: '',
		sexo: '',
		fotos: [],
		videos: [],
		price: '',
		info: '',
		canLocal: false,
		estilo: '',
		ocasiao: '',
		idiomas: '',
		olhos: '',
		altura: '',
		peso: '',
		manequim: '',
		corDaPele: '',
		corCabelo: '',
		seios: '',
		tamanhoPes: '',
		metodoPagamento: '',
		tiktok: '',
		twitter: '',
		instagram: '',
		whatsapp: '',
		linktree: '',
		onlyfans: '',
		web: '',
	});

	const [allTabsCompanion, setAllTabsCompanion] = useState<typeTabs>([
		{
			tabHeader: 'Fotos',
			tabActive: true,
			tabContent: <div className="px-20px">Carregando</div>,
		},
		{
			tabHeader: 'Vídeos',
			tabActive: true,
			tabContent: <div className="px-20px">Carregando</div>,
		},
		{
			tabHeader: 'Sobre',
			tabActive: true,
			tabContent: <div className="px-20px">Carregando</div>,
		},
	]);

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
					setPrice(profile.profile?.price);

					const fotos: typeFotosVideos = [];
					const videos: typeFotosVideos = [];

					if (profile.profile.midias.length > 0) {
						const midiasProfile = profile.profile.midias;

						midiasProfile.forEach((midia: any) => {
							if (midia.type === 'image') {
								const lastMidiaLink =
									midia.link[
										Object.keys(midia.link)[Object.keys(midia.link).length - 1]
									];
								fotos.push({
									key: midia.id,
									url: lastMidiaLink,
									node: <img src={lastMidiaLink} alt="" />,
								});
							} else if (midia.type === 'video') {
								videos.push({
									key: midia.id,
									url: midia.link,
									node: (
										<video src={midia.link} controls>
											<track kind="captions" />
										</video>
									),
								});
							}
						});
					}

					setInfoAcompanhante({
						userType: profile.user_type,
						nome: profile.name,
						idade: profile.profile?.age,
						cidade: profile.address?.city,
						estado: profile.address?.state,
						bairro: profile.address?.neighborhood,
						sexo: profile.profile?.gender,
						fotos,
						videos,
						price: (profile.profile?.price).toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						}),
						info: profile.profile?.info,
						canLocal: profile.profile?.can_local,
						estilo: profile.profile?.type_service?.join(', '),
						ocasiao: profile.profile?.occasion?.join(', '),
						idiomas: profile.profile?.languages?.join(', '),
						olhos: profile.profile?.eyes?.name,
						altura: profile.profile?.height,
						peso: profile.profile?.weight,
						manequim: profile.profile?.clothing_size,
						corDaPele: profile.profile?.skin_color?.name,
						corCabelo: profile.profile?.hair?.name,
						seios: profile.profile?.breasts?.name,
						tamanhoPes: profile.profile?.foot_size,
						metodoPagamento: profile.profile?.payment_type?.join(', '),
						tiktok: profile.profile?.url_tiktok,
						twitter: profile.profile?.url_twitter,
						instagram: profile.profile?.url_instagram,
						linktree: profile.profile?.url_linktree,
						onlyfans: profile.profile?.url_onlyfans,
						web: profile.profile?.url_web,
						whatsapp: `55${profile.profile?.whatsapp.replace(
							/[-|(|)| ]/g,
							'',
						)}`,
					});
				}
			});
	}, []);

	useEffect(() => {
		const checkUrl = (
			url: string,
			type: 'tiktok' | 'instagram' | 'twitter',
		) => {
			if (!url.startsWith('@')) {
				return url;
			}
			let newUrl = url;
			switch (type) {
				case 'tiktok':
					newUrl = `https://www.tiktok.com/${url}`;
					break;
				case 'twitter':
					newUrl = `https://twitter.com/${url}`;
					break;
				case 'instagram':
					newUrl = `https://www.instagram.com/${url.replace('@', '')}`;
					break;
				default:
					break;
			}

			return newUrl;
		};
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
						{/* <Masonry
							gap={10}
							items={infoAcompanhante.fotos}
							minColumnWidth={128}
						/> */}
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
											alt={`${infoAcompanhante.nome} - ${infoAcompanhante.idade}`}
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
				tabHeader: 'Vídeos',
				tabActive: false,
				tabContent: (
					<div className="px-20px">
						<p className="py-5 text-color-413872">
							{infoAcompanhante.videos.length > 1
								? `${infoAcompanhante.videos.length} vídeos`
								: `${infoAcompanhante.videos.length} vídeo`}
						</p>
						<Masonry
							gap={10}
							items={infoAcompanhante.videos}
							minColumnWidth={170}
						/>
					</div>
				),
			},
			{
				tabHeader: 'Sobre',
				tabActive: false,
				tabContent: (
					<div className="px-20px">
						{/* <div className="avaliacao-acompanhante text-color-413872 pt-8">
							<span>
								<i className="far fa-star mr-2" />
								<span className="pontuacao-acompanhante font-semibold">
									4.0
								</span>
							</span>
							<span className="float-right text-color-FF4767">Avaliar</span>
						</div> */}
						<hr className="my-4" />
						{price === 0 ? (
							''
						) : (
							<div className="valor-acompanhante">
								<i className="fas fa-dollar-sign mr-2 text-color-413872" />
								<span className="text-color-413872 font-semibold">Valor</span>
								<p className="preco-acompanhante text-color-FF4767">
									{infoAcompanhante.price}
								</p>
								{infoAcompanhante.metodoPagamento === undefined ||
								infoAcompanhante.metodoPagamento === '' ? (
									''
								) : (
									<div>
										{' '}
										<p>{infoAcompanhante.metodoPagamento}</p>
									</div>
								)}
							</div>
						)}

						{price === 0 ? '' : <hr className="my-4" />}
						<div className="sobre-acompanhante">
							<i className="fas fa-comment-dots mr-2 text-color-413872" />
							<span className="text-color-413872 font-semibold">
								Um pouco sobre mim
							</span>
							<p>{infoAcompanhante.info}</p>
						</div>
						<hr className="my-4" />
						{infoAcompanhante.userType !== 4 && (
							<div className="localizacao-acompanhante">
								<i className="fas fa-map-marker-alt mr-2 text-color-413872" />
								<span className="text-color-413872 font-semibold">
									Localização
								</span>
								<div className="grid grid-cols-2 gap-2">
									{infoAcompanhante.bairro === undefined ||
									infoAcompanhante.bairro === '' ? (
										''
									) : (
										<div className="label-bairros-acompanhante font-semibold">
											Bairros:
										</div>
									)}
									{infoAcompanhante.bairro === undefined ||
									infoAcompanhante.bairro === '' ? (
										''
									) : (
										<div className="todos-bairros-acompanhante">
											{infoAcompanhante.bairro}
										</div>
									)}
									{price === 0 ? (
										''
									) : (
										<div className="label-tem-local-acompanhante font-semibold">
											Tem local?
										</div>
									)}
									{price === 0 ? (
										''
									) : (
										<div className="todos-tem-local-acompanhante">
											{infoAcompanhante.canLocal ? 'Sim' : 'Não'}
										</div>
									)}
								</div>
							</div>
						)}
						<hr className="my-4" />
						{(infoAcompanhante.estilo === undefined ||
							infoAcompanhante.estilo === '') &&
						(infoAcompanhante.ocasiao === undefined ||
							infoAcompanhante.ocasiao === '') ? (
							''
						) : (
							<div className="preferencias-acompanhante">
								<i className="far fa-grin mr-2 text-color-413872" />
								<span className="text-color-413872 font-semibold">
									Preferências
								</span>
								<div className="grid grid-cols-2 gap-2">
									{infoAcompanhante.estilo === undefined ||
									infoAcompanhante.estilo === '' ? (
										''
									) : (
										<div className="label-estilo-acompanhante font-semibold">
											Estilo:
										</div>
									)}
									{infoAcompanhante.estilo === undefined ||
									infoAcompanhante.estilo === '' ? (
										''
									) : (
										<div className="todos-estilo-acompanhante">
											{infoAcompanhante.estilo}
										</div>
									)}
									{infoAcompanhante.ocasiao === undefined ||
									infoAcompanhante.ocasiao === '' ? (
										''
									) : (
										<div className="label-ocasiao-acompanhante font-semibold">
											Ocasião:
										</div>
									)}
									{infoAcompanhante.ocasiao === undefined ||
									infoAcompanhante.ocasiao === '' ? (
										''
									) : (
										<div className="todos-ocasiao-acompanhante">
											{infoAcompanhante.ocasiao}
										</div>
									)}
								</div>
							</div>
						)}
						<hr className="my-4" />
						<div className="caracteristicas-acompanhante">
							<i className="far fa-user mr-2 text-color-413872" />
							<span className="text-color-413872 font-semibold">
								Características
							</span>
							<div className="grid grid-cols-2 gap-2">
								{infoAcompanhante.idiomas === undefined ||
								infoAcompanhante.idiomas === '' ? (
									''
								) : (
									<div className="label-idiomas-acompanhante font-semibold">
										Idiomas:
									</div>
								)}
								{infoAcompanhante.idiomas === undefined ||
								infoAcompanhante.idiomas === '' ? (
									''
								) : (
									<div className="todos-idiomas-acompanhante">
										{infoAcompanhante.idiomas}
									</div>
								)}

								{infoAcompanhante.idade === undefined ||
								infoAcompanhante.idade === '' ? (
									''
								) : (
									<div className="label-idade-acompanhante font-semibold">
										Idade:
									</div>
								)}
								{infoAcompanhante.idade === undefined ||
								infoAcompanhante.idade === '' ? (
									''
								) : (
									<div className="todos-idade-acompanhante">{`${infoAcompanhante.idade} anos`}</div>
								)}

								{infoAcompanhante.sexo === undefined ||
								infoAcompanhante.sexo === '' ||
								infoAcompanhante.sexo === null ? (
									''
								) : (
									<div className="label-sexo-acompanhante font-semibold">
										Gênero:
									</div>
								)}
								{infoAcompanhante.sexo === undefined ||
								infoAcompanhante.sexo === '' ? (
									''
								) : (
									<div className="todos-sexo-acompanhante">
										{infoAcompanhante.sexo}
									</div>
								)}

								{infoAcompanhante.olhos === undefined ||
								infoAcompanhante.olhos === '' ? (
									''
								) : (
									<div className="label-olhos-acompanhante font-semibold">
										Olhos:
									</div>
								)}
								{infoAcompanhante.olhos === undefined ||
								infoAcompanhante.olhos === '' ? (
									''
								) : (
									<div className="todos-olhos-acompanhante">
										{infoAcompanhante.olhos}
									</div>
								)}

								{infoAcompanhante.altura === undefined ||
								infoAcompanhante.altura === '' ||
								infoAcompanhante.altura === null ? (
									''
								) : (
									<div className="label-altura-acompanhante font-semibold">
										Altura:
									</div>
								)}
								{infoAcompanhante.altura === undefined ||
								infoAcompanhante.altura === '' ||
								infoAcompanhante.altura === null ? (
									''
								) : (
									<div className="todos-altura-acompanhante">{`${infoAcompanhante.altura}m`}</div>
								)}

								{infoAcompanhante.peso === undefined ||
								infoAcompanhante.peso === '' ||
								infoAcompanhante.peso === null ? (
									''
								) : (
									<div className="label-peso-acompanhante font-semibold">
										Peso:
									</div>
								)}
								{infoAcompanhante.peso === undefined ||
								infoAcompanhante.peso === '' ||
								infoAcompanhante.peso === null ? (
									''
								) : (
									<div className="todos-peso-acompanhante">{`${infoAcompanhante.peso}kg`}</div>
								)}

								{infoAcompanhante.manequim === undefined ||
								infoAcompanhante.manequim === '' ||
								infoAcompanhante.manequim === null ? (
									''
								) : (
									<div className="label-manequim-acompanhante font-semibold">
										Manequim:
									</div>
								)}
								{infoAcompanhante.manequim === undefined ||
								infoAcompanhante.manequim === '' ||
								infoAcompanhante.manequim === null ? (
									''
								) : (
									<div className="todos-manequim-acompanhante">
										{infoAcompanhante.manequim}
									</div>
								)}

								{infoAcompanhante.corDaPele === undefined ||
								infoAcompanhante.corDaPele === '' ? (
									''
								) : (
									<div className="label-cor-da-pela-acompanhante font-semibold">
										Cor da pele:
									</div>
								)}
								{infoAcompanhante.corDaPele === undefined ||
								infoAcompanhante.corDaPele === '' ? (
									''
								) : (
									<div className="todos-cor-da-pela-acompanhante">
										{infoAcompanhante.corDaPele}
									</div>
								)}

								{infoAcompanhante.corCabelo === undefined ||
								infoAcompanhante.corCabelo === '' ? (
									''
								) : (
									<div className="label-cabelo-acompanhante font-semibold">
										Cabelo:
									</div>
								)}
								{infoAcompanhante.corCabelo === undefined ||
								infoAcompanhante.corCabelo === '' ? (
									''
								) : (
									<div className="todos-cabelo-acompanhante">
										{infoAcompanhante.corCabelo}
									</div>
								)}
								{infoAcompanhante.seios === undefined ||
								infoAcompanhante.seios === '' ? (
									''
								) : (
									<div className="label-seios-acompanhante font-semibold">
										Seios:
									</div>
								)}
								{infoAcompanhante.seios === undefined ||
								infoAcompanhante.seios === '' ? (
									''
								) : (
									<div className="todos-seios-acompanhante">
										{infoAcompanhante.seios}
									</div>
								)}

								{infoAcompanhante.tamanhoPes === undefined ||
								infoAcompanhante.tamanhoPes === '' ||
								infoAcompanhante.tamanhoPes === null ? (
									''
								) : (
									<div className="label-pes-acompanhante font-semibold">
										Pés:
									</div>
								)}
								{infoAcompanhante.tamanhoPes === undefined ||
								infoAcompanhante.tamanhoPes === '' ? (
									''
								) : (
									<div className="todos-pes-acompanhante">
										{infoAcompanhante.tamanhoPes}
									</div>
								)}
							</div>
						</div>
						<hr className="my-4" />
						<div className="redes-sociais-acompanhante text-center">
							{infoAcompanhante.tiktok === undefined ||
							infoAcompanhante.tiktok === '' ||
							infoAcompanhante.tiktok === null ? (
								''
							) : (
								<a
									href={checkUrl(infoAcompanhante.tiktok, 'tiktok')}
									target="_blank"
									rel="noreferrer noopener"
								>
									<img src={iconTikTok} alt="" className="inline-block mx-4" />
								</a>
							)}

							{infoAcompanhante.twitter === undefined ||
							infoAcompanhante.twitter === '' ||
							infoAcompanhante.twitter === null ? (
								''
							) : (
								<a
									href={checkUrl(infoAcompanhante.twitter, 'twitter')}
									target="_blank"
									rel="noreferrer noopener"
								>
									<img src={iconTwitter} alt="" className="inline-block mx-4" />
								</a>
							)}

							{infoAcompanhante.instagram === undefined ||
							infoAcompanhante.instagram === '' ||
							infoAcompanhante.instagram === null ? (
								''
							) : (
								<a
									href={checkUrl(infoAcompanhante.instagram, 'instagram')}
									target="_blank"
									rel="noreferrer noopener"
								>
									<img
										src={iconInstagram}
										alt=""
										className="inline-block mx-4"
									/>
								</a>
							)}

							{infoAcompanhante.linktree === undefined ||
							infoAcompanhante.linktree === '' ? (
								''
							) : (
								<a
									href={infoAcompanhante.linktree}
									target="_blank"
									rel="noreferrer noopener"
								>
									<img
										src={iconLinktree}
										alt=""
										className="inline-block mx-4"
										style={{ width: '30px' }}
									/>
								</a>
							)}

							{infoAcompanhante.onlyfans === undefined ||
							infoAcompanhante.onlyfans === '' ? (
								''
							) : (
								<a
									href={infoAcompanhante.onlyfans}
									target="_blank"
									rel="noreferrer noopener"
								>
									<img
										src={iconOnlyfans}
										alt=""
										className="inline-block mx-4"
										style={{ width: '30px' }}
									/>
								</a>
							)}

							{infoAcompanhante.web === undefined ||
							infoAcompanhante.web === '' ? (
								''
							) : (
								<a
									href={infoAcompanhante.web}
									target="_blank"
									rel="noreferrer noopener"
								>
									<img
										src={iconWeb}
										alt=""
										className="inline-block mx-4"
										style={{ width: '30px' }}
									/>
								</a>
							)}
						</div>
						<hr className="my-4" />
						{/* <div className="denunciar-perfil-acompanhante text-right">
							Denunciar perfil
						</div> */}
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
			{infoAcompanhante.userType === 2 && (
				<a
					href={`https://wa.me/?phone=${infoAcompanhante.whatsapp}&text=Olá meu amor ,tudo bem ? Lhe vi na click company e gostaria de marcar um atendimento.`}
					target="_blank"
					rel="noreferrer"
				>
					<div className="size-xl footer-whatsapp">
						<i className="fab fa-whatsapp text-xl mr-2" />
						<span>Enviar mensagem</span>
					</div>
				</a>
			)}
			{infoAcompanhante.userType === 3 && (
				<a
					href={`https://wa.me/?phone=${infoAcompanhante.whatsapp}&text=Olá amor, tudo bem? Lhe vi na click company, podemos interagir?`}
					target="_blank"
					rel="noreferrer"
				>
					<div className="size-xl footer-whatsapp">
						<i className="fab fa-whatsapp text-xl mr-2" />
						<span>Enviar mensagem</span>
					</div>
				</a>
			)}
			{infoAcompanhante.userType === 5 && (
				<a
					href={`https://wa.me/?phone=${infoAcompanhante.whatsapp}&text=Olá , tudo bem? vi seu anúncio na click company e gostaria de mais informações sobre sua empresa.`}
					target="_blank"
					rel="noreferrer"
				>
					<div className="size-xl footer-whatsapp">
						<i className="fab fa-whatsapp text-xl mr-2" />
						<span>Enviar mensagem</span>
					</div>
				</a>
			)}
		</div>
	);
};

export default PerfilUser;

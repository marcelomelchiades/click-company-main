import React, { useState, useRef, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { toast } from 'react-toastify';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { endpointState } from '../../recoil/atoms';
import Input from '../../components/Input/Input';
import InputSelectable from '../../components/InputSelectable/InputSelectable';
import InputFiles from '../../components/InputFiles/InputFiles';
import Loading from '../../components/Loading/Loading';

const UpdatePublication: React.FC<RouteComponentProps> = ({ history }) => {
	interface formDataJsonInterface {
		id: any[];
		title: any[];
		banner: any[];
		// eslint-disable-next-line camelcase
		target_url: any[];
		active: any[];
	}

	type typeResponseAxios = {
		[key: string]: any;
	};

	type valueFilesType = {
		label: string;
		value: string;
		urlThumbnail: string;
	}[];

	const { urlEndpoint } = useRecoilValue(endpointState);

	const [showLoading, setShowLoading] = useState(false);

	const urlEndpointCreateCampaign = `${urlEndpoint}/api/partner/campaign/bulk-update`;
	const urlEndpointCampaigns = `${urlEndpoint}/api/partner/campaigns`;

	const [showPublicidade1, setShowPublicidade1] = useState(false);
	const [showPublicidade2, setShowPublicidade2] = useState(false);
	const [showPublicidade3, setShowPublicidade3] = useState(false);

	const [fileFoto1, setFileFoto1] = useState<valueFilesType>([]);
	const [fileFoto2, setFileFoto2] = useState<valueFilesType>([]);
	const [fileFoto3, setFileFoto3] = useState<valueFilesType>([]);

	const [id1, setId1] = useState('-1');
	const [id2, setId2] = useState('-1');
	const [id3, setId3] = useState('-1');

	const [title1, setTitle1] = useState('');
	const [title2, setTitle2] = useState('');
	const [title3, setTitle3] = useState('');

	const [isActive1, setIsActive1] = useState(true);
	const [isActive2, setIsActive2] = useState(true);
	const [isActive3, setIsActive3] = useState(true);

	const [url1, setUrl1] = useState('');
	const [url2, setUrl2] = useState('');
	const [url3, setUrl3] = useState('');

	const titleInput = useRef(document.createElement('div'));
	const othersInput = useRef(document.createElement('div'));
	const filePhotoInput = useRef(document.createElement('div'));

	const token = localStorage.getItem('token');

	function buildFormData(formData: any, data: any, parentKey?: any) {
		if (
			data &&
			typeof data === 'object' &&
			!(data instanceof Date) &&
			!(data instanceof File)
		) {
			Object.keys(data).forEach(key => {
				buildFormData(
					formData,
					data[key],
					parentKey ? `${parentKey}[${key}]` : key,
				);
			});
		} else {
			const value = data == null ? '' : data;

			formData.append(parentKey, value);
		}
	}

	function jsonToFormData(data: any) {
		const formData = new FormData();

		buildFormData(formData, data);

		return formData;
	}

	const getDataCampaigns = () => {
		axios
			.get(urlEndpointCampaigns, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.data.length > 0) {
					response.data.data.forEach((campaign: any, idx: any) => {
						if (idx === 0) {
							setId1(campaign.id);
							setTitle1(campaign.title);
							setFileFoto1([
								{
									value: '',
									label: '',
									urlThumbnail:
										campaign.banner !== ''
											? `https://zapgrupos-bucket.s3.us-west-2.amazonaws.com/${campaign.banner}`
											: '',
								},
							]);
							setUrl1(campaign.target_url);
							setIsActive1(campaign.active === 1);
						} else if (idx === 1) {
							setId2(campaign.id);
							setTitle2(campaign.title);
							setFileFoto2([
								{
									value: '',
									label: '',
									urlThumbnail:
										campaign.banner !== ''
											? `https://zapgrupos-bucket.s3.us-west-2.amazonaws.com/${campaign.banner}`
											: '',
								},
							]);
							setUrl2(campaign.target_url);
							setIsActive2(campaign.active === 1);
						} else if (idx === 2) {
							setId3(campaign.id);
							setTitle3(campaign.title);
							setFileFoto3([
								{
									value: '',
									label: '',
									urlThumbnail:
										campaign.banner !== ''
											? `https://zapgrupos-bucket.s3.us-west-2.amazonaws.com/${campaign.banner}`
											: '',
								},
							]);
							setUrl3(campaign.target_url);
							setIsActive3(campaign.active === 1);
						}
					});
				}
			});
	};

	useEffect(() => {
		getDataCampaigns();
	}, []);

	const sendForm = () => {
		if (title1 === '') {
			setShowPublicidade1(true);
			toast.error('Informe o título.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			titleInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (!fileFoto1.length) {
			toast.error('Favor post ao menos uma foto na primeira publicação.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			filePhotoInput.current.scrollIntoView({ behavior: 'smooth' });
		} else {
			const formDataJson: formDataJsonInterface = {
				id: [],
				title: [],
				banner: [],
				target_url: [],
				active: [],
			};

			if (title1 !== '') {
				formDataJson.id.push(id1);
				formDataJson.title.push(title1);
				formDataJson.banner.push(
					fileFoto1.length > 0 ? fileFoto1[0].value : '',
				);
				formDataJson.target_url.push(url1);
				formDataJson.active.push(isActive1 ? '1' : '0');
			}

			if (title2 !== '') {
				formDataJson.id.push(id2);
				formDataJson.title.push(title2);
				formDataJson.banner.push(
					fileFoto1.length > 0 ? fileFoto2[0].value : '',
				);
				formDataJson.target_url.push(url2);
				formDataJson.active.push(isActive2 ? '1' : '0');
			}

			if (title3 !== '') {
				formDataJson.id.push(id3);
				formDataJson.title.push(title3);
				formDataJson.banner.push(
					fileFoto1.length > 0 ? fileFoto3[0].value : '',
				);
				formDataJson.target_url.push(url3);
				formDataJson.active.push(isActive3 ? '1' : '0');
			}

			const formData = jsonToFormData(formDataJson);

			setShowLoading(true);

			axios
				.post(urlEndpointCreateCampaign, formData, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data',
					},
				})
				.then(function (response: typeResponseAxios) {
					setShowLoading(false);

					if (response.status === 201) {
						toast.success('Publicidade atualizada com sucesso!', {
							position: 'bottom-right',
							autoClose: 3000,
							hideProgressBar: true,
							closeOnClick: false,
							pauseOnHover: true,
							draggable: false,
							progress: undefined,
						});
						getDataCampaigns();
					} else if (response.data.message !== '') {
						toast.error(response.data.message, {
							position: 'bottom-right',
							autoClose: 3000,
							hideProgressBar: true,
							closeOnClick: false,
							pauseOnHover: true,
							draggable: false,
							progress: undefined,
						});
					} else {
						toast.error(
							'Erro ao tentar enviar seus dados, por favor tente novamente mais tarde.',
							{
								position: 'bottom-right',
								autoClose: 3000,
								hideProgressBar: true,
								closeOnClick: false,
								pauseOnHover: true,
								draggable: false,
								progress: undefined,
							},
						);
					}
				})
				.catch(function (error) {
					setShowLoading(false);

					toast.error(
						'Erro ao tentar enviar seus dados, por favor tente novamente mais tarde.',
						{
							position: 'bottom-right',
							autoClose: 3000,
							hideProgressBar: true,
							closeOnClick: false,
							pauseOnHover: true,
							draggable: false,
							progress: undefined,
						},
					);
				});
		}
	};

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Criar publicação
					<Link to={'/perfil'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="px-20px pt-5">
				<p className="text-color-413872 font-size-15px font-medium mb-0">
					Crie sua publicidade
				</p>
				<p className="text-color-575757 font-size-11px font-medium mb-4">
					Você pode adicionar até 3 banner
				</p>
			</div>
			<div className="separador-create-perfil-2" />

			<button
				type="button"
				className={`${
					showPublicidade1
						? 'background-color-74708D text-white'
						: 'background-color-F4F4F8 text-color-413872'
				} py-3 px-20px font-size-15px w-full text-left mt-4`}
				onClick={() => {
					setShowPublicidade1(!showPublicidade1);
				}}
			>
				<span>Publicidade - 01</span>
				<span className="float-right">
					<i className={`fas fa-chevron-${showPublicidade1 ? 'up' : 'down'}`} />
				</span>
			</button>

			<div
				className={`background-color-F4F4F8 px-20px py-2 conteudo-publicacao-1 ${
					showPublicidade1 ? '' : 'hidden'
				}`}
			>
				<div className="mb-4" ref={titleInput}>
					<p className="text-color-413872">Titulo</p>
					<div className="mt-2">
						<Input
							type="text"
							name="titulo"
							placeholder=""
							value={title1}
							className="bloco-campo-publicacao-text"
							onChange={(e: any) => setTitle1(e.target.value)}
						/>
					</div>
				</div>
				<div className="mb-4" ref={filePhotoInput}>
					<p className="text-color-413872">Upload de imagem</p>
					<p className="text-color-575757 font-size-11px">
						Dimensões da imagem: de 600 por 300 - Png, JPG, Gif
					</p>
					<InputFiles
						name="file-foto1"
						accept="image/*"
						isMutiple={false}
						valueFiles={fileFoto1}
						numberCols={1}
						onChange={(e: any) => {
							if (e.target.files.length > 0 && e.target.files.length <= 1) {
								const newFilesValue: valueFilesType = [];
								Array.from(e.target.files).forEach((file: any) => {
									newFilesValue.push({
										value: file,
										label: '',
										urlThumbnail: URL.createObjectURL(file),
									});
								});

								setFileFoto1(newFilesValue);
							} else if (e.target.files.length > 1) {
								alert('Você pode enviar apenas 1 vídeos');
							} else {
								setFileFoto1([]);
							}
						}}
						onClickAddFile={(e: any) => {
							const inputFiles = document.getElementById('file-foto1');
							if (inputFiles !== null) {
								inputFiles.click();
							}
						}}
						classesBtn={
							'bg-white mt-2 text-color-FF4767 p-2 text-center border-1-EBEBEB w-full'
						}
						previewFileClasses="campo-file campo-file-50"
					/>
				</div>
				<div className="mb-4">
					<p className="text-color-413872">
						<span>Url do destino </span>
						<span className="text-color-575757 font-size-11px">(opcional)</span>
					</p>
					<p className="text-color-575757 font-size-11px">
						Coloque o link da página que deseja levar o usuário
					</p>
					<div className="mt-2">
						<Input
							type="text"
							name="url-destino"
							placeholder=""
							value={url1}
							className="bloco-campo-publicacao-text"
							onChange={(e: any) => setUrl1(e.target.value)}
						/>
					</div>
				</div>
				<div className="mb-4">
					<p className="text-color-413872">
						<span className="mr-4">Ativar anúncio?</span>
						<input
							type="checkbox"
							checked={isActive1}
							onClick={() => {
								setIsActive1(!isActive1);
							}}
						/>
					</p>
				</div>
			</div>
			<button
				type="button"
				className={`${
					showPublicidade2
						? 'background-color-74708D text-white'
						: 'background-color-F4F4F8 text-color-413872'
				} py-3 px-20px font-size-15px w-full text-left mt-4`}
				onClick={() => {
					setShowPublicidade2(!showPublicidade2);
				}}
			>
				<span>Publicidade - 02</span>
				<span className="float-right">
					<i className={`fas fa-chevron-${showPublicidade2 ? 'up' : 'down'}`} />
				</span>
			</button>

			<div
				className={`background-color-F4F4F8 px-20px py-2 conteudo-publicacao-1 ${
					showPublicidade2 ? '' : 'hidden'
				}`}
			>
				<div className="mb-4">
					<p className="text-color-413872">Titulo</p>
					<div className="mt-2">
						<Input
							type="text"
							name="titulo"
							value={title2}
							placeholder=""
							className="bloco-campo-publicacao-text"
							onChange={(e: any) => setTitle2(e.target.value)}
						/>
					</div>
				</div>
				<div className="mb-4">
					<p className="text-color-413872">Upload de imagem</p>
					<p className="text-color-575757 font-size-11px">
						Dimensões da imagem: de 600 por 300 - Png, JPG, Gif
					</p>
					<InputFiles
						name="file-foto2"
						accept="image/*"
						isMutiple={false}
						valueFiles={fileFoto2}
						numberCols={1}
						onChange={(e: any) => {
							if (e.target.files.length > 0 && e.target.files.length <= 1) {
								const newFilesValue: valueFilesType = [];
								Array.from(e.target.files).forEach((file: any) => {
									newFilesValue.push({
										value: file,
										label: '',
										urlThumbnail: URL.createObjectURL(file),
									});
								});

								setFileFoto2(newFilesValue);
							} else if (e.target.files.length > 1) {
								alert('Você pode enviar apenas 1 vídeos');
							} else {
								setFileFoto2([]);
							}
						}}
						onClickAddFile={(e: any) => {
							const inputFiles = document.getElementById('file-foto2');
							if (inputFiles !== null) {
								inputFiles.click();
							}
						}}
						classesBtn={
							'bg-white mt-2 text-color-FF4767 p-2 text-center border-1-EBEBEB w-full'
						}
						previewFileClasses="campo-file campo-file-50"
					/>
				</div>
				<div className="mb-4">
					<p className="text-color-413872">
						<span>Url do destino </span>
						<span className="text-color-575757 font-size-11px">(opcional)</span>
					</p>
					<p className="text-color-575757 font-size-11px">
						Coloque o link da página que deseja levar o usuário
					</p>
					<div className="mt-2">
						<Input
							type="text"
							name="url-destino"
							value={url2}
							placeholder=""
							className="bloco-campo-publicacao-text"
							onChange={(e: any) => setUrl2(e.target.value)}
						/>
					</div>
				</div>
				<div className="mb-4">
					<p className="text-color-413872">
						<span className="mr-4">Ativar anúncio?</span>
						<input
							type="checkbox"
							checked={isActive2}
							onClick={() => {
								setIsActive2(!isActive2);
							}}
						/>
					</p>
				</div>
			</div>
			<button
				type="button"
				className={`${
					showPublicidade3
						? 'background-color-74708D text-white'
						: 'background-color-F4F4F8 text-color-413872'
				} py-3 px-20px font-size-15px w-full text-left mt-4`}
				onClick={() => {
					setShowPublicidade3(!showPublicidade3);
				}}
			>
				<span>Publicidade - 03</span>
				<span className="float-right">
					<i className={`fas fa-chevron-${showPublicidade3 ? 'up' : 'down'}`} />
				</span>
			</button>

			<div
				className={`background-color-F4F4F8 px-20px py-2 conteudo-publicacao-1 ${
					showPublicidade3 ? '' : 'hidden'
				}`}
			>
				<div className="mb-4">
					<p className="text-color-413872">Titulo</p>
					<div className="mt-2">
						<Input
							type="text"
							name="titulo"
							value={title3}
							placeholder=""
							className="bloco-campo-publicacao-text"
							onChange={(e: any) => setTitle3(e.target.value)}
						/>
					</div>
				</div>
				<div className="mb-4">
					<p className="text-color-413872">Upload de imagem</p>
					<p className="text-color-575757 font-size-11px">
						Dimensões da imagem: de 600 por 300 - Png, JPG, Gif
					</p>
					<InputFiles
						name="file-foto3"
						accept="image/*"
						isMutiple={false}
						valueFiles={fileFoto3}
						numberCols={1}
						onChange={(e: any) => {
							if (e.target.files.length > 0 && e.target.files.length <= 1) {
								const newFilesValue: valueFilesType = [];
								Array.from(e.target.files).forEach((file: any) => {
									newFilesValue.push({
										value: file,
										label: '',
										urlThumbnail: URL.createObjectURL(file),
									});
								});

								setFileFoto3(newFilesValue);
							} else if (e.target.files.length > 1) {
								alert('Você pode enviar apenas 1 vídeos');
							} else {
								setFileFoto3([]);
							}
						}}
						onClickAddFile={(e: any) => {
							const inputFiles = document.getElementById('file-foto3');
							if (inputFiles !== null) {
								inputFiles.click();
							}
						}}
						classesBtn={
							'bg-white mt-2 text-color-FF4767 p-2 text-center border-1-EBEBEB w-full'
						}
						previewFileClasses="campo-file campo-file-50"
					/>
				</div>
				<div className="mb-4">
					<p className="text-color-413872">
						<span>Url do destino </span>
						<span className="text-color-575757 font-size-11px">(opcional)</span>
					</p>
					<p className="text-color-575757 font-size-11px">
						Coloque o link da página que deseja levar o usuário
					</p>
					<div className="mt-2">
						<Input
							type="text"
							name="url-destino"
							placeholder=""
							value={url3}
							className="bloco-campo-publicacao-text"
							onChange={(e: any) => setUrl3(e.target.value)}
						/>
					</div>
				</div>
				<div className="mb-4">
					<p className="text-color-413872">
						<span className="mr-4">Ativar anúncio?</span>
						<input
							type="checkbox"
							checked={isActive3}
							onClick={() => {
								setIsActive3(!isActive3);
							}}
						/>
					</p>
				</div>
			</div>

			<div className="py-4 my-4" />
			<div className="py-4" />
			<div className="footer-register">
				<button
					type="button"
					onClick={sendForm}
					// to={'/packets-partner'}
					className="block w-full p-2 rounded-full text-center bg-white"
				>
					Salvar
				</button>
			</div>
			<Loading showLoading={showLoading} />
		</div>
	);
};

export default UpdatePublication;

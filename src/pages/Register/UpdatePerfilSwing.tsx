import React, { useEffect, useState, useRef } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { AnyRecord } from 'dns';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import { endpointState } from '../../recoil/atoms';

import Input from '../../components/Input/Input';
import InputFiles from '../../components/InputFiles/InputFiles';
import Loading from '../../components/Loading/Loading';

const UpdatePerfilSwing: React.FC<RouteComponentProps> = ({ history }) => {
	type typeResponseAxios = {
		[key: string]: any;
	};

	type valueFilesType = {
		label: string;
		value: string;
		urlThumbnail: string;
	}[];

	type selectValues = {
		label: string;
		value: string;
	}[];

	const [showLoading, setShowLoading] = useState(false);

	const { urlEndpoint, urlEndpointEstados } = useRecoilValue(endpointState);
	const urlAcompanhante = `${urlEndpoint}/api/account`;
	const urlEndpointCreatePerfil = `${urlEndpoint}/api/account/update`;

	const [filesFotos, setFilesFotos] = useState<valueFilesType>([]);
	const [filesVideos, setFilesVideos] = useState<valueFilesType>([]);

	const [name, setName] = useState('');
	const [whatsApp, setWhatsApp] = useState('');
	const [birth, setBirth] = useState('');
	const [info, setInfo] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [neighborhood, setNeighborhood] = useState('');

	const [estadoSelect, setEstadoSelect] = useState<selectValues>([]);
	const [cidadeSelect, setCidadeSelect] = useState<selectValues>([]);
	const [bairroText, setBairroText] = useState('');

	const nameInput = useRef(document.createElement('div'));
	const whatsappInput = useRef(document.createElement('div'));
	const infoInput = useRef(document.createElement('div'));
	const stateInput = useRef(document.createElement('div'));
	const cityInput = useRef(document.createElement('div'));
	const neighborhoodInput = useRef(document.createElement('div'));
	const filePhotoInput = useRef(document.createElement('div'));
	const birthInput = useRef(document.createElement('div'));

	const token = localStorage.getItem('token');

	const getInfoUser = (statesArray: any[]) => {
		const myStatesArray = statesArray;

		axios
			.get(urlAcompanhante, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(response => {
				if (response.status === 200) {
					const stateResponse = response.data.address?.state;
					const cityResponse = response.data.address?.city;

					setName(response.data.profile?.nickname);
					setWhatsApp(response.data.profile?.whatsapp);
					setInfo(response.data.profile?.info);
					setBirth(response.data.profile?.birth);
					setInfo(response.data.profile?.info);
					setState(stateResponse);
					let idState = '0';
					myStatesArray.forEach(element => {
						if (element.label === stateResponse) {
							idState = element.value;
						}
					});
					setSelectsAxiosIbge('cidades', idState, cityResponse);
					setNeighborhood(response.data.address?.neighborhood);

					const fotos: valueFilesType = [];
					const videos: valueFilesType = [];

					if (response.data.profile.midias.length > 0) {
						const midiasProfile = response.data.profile.midias;

						midiasProfile.forEach((midia: any) => {
							if (midia.type === 'image') {
								const lastMidiaLink =
									midia.link[
										Object.keys(midia.link)[Object.keys(midia.link).length - 1]
									];
								fotos.push({
									label: '',
									value: '',
									urlThumbnail: lastMidiaLink,
								});
							} else if (midia.type === 'video') {
								videos.push({
									label: '',
									value: '',
									urlThumbnail: midia.link,
								});
							}
						});
					}
					setFilesFotos(fotos);
					setFilesVideos(videos);
				}
			});
	};

	const setSelectsAxiosIbge = (
		tipoEstadoCidade: 'estados' | 'cidades' = 'estados',
		idEstado = '33',
		labelCidade = '',
		callGetInfoUser = false,
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
					setCity(labelCidade);
					if (callGetInfoUser) {
						getInfoUser(newValue);
					}
				} else {
					setSelect[tipoEstadoCidade]([]);
				}
			});
	};

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

	const sendForm = () => {
		if (name === '') {
			toast.error('Informe como deseja ser chamado.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			nameInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (whatsApp === '') {
			toast.error('Número de Whatsapp não informado.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			whatsappInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (whatsApp.length !== 15) {
			toast.error('Número de Whatsapp inválido.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			whatsappInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (birth === '') {
			toast.error('Data de nascimento não informado.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			birthInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (validateAge() === false) {
			toast.error('Idade menor que 18 anos ou inválida.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			birthInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (info === '') {
			toast.error('Favor fale um pouco sobre você..', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			infoInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (state === '') {
			toast.error('Favor selecione a seu estado.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			stateInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (city === '' || city === 'Cidade') {
			toast.error('Favor selecione o sua cidade.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			cityInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (neighborhood === '') {
			toast.error('Favor informe seu bairro.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			neighborhoodInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (!filesFotos.length) {
			toast.error('Favor post ao menos uma foto.', {
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
			const images: any[] = [];
			const videos: any[] = [];

			filesFotos.forEach(element => {
				if (typeof element.value !== typeof File) {
					images.push(element.value);
				}
			});
			filesVideos.forEach(element => {
				if (typeof element.value !== typeof File) {
					videos.push(element.value);
				}
			});

			const formDataJson = {
				profile: {
					nickname: name,
					whatsapp: whatsApp,
					gender: '',
					height: '',
					profile_eyes_id: '',
					weight: '',
					clothingSize: '',
					footSize: '',
					profile_skin_color_id: '',
					profile_hair_id: '',
					profile_breasts_id: '',
					info,
					price: 0,
					can_local: 0,
					occasion: [],
					type_service: [],
					languages: [],
					payment_type: [],
					url_instagram: '',
					url_tiktok: '',
					url_twitter: '',
					birth,
				},
				address: {
					zipcode: '0',
					number: '0',
					address: '0',
					reference: '0',

					state,
					city,
					neighborhood,
				},
				images,
				videos,
			};
			const formData = jsonToFormData(formDataJson);

			setShowLoading(true);

			axios
				.request({
					method: 'POST',
					url: urlEndpointCreatePerfil,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data;',
					},
					data: formData,
				})
				.then(function (response: typeResponseAxios) {
					setShowLoading(false);

					if (response.status === 204) {
						toast.success('Perfil atualizado com sucesso!', {
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

					let msgError =
						'Erro ao tentar enviar seus dados, por favor tente novamente mais tarde.';

					if (
						error.response?.data?.message ===
						'O vídeo deve ter no máximo 20 segundos'
					) {
						msgError = error.response?.data?.message;
					}

					toast.error(msgError, {
						position: 'bottom-right',
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: false,
						pauseOnHover: true,
						draggable: false,
						progress: undefined,
					});
				});
		}
	};

	function validateAge() {
		const d = new Date();
		const yearNow = d.getFullYear();
		const monthNow = d.getMonth() + 1;
		const dayNow = d.getDate();

		const dateBorn = birth.split('-');

		let age = yearNow - Number(dateBorn[0]);

		if (
			monthNow < Number(dateBorn[1]) ||
			(monthNow === Number(dateBorn[1]) && dayNow < Number(dateBorn[3]))
		) {
			age -= 1;
		}
		if (age >= 18 && age > 0 && age <= 113) return true;
		return false;
	}

	useEffect(() => {
		setSelectsAxiosIbge('estados', '0', '', true);
	}, []);

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Atualize perfil
					<Link to={'/perfil'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="px-20px py-5">
				<div className="grid grid-cols-1 gap-2">
					<div className="bloco-como-quer-ser-chamado" ref={nameInput}>
						<Input
							name="como-quer-ser-chamado"
							type="text"
							placeholder="Como quer ser chamado(a)"
							value={name}
							onChange={(
								e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
							) => {
								setName((e.target as HTMLInputElement).value);
							}}
						/>
					</div>
					<div className="mb-4" ref={whatsappInput}>
						<InputMask
							className={'form-input'}
							name={'n_whatsapp'}
							type={'tel'}
							placeholder={'Número WhatsApp'}
							value={whatsApp}
							mask="(99) 99999-9999"
							maskChar=""
							onChange={(
								e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
							) => {
								setWhatsApp((e.target as HTMLInputElement).value);
							}}
						/>
					</div>
					<div className="mb-2" ref={birthInput}>
						<Input
							name="birth"
							type="date"
							placeholder="Data de Nascimento"
							label="Data de Nascimento"
							value={birth}
							onChange={(
								e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
							) => {
								setBirth((e.target as HTMLInputElement).value);
							}}
						/>
					</div>
					<div className="bloco-fale-sobre-voce" ref={infoInput}>
						<Input
							name="fale-sobre-voce"
							type="text"
							placeholder="Fale um pouco sobre você"
							value={info}
							onChange={(
								e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
							) => {
								setInfo((e.target as HTMLInputElement).value);
							}}
						/>
					</div>
				</div>
			</div>
			<div className="separador-create-perfil-2" />
			<div className="px-20px py-5">
				<p className="text-color-413872">Localização</p>
				<div className="grid grid-cols-1 gap-2">
					<div className="bloco-estado" ref={stateInput}>
						<Input
							name="estado"
							type="select"
							placeholder="Estado"
							valueSelect={estadoSelect}
							onChange={(e: any) => {
								setSelectsAxiosIbge('cidades', e.currentTarget.value);
								setState(e.target.options[e.target.selectedIndex].text);
							}}
							value={state}
						/>
					</div>
					<div className="bloco-cidade" ref={cityInput}>
						{/* <InputSelectable
							name={'cidade'}
							placeholder={'Cidade'}
							onChange={onChangeSelectables}
							onKeyDown={onKeyDownSelectables}
							onClickAddElement={onClickAddElementSelectables}
							valueSelect={cidade.value}
							inputValueSelect={cidade.inputValue}
						/> */}
						<Input
							name="cidade"
							type="select"
							placeholder="Cidade"
							valueSelect={cidadeSelect}
							value={city}
							onChange={(e: any) => {
								setCity(e.target.options[e.target.selectedIndex].text);
							}}
						/>
					</div>
					<div className="bloco-bairro" ref={neighborhoodInput}>
						{/* <InputSelectable
							name={'bairro'}
							placeholder={'Bairro'}
							onChange={onChangeSelectables}
							onKeyDown={onKeyDownSelectables}
							onClickAddElement={onClickAddElementSelectables}
							valueSelect={bairro.value}
							inputValueSelect={bairro.inputValue}
						/> */}
						<Input
							name="bairro"
							type="text"
							placeholder="Bairro"
							value={neighborhood}
							onChange={(
								e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
							) => {
								setNeighborhood((e.target as HTMLInputElement).value);
							}}
						/>
					</div>
				</div>
			</div>
			<div className="separador-create-perfil-2" />
			<div className="px-20px py-5">
				<p className="text-color-413872 mb-2">Fotos</p>
				<div className="mb-6" ref={filePhotoInput}>
					<InputFiles
						name="files-fotos"
						label="Adicione até 10 fotos de uma vez"
						accept="image/*"
						valueFiles={filesFotos}
						onChange={(e: any) => {
							if (e.target.files.length > 0 && e.target.files.length <= 10) {
								const newFilesValue: valueFilesType = [];
								Array.from(e.target.files).forEach((file: any) => {
									newFilesValue.push({
										value: file,
										label: '',
										urlThumbnail: URL.createObjectURL(file),
									});
								});

								setFilesFotos([...filesFotos, ...newFilesValue]);
							} else if (e.target.files.length > 10) {
								alert('Você pode enviar apenas 10 imagens');
							} else {
								setFilesFotos([]);
							}
						}}
						onClickAddFile={(e: any) => {
							const inputFiles = document.getElementById('files-fotos');
							if (inputFiles !== null) {
								inputFiles.click();
							}
						}}
					/>
				</div>
				<hr className="mb-6" />
				<p className="text-color-413872 mb-2">Vídeos</p>
				<div className="mb-4">
					<InputFiles
						name="files-videos"
						accept="video/*"
						label="Adicione até 3 vídeos de uma vez. O vídeo deve ter no máximo 20 segundos."
						valueFiles={filesVideos}
						onChange={(e: any) => {
							if (e.target.files.length > 0 && e.target.files.length <= 3) {
								const newFilesValue: valueFilesType = [];
								Array.from(e.target.files).forEach((file: any) => {
									newFilesValue.push({
										value: file,
										label: '',
										urlThumbnail: URL.createObjectURL(file),
									});
								});

								setFilesVideos([...filesVideos, ...newFilesValue]);
							} else if (e.target.files.length > 3) {
								alert('Você pode enviar apenas 3 vídeos');
							} else {
								setFilesVideos([]);
							}
						}}
						onClickAddFile={(e: any) => {
							const inputFiles = document.getElementById('files-videos');
							if (inputFiles !== null) {
								inputFiles.click();
							}
						}}
					/>
				</div>
			</div>
			<div className="pb-20" />
			<div className="footer-register">
				<button
					// to={'/packets'}
					type="button"
					onClick={sendForm}
					className="block w-full p-2 rounded-full text-center bg-white"
				>
					Continuar
				</button>
			</div>
			<Loading showLoading={showLoading} />
		</div>
	);
};

export default UpdatePerfilSwing;

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useRef } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { createPerfilAcompanhante1, endpointState } from '../../recoil/atoms';

import Input from '../../components/Input/Input';
import InputFiles from '../../components/InputFiles/InputFiles';
import InputSelectable from '../../components/InputSelectable/InputSelectable';
import Loading from '../../components/Loading/Loading';
import InputRange from '../../components/InputRange/InputRange';

function stringfyError(error: any){
	let str: string = '';
	console.log(error)
	for(let key in error){
		if(typeof error[key] === 'string'){
			str = str+error[key]+"\n"
		}else if(typeof error[key] === 'object'){
			for(let key2 in error[key]){
				str = str+"\n* O campo:"+key2+" está incorreto: "+"\n"
				str = str+error[key][key2][0]+"\n"
			}
		}
	}
	console.log(str)
	return str;
}


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

const CreatePerfil2: React.FC<RouteComponentProps> = ({ history }) => {
	type typeResponseAxios = {
		[key: string]: any;
	};

	type selectValues = {
		label: string;
		value: string;
	}[];

	type valuesSelect = string[];

	type valueFilesType = {
		label: string;
		value: string;
		urlThumbnail: string;
	}[];

	interface interfaceSelectables {
		inputValue: string;
		value: any[];
		required: boolean;
	}

	const { urlEndpoint, urlEndpointEstados } = useRecoilValue(endpointState);

	const infoCreatePerfilAcompanhante1 = useRecoilValue(
		createPerfilAcompanhante1,
	);

	const urlEndpointLanguages = `${urlEndpoint}/api/profile/languages/list`;
	const urlEndpointPreferences = `${urlEndpoint}/api/profile/preferences/list`;
	const urlEndpointPaymentType = `${urlEndpoint}/api/profile/payment-type/list`;
	const urlEndpointOcasion = `${urlEndpoint}/api/profile/ocasion/list`;
	const urlEndpointCreatePerfil = `${urlEndpoint}/api/account/update`;

	const [languages, setLanguages] = useState<selectValues>([]);
	const [preferences, setPreferences] = useState<selectValues>([]);
	const [paymentType, setPaymentType] = useState<selectValues>([]);
	const [ocasion, setOcasion] = useState<selectValues>([]);
	const [estadoSelect, setEstadoSelect] = useState<selectValues>([]);
	const [cidadeSelect, setCidadeSelect] = useState<selectValues>([]);

	const [formaPagamento, setFormaPagamento] = useState<interfaceSelectables>({
		inputValue: '',
		value: [],
		required: false,
	});

	const [cidade, setCidade] = useState<interfaceSelectables>({
		inputValue: '',
		value: [],
		required: false,
	});

	const [bairro, setBairro] = useState<interfaceSelectables>({
		inputValue: '',
		value: [],
		required: false,
	});

	const [ocasiao, setOcasiao] = useState<interfaceSelectables>({
		inputValue: '',
		value: [],
		required: false,
	});

	const [tipoAtendimento, setTipoAtendimento] = useState<interfaceSelectables>({
		inputValue: '',
		value: [],
		required: false,
	});

	const [idiomas, setIdiomas] = useState<interfaceSelectables>({
		inputValue: '',
		value: [],
		required: false,
	});

	const [links, setLinks] = useState<interfaceSelectables>({
		inputValue: '',
		value: [],
		required: false,
	});

	const createOption = (label: string) => ({
		label,
		value: label,
	});

	const [price, setPrice] = useState<number[]>([250]);
	const [paymentTypeValues, setPaymentTypeValues] = useState<valuesSelect>([]);
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [neighborhood, setNeighborhood] = useState('');
	const [canLocal, setCanLocal] = useState('');
	const [occasionValues, setOccasionValues] = useState<valuesSelect>([]);
	const [preferencesValues, setPreferencesValues] = useState<valuesSelect>([]);
	const [languagesValues, setLanguagesValues] = useState<valuesSelect>([]);
	const [filesFotos, setFilesFotos] = useState<valueFilesType>([]);
	const [filesVideos, setFilesVideos] = useState<valueFilesType>([]);
	const [urlInstagram, setUrlInstagram] = useState('');
	const [urlTikTok, setUrlTikTok] = useState('');
	const [urlTwitter, setUrlTwitter] = useState('');
	const [urlLinktree, setUrlLinktree] = useState('');
	const [urlOnlyfans, setUrlOnlyfans] = useState('');
	const [urlWeb, setUrlWeb] = useState('');

	const paymentValueInput = useRef(document.createElement('div'));
	const stateInput = useRef(document.createElement('div'));
	const cityInput = useRef(document.createElement('div'));
	const neighborhoodInput = useRef(document.createElement('div'));
	const canLocalInput = useRef(document.createElement('div'));
	const preferencesValuesInput = useRef(document.createElement('div'));
	const filePhotoInput = useRef(document.createElement('div'));

	const [showLoading, setShowLoading] = useState(false);

	const setSelectables = (nameSelectable: string, valuesSelectables: any) => {
		if (nameSelectable === 'forma-de-pagamento') {
			setFormaPagamento(valuesSelectables);
		} else if (nameSelectable === 'cidade') {
			setCidade(valuesSelectables);
		} else if (nameSelectable === 'bairro') {
			setBairro(valuesSelectables);
		} else if (nameSelectable === 'ocasiao') {
			setOcasiao(valuesSelectables);
		} else if (nameSelectable === 'tipo-atendimento') {
			setTipoAtendimento(valuesSelectables);
		} else if (nameSelectable === 'idiomas') {
			setIdiomas(valuesSelectables);
		} else if (nameSelectable === 'links') {
			setLinks(valuesSelectables);
		}
	};

	const returnSelectables = (nameSelectable: string) => {
		let retornoFunction: interfaceSelectables = {
			inputValue: '',
			value: [],
			required: false,
		};

		if (nameSelectable === 'forma-de-pagamento') {
			retornoFunction = formaPagamento;
		} else if (nameSelectable === 'cidade') {
			retornoFunction = cidade;
		} else if (nameSelectable === 'bairro') {
			retornoFunction = bairro;
		} else if (nameSelectable === 'ocasiao') {
			retornoFunction = ocasiao;
		} else if (nameSelectable === 'tipo-atendimento') {
			retornoFunction = tipoAtendimento;
		} else if (nameSelectable === 'idiomas') {
			retornoFunction = idiomas;
		} else if (nameSelectable === 'links') {
			retornoFunction = links;
		}

		return retornoFunction;
	};

	const onChangeSelectables = (valueEvent: any, e: any) => {
		let currentInputValue = '';
		let currentValue = [];

		let currentName = null;

		if (
			valueEvent !== undefined &&
			typeof valueEvent === 'object' &&
			valueEvent.currentTarget !== undefined &&
			valueEvent.currentTarget.value !== undefined
		) {
			currentInputValue = valueEvent.currentTarget.value;

			currentName = valueEvent.currentTarget.name;
		} else if (valueEvent !== undefined && Array.isArray(valueEvent)) {
			currentValue = valueEvent;

			if (e !== undefined && e.name !== undefined) {
				currentName = e.name;
			}
		}

		if (currentName !== null) {
			const currentValuesSelectables = returnSelectables(currentName);

			if (currentInputValue === '') {
				currentInputValue = currentValuesSelectables.inputValue;
			}
			if (
				valueEvent !== undefined &&
				typeof valueEvent === 'object' &&
				valueEvent.currentTarget !== undefined &&
				valueEvent.currentTarget.value !== undefined
			) {
				currentValue = currentValuesSelectables.value;
			}

			setSelectables(currentName, {
				inputValue: currentInputValue,
				value: currentValue,
				required: currentValuesSelectables.required,
			});
		}
	};

	const onClickAddElementSelectables = (event: any) => {
		const currentName =
			event !== undefined &&
			event.currentTarget !== undefined &&
			event.currentTarget.name !== undefined
				? event.currentTarget.name
				: null;

		const currentValuesSelectables = returnSelectables(currentName);

		const { inputValue, value } = currentValuesSelectables;
		if (!inputValue) return;

		if (currentName !== null) {
			setSelectables(currentName, {
				inputValue: '',
				value: [...value, createOption(inputValue)],
				required: currentValuesSelectables.required,
			});
		}
		event.preventDefault();
	};

	const onKeyDownSelectables = (event: any) => {
		const currentName =
			event !== undefined &&
			event.currentTarget !== undefined &&
			event.currentTarget.name !== undefined
				? event.currentTarget.name
				: null;

		const currentValuesSelectables = returnSelectables(currentName);

		const { inputValue, value } = currentValuesSelectables;
		if (!inputValue) return;

		switch (event.key) {
			case 'Enter':
				if (currentName !== null) {
					setSelectables(currentName, {
						inputValue: '',
						value: [...value, createOption(inputValue)],
						required: currentValuesSelectables.required,
					});
				}
				event.preventDefault();
				break;
			case 'Tab':
				if (currentName !== null) {
					setSelectables(currentName, {
						inputValue: '',
						value: [...value, createOption(inputValue)],
						required: currentValuesSelectables.required,
					});
				}
				event.preventDefault();
				break;
			default:
			// console.log('default');
		}
	};

	const setSelectsAxios = (url: string, setSelect: any) => {
		axios
			.get(url, {
				// headers: {
				// 	Authorization: `Bearer ${token}`,
				// },
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.data.length > 0) {
					const newValue: selectValues = [];

					response.data.data.forEach((element: any) => {
						newValue.push({
							label: element.name,
							value: element.name,
						});
					});

					setSelect(newValue);
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
					setCity('');
				} else {
					setSelect[tipoEstadoCidade]([]);
				}
			});
	};

	const sendForm = () => {
		if (
			!paymentTypeValues.length ||
			(paymentTypeValues.length === 1 && paymentTypeValues[0] === '')
		) {
			toast.error('Favor selecione a forma de pagamento.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			paymentValueInput.current.scrollIntoView({ behavior: 'smooth' });
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
		} else if (city === '') {
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
		} else if (canLocal !== '0' && canLocal !== '1') {
			toast.error('Favor responda se possui local.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			canLocalInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (
			!preferencesValues.length ||
			(preferencesValues.length === 1 && preferencesValues[0] === '')
		) {
			toast.error('Favor selecione um ou mais opçõs em tipo de atendimento.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			preferencesValuesInput.current.scrollIntoView({ behavior: 'smooth' });
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
			const token = localStorage.getItem('token');

			const images: any[] = [];
			const videos: any[] = [];

			filesFotos.forEach(element => {
				images.push(element.value);
			});
			filesVideos.forEach(element => {
				videos.push(element.value);
			});

			const formDataJson = {
				profile: {
					nickname: infoCreatePerfilAcompanhante1.name,
					whatsapp: infoCreatePerfilAcompanhante1.profile.whatsApp,
					gender: infoCreatePerfilAcompanhante1.profile.gender,
					height: infoCreatePerfilAcompanhante1.profile.height,
					profile_eyes_id: infoCreatePerfilAcompanhante1.profile.eyes,
					weight: infoCreatePerfilAcompanhante1.profile.weight,
					clothing_size: infoCreatePerfilAcompanhante1.profile.clothingSize,
					foot_size: infoCreatePerfilAcompanhante1.profile.footSize,
					profile_skin_color_id:
						infoCreatePerfilAcompanhante1.profile.skinColor,
					profile_hair_id: infoCreatePerfilAcompanhante1.profile.hair,
					profile_breasts_id: infoCreatePerfilAcompanhante1.profile.breasts,
					info: infoCreatePerfilAcompanhante1.profile.info,
					price: price[0],
					can_local: canLocal,
					occasion: occasionValues,
					type_service: preferencesValues,
					languages: languagesValues,
					payment_type: paymentTypeValues,
					url_instagram: urlInstagram,
					url_tiktok: urlTikTok,
					url_twitter: urlTwitter,

					url_linketree: urlLinktree,
					url_onlyfans: urlOnlyfans,
					url_web: urlWeb,

					birth: infoCreatePerfilAcompanhante1.profile.birth,
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
						localStorage.setItem('perfilCreate', '1');
						history.push('/packets');
					} else {
						let json = response.json()
						toast.error(
							JSON.stringify(json),
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
					}else if(error.response.status == 422){
						msgError = stringfyError(error.response.data)			
					}

					toast.error(msgError, {
						position: 'bottom-right',
						autoClose: 10000,
						hideProgressBar: true,
						closeOnClick: false,
						pauseOnHover: true,
						draggable: false,
						progress: undefined,
					});
				});
		}
	};

	useEffect(() => {
		setSelectsAxios(urlEndpointLanguages, setLanguages);
		setSelectsAxios(urlEndpointOcasion, setOcasion);
		setSelectsAxios(urlEndpointPaymentType, setPaymentType);
		setSelectsAxios(urlEndpointPreferences, setPreferences);
		setSelectsAxiosIbge('estados');
	}, []);

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Criar perfil
					<Link to={'/login'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="px-20px pt-5">
				<div className="text-conte-preferencia mb-4">
					Agora nos conte suas preferências de trabalho (;
				</div>
				<div className="text-passos mb-7">Passo 2 de 2</div>
				<div className="mb-6">
					<label className="label-campo">Valor</label>
					<InputRange
						rtl={false}
						step={50}
						min={50}
						max={1500}
						values={price}
						setValues={setPrice}
						toFixed={2}
						strPrefixValue="R$"
					/>
				</div>
				<hr />
				<div className="mb-3" />
				<div className="mb-4" ref={paymentValueInput}>
					{/* <InputSelectable
						name={'forma-de-pagamento'}
						placeholder={'Forma de pagamento'}
						onChange={onChangeSelectables}
						onKeyDown={onKeyDownSelectables}
						onClickAddElement={onClickAddElementSelectables}
						valueSelect={formaPagamento.value}
						inputValueSelect={formaPagamento.inputValue}
					/> */}
					<p className="text-color-413872 mb-4">Forma de pagamento</p>
					<Input
						name="payment_type"
						type="select"
						multiple={true}
						placeholder="Selecione"
						valueSelect={paymentType}
						value={paymentTypeValues}
						onChange={(e: React.FormEvent<HTMLSelectElement>) => {
							setPaymentTypeValues(
								Array.from(
									(e.target as HTMLSelectElement).selectedOptions,
									option => option.value,
								),
							);
						}}
					/>
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
				<div className="bloco-possui-local pt-4 mb-5" ref={canLocalInput}>
					<Input
						name="possui-local"
						type="select"
						placeholder="Possui local?"
						valueSelect={[
							{ label: 'Sim', value: '1' },
							{ label: 'Não', value: '0' },
						]}
						value={canLocal}
						onChange={(e: React.FormEvent<HTMLSelectElement>) => {
							setCanLocal((e.target as HTMLSelectElement).value);
						}}
					/>
				</div>
				<hr />
			</div>
			<div className="separador-create-perfil-2" />
			<div className="px-20px py-5">
				<p className="text-color-413872 mb-4">Ocasião</p>
				{/* <InputSelectable
					name={'ocasiao'}
					placeholder={'Adicionar eventos'}
					onChange={onChangeSelectables}
					onKeyDown={onKeyDownSelectables}
					onClickAddElement={onClickAddElementSelectables}
					valueSelect={ocasiao.value}
					inputValueSelect={ocasiao.inputValue}
				/> */}
				<Input
					name="ocasion"
					type="select"
					multiple={true}
					placeholder="Selecione"
					valueSelect={ocasion}
					value={occasionValues}
					onChange={(e: React.FormEvent<HTMLSelectElement>) => {
						setOccasionValues(
							Array.from(
								(e.target as HTMLSelectElement).selectedOptions,
								option => option.value,
							),
						);
					}}
				/>
			</div>
			<div className="separador-create-perfil-2" />
			<div className="px-20px py-5" ref={preferencesValuesInput}>
				<p className="text-color-413872 mb-4">Tipo de atendimento:</p>
				{/* <InputSelectable
					name={'tipo-atendimento'}
					placeholder={'Adicionar preferências'}
					onChange={onChangeSelectables}
					onKeyDown={onKeyDownSelectables}
					onClickAddElement={onClickAddElementSelectables}
					valueSelect={tipoAtendimento.value}
					inputValueSelect={tipoAtendimento.inputValue}
				/> */}
				<Input
					name="preferences"
					type="select"
					multiple={true}
					placeholder="Selecione"
					valueSelect={preferences}
					value={preferencesValues}
					onChange={(e: React.FormEvent<HTMLSelectElement>) => {
						setPreferencesValues(
							Array.from(
								(e.target as HTMLSelectElement).selectedOptions,
								option => option.value,
							),
						);
					}}
				/>
			</div>
			<div className="separador-create-perfil-2" />
			<div className="px-20px py-5">
				<p className="text-color-413872 mb-4">Idiomas</p>
				{/* <InputSelectable
					name={'idiomas'}
					placeholder={'Adicionar idiomas'}
					onChange={onChangeSelectables}
					onKeyDown={onKeyDownSelectables}
					onClickAddElement={onClickAddElementSelectables}
					valueSelect={idiomas.value}
					inputValueSelect={idiomas.inputValue}
				/> */}
				<Input
					name="languages"
					type="select"
					multiple={true}
					placeholder="Selecione"
					valueSelect={languages}
					value={languagesValues}
					onChange={(e: React.FormEvent<HTMLSelectElement>) => {
						setLanguagesValues(
							Array.from(
								(e.target as HTMLSelectElement).selectedOptions,
								option => option.value,
							),
						);
					}}
				/>
			</div>
			<div className="separador-create-perfil-2" />
			<div className="px-20px py-5">
				<p className="text-color-413872 mb-4">Links</p>
				<Input
					name="instagram"
					type="text"
					placeholder="Instagram"
					value={urlInstagram}
					onChange={(
						e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
					) => {
						setUrlInstagram((e.target as HTMLInputElement).value);
					}}
				/>
				<Input
					name="tiktok"
					type="text"
					placeholder="TikTok"
					value={urlTikTok}
					onChange={(
						e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
					) => {
						setUrlTikTok((e.target as HTMLInputElement).value);
					}}
				/>
				<Input
					name="twitter"
					type="text"
					placeholder="Twitter"
					value={urlTwitter}
					onChange={(
						e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
					) => {
						setUrlTwitter((e.target as HTMLInputElement).value);
					}}
				/>

				<Input
					name="linktree"
					type="text"
					placeholder="Linktree"
					value={urlLinktree}
					onChange={(
						e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
					) => {
						setUrlLinktree((e.target as HTMLInputElement).value);
					}}
				/>
				<Input
					name="onlyfans"
					type="text"
					placeholder="Onlyfans"
					value={urlOnlyfans}
					onChange={(
						e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
					) => {
						setUrlOnlyfans((e.target as HTMLInputElement).value);
					}}
				/>
				<Input
					name="web"
					type="text"
					placeholder="Web"
					value={urlWeb}
					onChange={(
						e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
					) => {
						setUrlWeb((e.target as HTMLInputElement).value);
					}}
				/>
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
								e.target.value = '';
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
						hasRemove={true}
						onClickRemoveFile={async (e: any) => {
							setFilesFotos(
								filesFotos.filter(
									(file: any) => file.urlThumbnail !== e.urlThumbnail,
								),
							);
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
								e.target.value = '';
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
						hasRemove={true}
						onClickRemoveFile={(e: any) => {
							setFilesVideos(
								filesVideos.filter(
									(file: any) => file.urlThumbnail !== e.urlThumbnail,
								),
							);
						}}
					/>
				</div>
			</div>
			<div className="pb-20" />
			<div className="footer-register">
				<button
					type="button"
					onClick={sendForm}
					className="block w-full p-2 rounded-full text-center bg-white"
				>
					Próximo
				</button>
			</div>
			<Loading showLoading={showLoading} />
		</div>
	);
};

export default CreatePerfil2;

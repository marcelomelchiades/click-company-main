import React, { useEffect, useState, useRef } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import { endpointState } from '../../recoil/atoms';

import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';

const CreatePerfilPartner: React.FC<RouteComponentProps> = ({ history }) => {
	type typeResponseAxios = {
		[key: string]: any;
	};

	type selectValues = {
		label: string;
		value: string;
	}[];

	const documentSelect = [
		{ label: 'CPF', value: 'CPF' },
		{ label: 'CNPJ', value: 'CNPJ' },
	];

	const [showLoading, setShowLoading] = useState(false);

	const { urlEndpoint, urlEndpointEstados } = useRecoilValue(endpointState);
	const urlEndpointCreatePerfilPartner = `${urlEndpoint}/api/account/partner/update`;
	const urlEndpointCategories = `${urlEndpoint}/api/profile/categories-partner/list`;

	const [name, setName] = useState('');
	const [cellPhone, setCellPhone] = useState('');
	const [birth, setBirth] = useState('');
	const [typeDocument, setTypeDocument] = useState('');
	const [cpf, setCpf] = useState('');
	const [cnpj, setCnpj] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [neighborhood, setNeighborhood] = useState('');

	const [estadoSelect, setEstadoSelect] = useState<selectValues>([]);
	const [cidadeSelect, setCidadeSelect] = useState<selectValues>([]);
	const [bairroText, setBairroText] = useState('');

	const [categoriaSelect, setCategoriaSelect] = useState([]);
	const [categoria1, setCategoria1] = useState('');

	const nameInput = useRef(document.createElement('div'));
	const cellphoneInput = useRef(document.createElement('div'));
	const docInput = useRef(document.createElement('div'));
	const stateInput = useRef(document.createElement('div'));
	const cityInput = useRef(document.createElement('div'));
	const neighborhoodInput = useRef(document.createElement('div'));
	const birthInput = useRef(document.createElement('div'));

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
				console.log(response);
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
					setCity('');
				} else {
					setSelect[tipoEstadoCidade]([]);
				}
			});
	};

	const sendForm = () => {
		if (name === '') {
			toast.error('Informe o nome da empresa.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			nameInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (cellPhone === '') {
			toast.error('Número de celular não informado.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			cellphoneInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (cellPhone.length !== 15) {
			toast.error('Número de celular inválido.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			cellphoneInput.current.scrollIntoView({ behavior: 'smooth' });
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
		} else if (typeDocument === '') {
			toast.error('Favor selecione o tipo de documento.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			docInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (typeDocument === 'CPF' && cpf === '') {
			toast.error('CPF não informado.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			docInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (typeDocument === 'CPF' && cpf.length !== 14) {
			toast.error('CPF inválido.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			docInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (typeDocument === 'CNPJ' && cnpj === '') {
			toast.error('CNPJ não informado.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			docInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (typeDocument === 'CNPJ' && cnpj.length !== 18) {
			toast.error('CNPJ inválido.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			docInput.current.scrollIntoView({ behavior: 'smooth' });
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
		} else {
			const formDataJson = {
				profile: {
					nickname: name,
					phone: cellPhone,
					birth,
					category_id: categoria1,
					document: typeDocument === 'CNPJ' ? cnpj : cpf,
					info: '0',
				},
				address: {
					state,
					city,
					neighborhood,
				},
				// images: filesFotos,
				// video: filesVideos
			};

			const formData = jsonToFormData(formDataJson);

			setShowLoading(true);

			axios
				.post(urlEndpointCreatePerfilPartner, formData, {
					headers: {
						Authorization: `Bearer ${token}`,
						// 'Content-Type': 'multipart/form-data',
					},
				})
				.then(function (response: typeResponseAxios) {
					setShowLoading(false);

					if (
						response.status === 201 ||
						response.status === 200 ||
						response.status === 204
					) {
						history.push('/new-publication');
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
		setSelectsAxiosIbge('estados');

		axios.get(urlEndpointCategories).then(response => {
			const categories: any = [];
			response.data.data.forEach((categoria: any) => {
				categories.push({ label: categoria.name, value: categoria.id });
			});
			setCategoriaSelect(categories);
		});
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
			<div className="px-20px py-5">
				<div className="grid grid-cols-1 gap-2">
					<div className="bloco-nome-da-empresa" ref={nameInput}>
						<Input
							name="nome-da-empresa"
							type="text"
							placeholder="Nome da empresa"
							value={name}
							onChange={(
								e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
							) => {
								setName((e.target as HTMLInputElement).value);
							}}
						/>
					</div>
					<div ref={cellphoneInput}>
						<InputMask
							className={'form-input'}
							name={'n_cellphone'}
							type={'tel'}
							placeholder={'Celular'}
							value={cellPhone}
							mask="(99) 99999-9999"
							maskChar=""
							onChange={(
								e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
							) => {
								setCellPhone((e.target as HTMLInputElement).value);
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
					<div ref={docInput}>
						<Input
							name="documento"
							type="select"
							placeholder="Selecione Documento"
							valueSelect={documentSelect}
							onChange={(e: React.FormEvent<HTMLInputElement>) => {
								setTypeDocument((e.target as HTMLSelectElement).value);
							}}
							value={state}
						/>
					</div>
					{typeDocument === 'CPF' ? (
						<div className="bloco-cpf">
							<InputMask
								className={'form-input'}
								name={'cpf'}
								type={'text'}
								placeholder={'Digite seu CPF'}
								value={cpf}
								mask="999.999.999-99"
								maskChar=""
								onChange={(
									e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
								) => {
									setCpf((e.target as HTMLInputElement).value);
								}}
							/>
						</div>
					) : (
						''
					)}
					{typeDocument === 'CNPJ' ? (
						<div className="bloco-cnpj">
							<InputMask
								className={'form-input'}
								name={'cnpj'}
								type={'text'}
								placeholder={'Digite seu CNPJ'}
								value={cnpj}
								mask="99.999.999/9999-99"
								maskChar=""
								onChange={(
									e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
								) => {
									setCnpj((e.target as HTMLInputElement).value);
								}}
							/>
						</div>
					) : (
						''
					)}
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
			<div className="pb-20" />
			<div className="footer-register">
				<button
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

export default CreatePerfilPartner;

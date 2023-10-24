/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import Input from '../../components/Input/Input';
import InputRange from '../../components/InputRange/InputRange';
import { createPerfilAcompanhante1, endpointState } from '../../recoil/atoms';

const UpdatePerfil: React.FC<RouteComponentProps> = ({ history }) => {
	type typeResponseAxios = {
		[key: string]: any;
	};

	type selectValues = {
		label: string;
		value: string;
	}[];

	const sendTo = '/update-perfil-2';

	const setCreatePerfilAcompanhante1 = useSetRecoilState(
		createPerfilAcompanhante1,
	);

	const { urlEndpoint } = useRecoilValue(endpointState);

	const urlAcompanhante = `${urlEndpoint}/api/account`;

	const urlEndpointBreasts = `${urlEndpoint}/api/profile/breasts/list`;
	const urlEndpointEyes = `${urlEndpoint}/api/profile/eyes/list`;
	const urlEndpointHair = `${urlEndpoint}/api/profile/hair/list`;
	const urlEndpointSkinColor = `${urlEndpoint}/api/profile/skin-color/list`;

	const [breasts, setBreasts] = useState<selectValues>([
		{ label: '', value: '' },
	]);
	const [eyes, setEyes] = useState<selectValues>([{ label: '', value: '' }]);
	const [hair, setHair] = useState<selectValues>([{ label: '', value: '' }]);
	const [skinColor, setSkinColor] = useState<selectValues>([
		{ label: '', value: '' },
	]);

	const [name, setName] = useState('');
	const [whatsApp, setWhatsApp] = useState('');
	const [gender, setGender] = useState('');
	const [height, setHeight] = useState<number[]>([1.6]);
	const [eyesValue, setEyesValue] = useState('');
	const [weight, setWeight] = useState<number[]>([60]);
	const [clothingSize, setClothingSize] = useState<number[]>([40]);
	const [footSize, setFootSize] = useState<number[]>([40]);
	const [skinColorValue, setSkinColorValue] = useState('');
	const [hairValue, setHairValue] = useState('');
	const [breastsValue, setBreastsValue] = useState('');
	const [info, setInfo] = useState('');
	const [birth, setBirth] = useState('');

	const nameInput = useRef(document.createElement('div'));
	const whatsappInput = useRef(document.createElement('div'));
	const genderInput = useRef(document.createElement('div'));
	const eyesInput = useRef(document.createElement('div'));
	const skinColorInput = useRef(document.createElement('div'));
	const hairInput = useRef(document.createElement('div'));
	const breastsInput = useRef(document.createElement('div'));
	const infoInput = useRef(document.createElement('div'));
	const birthInput = useRef(document.createElement('div'));

	const token = localStorage.getItem('token');

	useEffect(() => {
		axios
			.get(urlAcompanhante, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(response => {
				if (response.status === 200) {
					setName(response.data.profile?.nickname);
					setWhatsApp(response.data.profile?.whatsapp);
					setInfo(response.data.profile?.info);
					setBirth(response.data.profile?.birth);
					setGender(response.data.profile?.gender);
					setHairValue(response.data.profile?.hair?.id);
					setEyesValue(response.data.profile?.eyes?.id);
					setBreastsValue(response.data.profile?.breasts?.id);
					setSkinColorValue(response.data.profile?.skin_color?.id);
					setHeight([response.data.profile?.height]);
					setWeight([response.data.profile?.weight]);
					setClothingSize([response.data.profile?.clothing_size]);
					setFootSize([response.data.profile?.foot_size]);
					setInfo(response.data.profile?.info);
				}
			});
	}, []);

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
							value: element.id,
						});
					});

					setSelect(newValue);
				}
			});
	};

	const sendForm = () => {
		if (name === '' && name.length < 3) {
			toast.error(
				'Informe como deseja ser chamado, deve conter no minímo 3 caracteres.',
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
		} else if (gender === '' || gender === 'Como quer ser identificado(a)?') {
			toast.error('Informe como deseja ser identificado(a).', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			genderInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (eyesValue === '') {
			toast.error('Favor informe a cor de seus olhos.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			eyesInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (skinColorValue === '' || skinColorValue === 'Cor da pele') {
			toast.error('Favor informe a cor de sua pele.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			skinColorInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (hairValue === '' || hairValue === 'Cabelo') {
			toast.error('Favor informe a cor de seu cabelo.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			hairInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (
			(gender === 'mulher' && breastsValue === 'Seios') ||
			(gender === 'mulher' && breastsValue === '')
		) {
			toast.error('Favor preencha o campo seios.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			breastsInput.current.scrollIntoView({ behavior: 'smooth' });
		} else if (info === '') {
			toast.error('Favor fale um pouco sobre você.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			infoInput.current.scrollIntoView({ behavior: 'smooth' });
		} else {
			setCreatePerfilAcompanhante1({
				name,
				profile: {
					nickname: name,
					whatsApp,
					gender,
					height: height[0].toString(),
					eyes: eyesValue,
					weight: weight[0].toString(),
					clothingSize: clothingSize[0].toString(),
					footSize: footSize[0].toString(),
					skinColor: skinColorValue,
					hair: hairValue,
					breasts: breastsValue,
					info,
					birth,
				},
			});
			history.push(sendTo);
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
		setSelectsAxios(urlEndpointBreasts, setBreasts);
		setSelectsAxios(urlEndpointEyes, setEyes);
		setSelectsAxios(urlEndpointHair, setHair);
		setSelectsAxios(urlEndpointSkinColor, setSkinColor);
	}, []);

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Atulize perfil
					<Link to={'/perfil'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="body-register pt-5">
				<div className="text-adicione-info mb-4">
					Atualize informações sobre Você, ok (:
				</div>
				<div className="text-passos mb-7">Passo 1 de 2</div>
				<div className="mb-4" ref={nameInput}>
					<Input
						name={'nome_chamado'}
						type={'text'}
						placeholder={'Como quer ser chamado(a)?'}
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
				<div className="mb-4" ref={birthInput}>
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
				<div className="mb-4" ref={genderInput}>
					<Input
						name="como_indetifico"
						type="select"
						placeholder="Como quer ser identificado(a)?"
						valueSelect={[
							{ label: 'Mulher', value: 'mulher' },
							{ label: 'Homem', value: 'homem' },
							{ label: 'Trans', value: 'trans' },
						]}
						value={gender}
						onChange={(e: React.FormEvent<HTMLSelectElement>) => {
							setGender((e.target as HTMLSelectElement).value);
						}}
					/>
				</div>
				<div className="mb-4" ref={eyesInput}>
					<Input
						name="olhos"
						type="select"
						placeholder="Olhos"
						valueSelect={eyes}
						value={eyesValue}
						onChange={(e: React.FormEvent<HTMLSelectElement>) => {
							setEyesValue((e.target as HTMLSelectElement).value);
						}}
					/>
				</div>
				<div className="mb-4" ref={skinColorInput}>
					<Input
						name="cor_pele"
						type="select"
						placeholder="Cor da pele"
						valueSelect={skinColor}
						value={skinColorValue}
						onChange={(e: React.FormEvent<HTMLSelectElement>) => {
							setSkinColorValue((e.target as HTMLSelectElement).value);
						}}
					/>
				</div>
				<div className="mb-4" ref={hairInput}>
					<Input
						name="cabelo"
						type="select"
						placeholder="Cabelo"
						valueSelect={hair}
						value={hairValue}
						onChange={(e: React.FormEvent<HTMLSelectElement>) => {
							setHairValue((e.target as HTMLSelectElement).value);
						}}
					/>
				</div>
				{gender === 'mulher' ? (
					<div className="mb-4" ref={breastsInput}>
						<Input
							name="seios"
							type="select"
							placeholder="Seios"
							valueSelect={breasts}
							value={breastsValue}
							onChange={(e: React.FormEvent<HTMLSelectElement>) => {
								setBreastsValue((e.target as HTMLSelectElement).value);
							}}
						/>
					</div>
				) : (
					''
				)}
				<div className="mb-4">
					<label className="label-campo">Altura</label>
					<InputRange
						rtl={false}
						step={0.01}
						min={1.4}
						max={2.1}
						values={height}
						setValues={setHeight}
						toFixed={2}
						strSuffixValue="m"
					/>
				</div>
				<div className="mb-4">
					<label className="label-campo">Peso</label>
					<InputRange
						rtl={false}
						step={1}
						min={45}
						max={120}
						values={weight}
						setValues={setWeight}
						toFixed={0}
						strSuffixValue="Kg"
					/>
				</div>
				<div className="mb-4">
					<label className="label-campo">Manequim</label>
					<InputRange
						rtl={false}
						step={1}
						min={34}
						max={48}
						values={clothingSize}
						setValues={setClothingSize}
						toFixed={0}
					/>
				</div>
				<div className="mb-4">
					<label className="label-campo">Tamanho do pé</label>
					<InputRange
						rtl={false}
						step={1}
						min={34}
						max={48}
						values={footSize}
						setValues={setFootSize}
						toFixed={0}
					/>
				</div>
				<div className="mb-4" ref={infoInput}>
					<Input
						name={'fale_sobre_voce'}
						type={'textarea'}
						label={'Fale um pouco sobre você'}
						placeholder={'Escreva seu texto aqui….'}
						value={info}
						onChange={(
							e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
						) => {
							setInfo((e.target as HTMLInputElement).value);
						}}
					/>
				</div>
			</div>
			<div className="footer-register">
				<button
					type="button"
					onClick={sendForm}
					className="block w-full p-2 rounded-full text-center bg-white"
				>
					Próximo
				</button>
			</div>
		</div>
	);
};

export default UpdatePerfil;

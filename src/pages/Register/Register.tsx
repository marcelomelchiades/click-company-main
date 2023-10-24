import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, RouteComponentProps, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { endpointState, typeCreatePerfil } from '../../recoil/atoms';

import CheckboxMobile from '../../components/CheckboxMobile/CheckboxMobile';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
	type typeResponseAxios = {
		[key: string]: any;
	};

	const { urlEndpoint } = useRecoilValue(endpointState);
	const urlEndpointCreateUser = `${urlEndpoint}/register`;

	const [disableFields, setDisableFields] = useState(false);

	const [showRequiredBallon, setShowRequiredBallon] = useState(false);

	const [permanecerLogado, setPermanecerLogado] = useState(false);

	const [aceitarNotificacoes, setAceitarNotificacoes] = useState(false);

	const [showLoading, setShowLoading] = useState(false);

	const [termosCondicoes, setTermosCondicoes] = useState(false);

	const [nome, setNome] = useState({
		value: '',
		required: true,
	});

	const [email, setEmail] = useState({
		value: '',
		required: true,
	});

	const [senha, setSenha] = useState({
		value: '',
		required: true,
	});

	const [senhaconfirmacao, setSenhaConfirmacao] = useState({
		value: '',
		required: true,
	});

	const [AtomTypeCreatePerfil, setAtomTypeCreatePerfil] =
		useRecoilState(typeCreatePerfil);

	const location = useLocation();

	let continueLink = '/documents';
	let userTypeId = 2;

	if (location.pathname === '/register') {
		continueLink = '/documents';
		userTypeId = 2;
	} else if (location.pathname === '/register-partner') {
		continueLink = '/documents';
		userTypeId = 5;
	} else if (location.pathname === '/register-swing') {
		continueLink = '/documents';
		userTypeId = 3;
	} else if (location.pathname === '/register-close-friends') {
		continueLink = '/documents';
		userTypeId = 4;
	}

	const limpaCampos = () => {
		setNome({
			value: '',
			required: nome.required,
		});
		setEmail({
			value: '',
			required: email.required,
		});
		setSenha({
			value: '',
			required: senha.required,
		});
		setSenhaConfirmacao({
			value: '',
			required: senhaconfirmacao.required,
		});

		setShowRequiredBallon(false);
	};

	const handleCadastrar = (e: any) => {
		e.preventDefault();

		setShowRequiredBallon(true);

		if (!termosCondicoes) {
			toast.error(
				'Você deve aceitar os termos e condições para se cadastrar.',
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
		} else if (nome.value === '') {
			toast.error('Erro ao cadastrar. Nome não informado.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		} else if (email.value === '' || !validateEmail(email.value)) {
			toast.error('Erro ao cadastrar. E-mail não informado ou inválido.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		} else if (senha.value !== senhaconfirmacao.value) {
			toast.error('Erro ao cadastrar. As senhas devem ser iguais.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		} else if (
			senha.value === senhaconfirmacao.value &&
			senha.value.length < 6
		) {
			toast.error('Erro ao cadastrar. A senha deve ter 6 ou mais digitos.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		} else {
			setDisableFields(true);
			setShowLoading(true);

			axios
				.post(
					urlEndpointCreateUser,
					{
						user_type_id: userTypeId,
						name: nome.value,
						email: email.value,
						password: senha.value,
						password_confirmation: senhaconfirmacao.value,
						options: {
							sms: 1,
						},
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				)
				.then(function (response: typeResponseAxios) {
					if (response.status === 201) {
						localStorage.setItem('token', response.data.access_token);
						localStorage.setItem('user_type', userTypeId.toString());
						localStorage.setItem('perfilCreate', '0');

						history.push(continueLink);
					}
					setShowLoading(false);
				})
				.catch(function (error) {
					const errosServidor = error.response.data.errors;

					if (
						typeof errosServidor.email !== typeof undefined &&
						errosServidor.email[0] === 'The email has already been taken.'
					) {
						toast.error('O e-mail escolhido já está sendo utilizado.', {
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
							'Erro ao cadastrar. Verifique os campos obrigatórios e tente novamente.',
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

					setDisableFields(false);
					setShowLoading(false);
				});
		}
	};

	function validateEmail(emailTest: string) {
		const re =
			// eslint-disable-next-line
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(emailTest);
	}

	useEffect(() => {
		if (location.pathname === '/register') {
			setAtomTypeCreatePerfil({
				typePerfil: 'acompanhante',
			});
		} else if (location.pathname === '/register-partner') {
			setAtomTypeCreatePerfil({
				typePerfil: 'partner',
			});
		} else if (location.pathname === '/register-swing') {
			setAtomTypeCreatePerfil({
				typePerfil: 'swing',
			});
		} else if (location.pathname === '/register-close-friends') {
			setAtomTypeCreatePerfil({
				typePerfil: 'close-friends',
			});
		}
	}, []);

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Criar Conta
					<Link to={'/login'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="body-register">
				<div className="mb-4">
					<Input
						name={'nome'}
						type={'text'}
						placeholder={'Nome'}
						onChange={(e: React.FormEvent<HTMLInputElement>) =>
							setNome({
								value: e.currentTarget.value,
								required: nome.required,
							})
						}
						value={nome.value}
						required={nome.required}
						disabled={disableFields}
					/>
				</div>
				<div className="mb-4">
					<Input
						name={'email'}
						type={'email'}
						placeholder={'E-mail'}
						onChange={(e: React.FormEvent<HTMLInputElement>) =>
							setEmail({
								value: e.currentTarget.value,
								required: email.required,
							})
						}
						value={email.value}
						required={email.required}
						disabled={disableFields}
					/>
				</div>
				<div className="mb-4">
					<Input
						name={'password'}
						type={'password'}
						placeholder={'Senha'}
						descricaoCampo={'Sua senha deve ter no mínimo 6 caracteres.'}
						onChange={(e: React.FormEvent<HTMLInputElement>) =>
							setSenha({
								value: e.currentTarget.value,
								required: senha.required,
							})
						}
						value={senha.value}
						required={senha.required}
						disabled={disableFields}
					/>
				</div>
				<div className="mb-6">
					<Input
						name={'passwordConfirmation'}
						type={'password'}
						placeholder={'Confirme a senha'}
						descricaoCampo={'Sua senha deve ter no mínimo 6 caracteres.'}
						onChange={(e: React.FormEvent<HTMLInputElement>) =>
							setSenhaConfirmacao({
								value: e.currentTarget.value,
								required: senhaconfirmacao.required,
							})
						}
						value={senhaconfirmacao.value}
						required={senhaconfirmacao.required}
						disabled={disableFields}
					/>
				</div>
				<hr className={'mb-6'} />
				<div className="mb-3">
					<CheckboxMobile
						label={'Permanecer logado'}
						isChecked={permanecerLogado}
						onClick={() => setPermanecerLogado(!permanecerLogado)}
					/>
				</div>
				{/* <hr className="mb-3" />
				<div className="mb-3">
					<CheckboxMobile
						label={'Aceitar notificações por sms'}
						isChecked={aceitarNotificacoes}
						onClick={() => setAceitarNotificacoes(!aceitarNotificacoes)}
					/>
				</div> */}
				<hr className="mb-3" />
				<div className="mb-12">
					<CheckboxMobile
						label={'Eu aceito os termos'}
						descricaoCampo={'Termos e condições'}
						isChecked={termosCondicoes}
						onClick={() => setTermosCondicoes(!termosCondicoes)}
					/>
				</div>
			</div>
			<div className="footer-register">
				<button
					type="submit"
					onClick={handleCadastrar}
					className="block w-full p-2 rounded-full text-center bg-white"
					disabled={disableFields}
				>
					Continuar
				</button>
			</div>
			<Loading showLoading={showLoading} />
		</div>
	);
};

export default Register;

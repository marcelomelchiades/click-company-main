import axios from 'axios';
import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { handleInputChange } from 'react-select/src/utils';
import { useRecoilValue } from 'recoil';
import Input from '../../components/Input/Input';

import Logo from '../../components/Logo/Logo';
import { endpointState } from '../../recoil/atoms';
import Loading from '../../components/Loading/Loading';

const LoginHasAccount: React.FC<RouteComponentProps> = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [errorMessageEmail, setErrorMessageEmail] = useState('');
	const [errorMessagePassword, setMessagePassword] = useState('');
	const [errorLogin, setErrorLogin] = useState('');
	const [showLoading, setShowLoading] = useState(false);

	let emailIsValid: boolean;
	let passwordIsValid: boolean;

	const { urlEndpoint } = useRecoilValue(endpointState);

	const urlEndpointLogin = `${urlEndpoint}/auth`;
	const urlAccount = `${urlEndpoint}/api/account`;

	function loginAccount() {
		checkInputEmail(email);
		checkPassword(password);

		if (emailIsValid && passwordIsValid) {
			setShowLoading(true);
			axios
				.post(urlEndpointLogin, {
					username: email,
					password,
				})
				.then(response => {
					setShowLoading(false);
					if (response.data?.access_token !== '') {
						axios
							.get(urlAccount, {
								headers: {
									Authorization: `Bearer ${response.data?.access_token}`,
								},
							})
							.then(responseAccount => {
								// console.log(responseAccount.data.kyc);
								if (responseAccount.data.user_type !== 1) {
									setErrorLogin('');
									localStorage.setItem('token', response.data.access_token);
									localStorage.setItem(
										'user_type',
										responseAccount.data.user_type,
									);
									if (
										responseAccount.data.profile !== null &&
										responseAccount.data.kyc !== null &&
										responseAccount.data.kyc !== 'pending'
									) {
										localStorage.setItem('perfilCreate', '1');
										localStorage.setItem('kyc', 'okay');

										if (responseAccount.data.user_type === 2) {
											history.push('/home-companions');
										} else if (responseAccount.data.user_type === 3) {
											history.push('/home-swing');
										} else if (responseAccount.data.user_type === 4) {
											history.push('/home-close-friends');
										} else if (responseAccount.data.user_type === 5) {
											history.push('/home-partners');
										}
									} else if (responseAccount.data.kyc === null) {
										localStorage.setItem('perfilCreate', '0');
										// localStorage.setItem('kyc', null);
										history.push('/documents');
									} else if (
										responseAccount.data.kyc === 'pending' &&
										responseAccount.data.profile !== null
									) {
										localStorage.setItem('perfilCreate', '1');
										localStorage.setItem('kyc', 'pending');

										if (responseAccount.data.user_type === 2) {
											history.push('/home-companions');
										} else if (responseAccount.data.user_type === 3) {
											history.push('/home-swing');
										} else if (responseAccount.data.user_type === 4) {
											history.push('/home-close-friends');
										} else if (responseAccount.data.user_type === 5) {
											history.push('/home-partners');
										}
									} else if (
										responseAccount.data.kyc === 'pending' &&
										responseAccount.data.profile === null
									) {
										localStorage.setItem('perfilCreate', '0');
										localStorage.setItem('kyc', 'pending');

										if (responseAccount.data.user_type === 2) {
											history.push('/home-companions');
										} else if (responseAccount.data.user_type === 3) {
											history.push('/home-swing');
										} else if (responseAccount.data.user_type === 4) {
											history.push('/home-close-friends');
										} else if (responseAccount.data.user_type === 5) {
											history.push('/home-partners');
										}
									} else if (
										responseAccount.data.kyc === null &&
										responseAccount.data.profile === null
									) {
										localStorage.setItem('perfilCreate', '0');
										// localStorage.setItem('kyc', null);
										history.push('/documents');
									} else if (
										responseAccount.data.kyc === null &&
										responseAccount.data.profile !== null
									) {
										localStorage.setItem('perfilCreate', '1');
										// localStorage.setItem('kyc', null);

										if (responseAccount.data.user_type === 2) {
											history.push('/home-companions');
										} else if (responseAccount.data.user_type === 3) {
											history.push('/home-swing');
										} else if (responseAccount.data.user_type === 4) {
											history.push('/home-close-friends');
										} else if (responseAccount.data.user_type === 5) {
											history.push('/home-partners');
										}
									}
								} else {
									setErrorLogin('E-mail ou senha incorreta');
								}
							});
					} else setErrorLogin('E-mail ou senha incorreta');
				})
				.catch(error => {
					setErrorLogin('E-mail ou senha incorreta');
					setShowLoading(false);
				});
		}
	}

	function handleEmail(event: any) {
		setEmail(event.target.value);
	}

	function handlePassword(event: any) {
		setPassword(event.target.value);
	}

	function checkInputEmail(element: string) {
		if (!validateEmail(element) || element === '') {
			setErrorMessageEmail('E-mail inváldio');

			emailIsValid = false;
		} else if (validateEmail(element)) {
			setErrorMessageEmail('');

			emailIsValid = true;
		}
	}

	function validateEmail(emailTest: string) {
		const re =
			// eslint-disable-next-line
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(emailTest);
	}

	function checkPassword(element: string) {
		if (element.length < 6 || element === '') {
			setMessagePassword('Senha inválida');

			passwordIsValid = false;
		} else {
			setMessagePassword('');

			passwordIsValid = true;
		}
	}

	function loginEnter(event: any) {
		if (event.key === 'Enter') {
			loginAccount();
		}
	}

	return (
		<div>
			<div className="background-color-413872">
				<div className="text-center logo-login-has-account pt-8 pb-14">
					<Logo logoType={'white vertical'} classes={'inline'} />
				</div>
			</div>
			<div className="body-register">
				<div className="mt-8 text-center">
					<h2 className="descricao-home font-semibold text-color-413872">
						Feliz em te ver (:
					</h2>
				</div>
				<div className="mt-8">
					<Input
						name={'email_user'}
						type={'email'}
						placeholder={'E-mail'}
						value={email}
						onChange={(event: any) => handleEmail(event)}
						onKeyPress={(event: any) => loginEnter(event)}
					/>
					<span className="ErrorLogin">{errorMessageEmail}</span>
				</div>
				<div>
					<Input
						name={'senha_user'}
						type={'password'}
						placeholder={'Senha'}
						value={password}
						onChange={(event: any) => handlePassword(event)}
						onKeyPress={(event: any) => loginEnter(event)}
					/>
					<span className="ErrorLogin">{errorMessagePassword}</span>
				</div>
				<div className="mt-2 text-right">
					<Link
						to={'/reset'}
						className="text-color-575757 font-size-13px"
					>
						Esqueci senha
					</Link>
				</div>
				<div>
					<span className="ErrorLogin">{errorLogin}</span>
				</div>
				<div className="mt-12">
					<button
						type="button"
						className="text-17px block w-full p-2 rounded-full text-center background-color-FF4767 text-white"
						onClick={() => loginAccount()}
						onKeyDown={() => loginAccount()}
					>
						Entrar
					</button>
				</div>
				<div className="mt-8 text-center">
					<p className="font-size-13px text-color-413872 ">
						É novo aqui?
						<Link to={'/login'} className="descricao-campo-checkbox-mobile">
							{' '}
							Crie sua conta
						</Link>
					</p>
				</div>
			</div>
			<Loading showLoading={showLoading} />
		</div>
	);
};

export default LoginHasAccount;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { handleInputChange } from 'react-select/src/utils';
import { useRecoilValue } from 'recoil';
import Input from '../../components/Input/Input';

import Logo from '../../components/Logo/Logo';
import { endpointState } from '../../recoil/atoms';
import Loading from '../../components/Loading/Loading';

const Reset: React.FC<RouteComponentProps> = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [token, setToken] = useState('');

	const [errorMessageEmail, setErrorMessageEmail] = useState('');
	const [errorMessagePassword, setMessagePassword] = useState('');
	const [errorLogin, setErrorLogin] = useState('');
	const [showLoading, setShowLoading] = useState(false);

	let emailIsValid: boolean;
	let passwordIsValid: boolean;

	const { urlEndpoint } = useRecoilValue(endpointState);

	const urlEndpointLogin = `${urlEndpoint}/api/password/reset`;
	const urlAccount = `${urlEndpoint}/api/account`;


	useEffect( () => {
		const url = window.location.href.match(/\/reset-password\/(\w+)/)?.[1] || ''
		setToken(url)
	},[token])

	function loginAccount() {
		checkInputEmail(email);

		if (emailIsValid) {
			setShowLoading(true);
			axios
				.post(urlEndpointLogin, {
					'email': email,
					'password': password,
					'password_confirmation': confirmPassword,
					'token': token
				})
				.then(response => {
					setShowLoading(false);
					window.alert("Sua senha foi auterado com sucesso");
					window.location.href = '/'
				})
				.catch(error => {
					setErrorLogin(error.email?.[0]);
					setPassword(error.password?.[0]);
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

	function handleConfirmaPassword(event: any) {
		setConfirmPassword(event.target.value);
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
						Preencha o formulário abaixo para resetar sua senha
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
					<span className="ErrorLogin">{errorLogin}</span>
				</div>
				<div className="mt-8">
					<Input 
						name={'password'}
						type={'password'}
						placeholder={'Senha'}
						value={password}
						onChange={(event: any) => handlePassword(event)}
						onKeyPress={(event: any) => handlePassword(event)}
					/>
					<span className="ErrorLogin">{errorMessagePassword}</span>
				</div>
				<div>
					<span className="ErrorLogin">{errorLogin}</span>
				</div>
				<div className="mt-8">
					<Input
						name={'passwordConfirm'}
						type={'password'}
						placeholder={'Confirmar senha'}
						value={confirmPassword}
						onChange={(event: any) => handleConfirmaPassword(event)}
						onKeyPress={(event: any) => handleConfirmaPassword(event)}
					/>
					<span className="ErrorLogin">{errorMessagePassword}</span>
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
						Resetar
					</button>
				</div>
				<div className="mt-8 text-center">
					<p className="font-size-13px text-color-413872 ">
						<Link to={'/login'} className="descricao-campo-checkbox-mobile">
							Voltar
						</Link>
					</p>
				</div>
			</div>
			<Loading showLoading={showLoading} />
		</div>
	);
};

export default Reset;

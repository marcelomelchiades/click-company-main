import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import CheckboxMobile from '../../components/CheckboxMobile/CheckboxMobile';
import Input from '../../components/Input/Input';

const PerfilData: React.FC = () => {
	const [permanecerLogado, setPermanecerLogado] = useState(false);
	const [aceitarNotificacoes, setAceitarNotificacoes] = useState(false);
	const [termosCondicoes, setTermosCondicoes] = useState(false);

	const location = useLocation();

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Meus Dados
					<Link to={'/perfil'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="body-register">
				<div className="mb-4">
					<Input name={'nome'} type={'text'} placeholder={'Nome'} />
				</div>
				<div className="mb-4">
					<Input name={'email'} type={'email'} placeholder={'E-mail'} />
				</div>
				<div className="mb-4">
					<Input name={'cpf'} type={'text'} placeholder={'CPF'} />
				</div>
				<div>
					<Input name={'telefone'} type={'text'} placeholder={'Telefone'} />
				</div>

				<span className={'descricao-campo-checkbox-mobile'}>
					<br />
					{'Alterar Senha'}
				</span>

				<div className="mb-3 mt-6">
					<CheckboxMobile
						label={'Permanecer logado'}
						isChecked={permanecerLogado}
						onClick={() => setPermanecerLogado(!permanecerLogado)}
					/>
				</div>
				<hr className="mb-3" />
				<div className="mb-3">
					<CheckboxMobile
						label={'Aceitar notificações por sms'}
						isChecked={aceitarNotificacoes}
						onClick={() => setAceitarNotificacoes(!aceitarNotificacoes)}
					/>
				</div>
				<hr className="mb-3" />
			</div>
			<div className="footer-register">
				<Link
					to={'/perfil'}
					className="block w-full p-2 rounded-full text-center bg-white"
				>
					Alterar
				</Link>
			</div>
		</div>
	);
};

export default PerfilData;

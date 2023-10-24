import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import avatarClickCompany from '../../assets/images/avatar-click-company.png';
import Input from '../../components/Input/Input';

const Help: React.FC = () => {
	return (
		<div className="bg-white">
			<div className="cabecalho-help text-center">
				<p>
					Atendimento
					<Link to={'/perfil'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="todas-mensagens-help background-color-F4F4F8 px-20px">
				<div className="flex items-end bloco-mensagem-usuario my-4">
					<div className="avatar-usuario">
						<img src={avatarClickCompany} alt="" />
					</div>
					<div className="mensagem-usuario">
						Olá Geovani! Como posso Te ajudar?
					</div>
				</div>
				<div className="flex items-end bloco-minha-mensagem-usuario my-4">
					<div className="mensagem-usuario">
						Olá, boa tarde! Não estou conseguindo colocar foto no meu perfil
					</div>
				</div>
				<div className="flex items-end bloco-mensagem-usuario my-4">
					<div className="avatar-usuario">
						<img src={avatarClickCompany} alt="" />
					</div>
					<div className="mensagem-usuario">
						Olá Geovani, o que diz quando você tente inserir a imagem?
					</div>
				</div>
			</div>
			<div className="enviar-mensagem-fixo-bottom">
				<Input
					type={'text'}
					name={'envia-mensagem-ajuda'}
					placeholder={'Envie uma mensagem...'}
				/>
				<button type="button" className="btn-envia-mensagem">
					<i className="fas fa-paper-plane" />
				</button>
			</div>
		</div>
	);
};

export default Help;

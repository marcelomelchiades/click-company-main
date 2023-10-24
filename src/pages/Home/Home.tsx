import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Logo from '../../components/Logo/Logo';

const Home: React.FC = () => {
	const history = useHistory();
	const goToLogin = () => history.push('/login');

	// setTimeout(() => goToLogin(), 3000);

	return (
		<div className="fundo-degrade-azul-roxo">
			<div className="conteudo-home">
				<div className="text-center logo-home mb-12">
					<Logo logoType={'white vertical'} classes={'inline'} />
				</div>
				<div className="pergunta-idade">
					<div className="container-pergunta">
						<h1>Você é maior de 18 anos?</h1>
						<div className="resposta-idade">
							<a href="https://www.google.com/"><p>Não</p></a>
							<Link to={'/login'}>
								<p className="padding-button-pergunta">Sim</p>
							</Link>
						</div>
					</div>
				</div>
				<div className="text-white text-center descricao-home">
					<p className="font-bold">Viva nova Experiências</p>
					<p className="font-light">Encontre uma companhia no seu estilo</p>
				</div>
			</div>
		</div>
	);
};

export default Home;

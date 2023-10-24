/* eslint-disable indent */
import React, { useState, useRef, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { toast } from 'react-toastify';
import PacketCard from '../../components/PacketCard/PacketCard';
import {
	endpointState,
	selectedPlan,
	typeCreatePerfil,
} from '../../recoil/atoms';
import Loading from '../../components/Loading/Loading';

const Packets: React.FC<RouteComponentProps> = ({ history }) => {
	type typeResponseAxios = {
		[key: string]: any;
	};

	const { typePerfil } = useRecoilValue(typeCreatePerfil);

	const { urlEndpoint } = useRecoilValue(endpointState);

	const urlEndpointPackets = `${urlEndpoint}/api/system/products_user_type`;

	const [showLoading, setShowLoading] = useState(true);
	const [fullShowLoading, setFullShowLoading] = useState(false);

	const setSelectedPlan = useSetRecoilState(selectedPlan);
	const [esconderVantagemPremium, setEsconderVantagemPremium] = useState('');

	const [idPlanoSelecionado, setIdPlanoSelecionado] = useState(-1);
	const [idTipoPlano, setIdTipoPlano] = useState(0);

	const planChoosed = useRef(document.createElement('div'));

	const userType = localStorage.getItem('user_type');

	const [premium, setPremium] = useState<any>([]);
	const [basic, setBasic] = useState<any>([]);

	const [typePlan, setTypePlan] = useState('');

	const token = localStorage.getItem('token');

	useEffect(() => {
		axios
			.get(`${urlEndpointPackets}/${userType}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(function (response: typeResponseAxios) {
				const planDataPremium: any = [];
				const planDataBasic: any = [];
				response.data.forEach((data: any, index: number) => {
					let bonusPacket;
					let descriptionPacket;
					let month;
					setShowLoading(false);
					if (userType === '2') {
						if (data.type_name === 'Básico') {
							if (data.free_days === 0) {
								bonusPacket = '-';
								descriptionPacket = `Plano Básico (${data.days} dias)`;
							} else {
								bonusPacket = `Ganha ${data.free_days} dia de bônus`;
								descriptionPacket = `Plano Básico (${data.days} dias + ${data.free_days} dia bônus)`;
							}

							planDataBasic.push({
								id: data.id,
								days: `${data.days} dias`,
								labelPreco: data.amount / 100,
								labelBonus: bonusPacket,
								description: descriptionPacket,
							});
						} else if (data.type_name === 'Premium') {
							if (data.free_days === 0) {
								bonusPacket = '-';
								descriptionPacket = `Plano Premium (${data.days} dias)`;
							} else {
								bonusPacket = `Ganha ${data.free_days} dia de bônus`;
								descriptionPacket = `Plano Premium (${data.days} dias + ${data.free_days} dia bônus)`;
							}

							planDataPremium.push({
								id: data.id,
								days: `${data.days} dias`,
								labelPreco: data.amount / 100,
								labelBonus: bonusPacket,
								description: descriptionPacket,
							});
						}
					}
					if (userType === '3') {
						if (data.days === 30) {
							descriptionPacket = `Plano Premium (${data.days / 30} mês)`;
							month = `${data.days / 30} mês`;
						} else {
							descriptionPacket = `Plano Premium (${data.days / 30} meses)`;
							month = `${data.days / 30} meses`;
						}

						planDataPremium.push({
							id: data.id,
							days: month,
							labelPreco: data.amount / 100,
							labelBonus: bonusPacket,
							description: descriptionPacket,
						});
					}
					if (userType === '4') {
						if (data.days === 30) {
							descriptionPacket = `Plano Premium (${data.days / 30} mês)`;
							month = `${data.days / 30} mês`;
						} else {
							descriptionPacket = `Plano Premium (${data.days / 30} meses)`;
							month = `${data.days / 30} meses`;
						}

						planDataPremium.push({
							id: data.id,
							days: month,
							labelPreco: data.amount / 100,
							labelBonus: bonusPacket,
							description: descriptionPacket,
						});
					}
					if (userType === '5') {
						if (data.days === 30) {
							descriptionPacket = `Plano Premium (${data.days / 30} mês)`;
							month = `${data.days / 30} mês`;
						} else {
							descriptionPacket = `Plano Premium (${data.days / 30} meses)`;
							month = `${data.days / 30} meses`;
						}

						planDataPremium.push({
							id: data.id,
							days: month,
							labelPreco: data.amount / 100,
							labelBonus: bonusPacket,
							description: descriptionPacket,
						});
					}
				});
				setPremium(planDataPremium);
				setBasic(planDataBasic);
				activeClassTipoPlano('Plano Premium');
			});
	}, []);

	function activePlano(
		id: number,
		price: number,
		description: string,
		days: number,
	) {
		setIdPlanoSelecionado(id);

		setSelectedPlan({
			idPlan: id,
			pricePlan: price,
			descriptionPlan: description,
			typePlan,
			timePlan: days,
		});
	}

	function activeClassTipoPlano(plano: any) {
		if (plano === 'Plano Premium') {
			setIdTipoPlano(0);
			setEsconderVantagemPremium('');
		}
		if (plano === 'Plano Basico' && userType === '2') {
			setEsconderVantagemPremium('ativo');
			setIdTipoPlano(1);
		}
		setIdPlanoSelecionado(-1);
		setTypePlan(plano);
	}

	function sendPlan() {
		if (idPlanoSelecionado === -1) {
			toast.error('Favor selecione um plano.', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			planChoosed.current.scrollIntoView({ behavior: 'smooth' });
		} else {
			setFullShowLoading(true);

			axios
				.post(
					`${urlEndpoint}/api/checkout/orders`,
					{
						product_id: idPlanoSelecionado,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				)
				.then(function (response: typeResponseAxios) {
					setFullShowLoading(false);

					if (response.status === 201) {
						history.push('/payment-method');
					} else {
						toast.error(
							'Erro ao tentar comprar o plano, por favor tente novamente mais tarde.',
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
					setFullShowLoading(false);

					toast.error(
						'Erro ao tentar comprar o plano, por favor tente novamente mais tarde.',
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
	}

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Anunciar serviços
					<Link to={'/perfil'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="mt-6 px-20px">
				<div className="mb-2">
					<div className="passos-bolinhas-packets">
						<div className="bloco-passo-bolinha-packets active">
							<div className="passo-bolinha-packets" />
							<div className="text-bolinha-packets">Pacote</div>
						</div>
						<div className="bloco-passo-bolinha-packets">
							<div className="passo-bolinha-packets" />
							<div className="text-bolinha-packets">Pagamento</div>
						</div>
					</div>
				</div>
				<div
					className="text-escolha-pacote-preferencia text-center mb-6"
					ref={planChoosed}
				>
					Escolha um pacote de sua preferência
				</div>
			</div>
			<div className="tabs-packets">
				<button
					onClick={() => activeClassTipoPlano('Plano Premium')}
					type="button"
					className={`tab-packets ${idTipoPlano === 0 ? 'active' : ''}`}
				>
					<span>Anúncios Premium</span>
				</button>
				{userType !== '2' ? (
					''
				) : (
					<button
						onClick={() => activeClassTipoPlano('Plano Basico')}
						type="button"
						className={`tab-packets ${idTipoPlano === 1 ? 'active' : ''}`}
					>
						<span>Anúncios Básicos</span>
					</button>
				)}
			</div>
			<div className="mt-6 mb-24 px-20px">
				<div
					className={`mb-6 text-center text-seu-anuncio ${esconderVantagemPremium}`}
				>
					Seu anúncio em um lugar de destaque
				</div>
				<Loading showLoading={showLoading} className="loading-center" />
				<div className="grid grid-cols-2 gap-4">
					{idTipoPlano === 0
						? premium.map((plan: any) => {
								return (
									<PacketCard
										onClick={() =>
											activePlano(
												plan.id,
												plan.labelPreco,
												plan.description,
												plan.days,
											)
										}
										id={plan.id}
										elementDescricao={
											<div className="bloco-descricao-card-packets text-center">
												<p className="text-13px">Anunciar por</p>
												<p className="font-medium text-17px">{plan.days}</p>
											</div>
										}
										labelPreco={`R$ ${plan.labelPreco
											.toFixed(2)
											.replace('.', ',')}`}
										labelBonus={plan.labelBonus}
										isActive={plan.id === idPlanoSelecionado}
									/>
								);
						  })
						: basic.map((plan: any) => {
								return (
									<PacketCard
										onClick={() =>
											activePlano(
												plan.id,
												plan.labelPreco,
												plan.description,
												plan.days,
											)
										}
										id={plan.id}
										elementDescricao={
											<div className="bloco-descricao-card-packets text-center">
												<p className="text-13px">Anunciar por</p>
												<p className="font-medium text-17px">{plan.days}</p>
											</div>
										}
										labelPreco={`R$ ${plan.labelPreco
											.toFixed(2)
											.replace('.', ',')}`}
										labelBonus={plan.labelBonus}
										isActive={plan.id === idPlanoSelecionado}
									/>
								);
						  })}
				</div>
			</div>
			<div className="footer-register">
				<button
					type="button"
					className="block w-full p-2 rounded-full text-center bg-white"
					onClick={sendPlan}
				>
					Continuar
				</button>
			</div>

			<Loading showLoading={fullShowLoading} />
		</div>
	);
};

export default Packets;

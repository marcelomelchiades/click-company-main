import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { JsxElement } from 'typescript';
import PacketCardBig from '../../components/PacketCard/PacketCardBig';
import { endpointState } from '../../recoil/atoms';

const Signatures: React.FC = () => {
	interface packetsInterface {
		cabecalhoCard: string;
		elementDescricao: any;
		labelInicio: string;
		labelFim: string;
		labelPreco: string;
	}
	// const packets: packetsInterface[] = [
	// 	{
	// 		cabecalhoCard: 'Plano Premium',
	// 		elementDescricao: (
	// 			<div className="bloco-descricao-card-packets text-center">
	// 				<p className="text-13px" style={{color: '#413872', fontWeight: 600}}>10 dias de anúncio</p>
	// 			</div>
	// 		),
	// 		labelInicio: '20/10/2020',
	// 		labelFim: '30/10/2020',
	// 		labelPreco: 'R$ 105,00',
	// 	}
	// ];

	const { urlEndpoint } = useRecoilValue(endpointState);
	const urlOrderUser = `${urlEndpoint}/api/checkout/order/user`;
	const token = localStorage.getItem('token');

	const history = useHistory();

	const [packets, setPackets] = useState<packetsInterface[]>([]);

	useEffect(() => {
		axios
			.get(urlOrderUser, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(responseOrderUser => {
				const newPackets: packetsInterface[] = [];
				responseOrderUser.data.forEach((order: any) => {
					const dataInicio = new Date(order.updated_at);
					const dataFim = new Date(order.expired_at);
					const pendingRefused =
						order.status === 'refused' ? 'Negado' : 'Pendente';

					newPackets.push({
						cabecalhoCard: `${order.product?.title} ${order.product?.type_name}`,
						elementDescricao: (
							<div className="bloco-descricao-card-packets text-center">
								<p
									className="text-13px"
									style={{ color: '#413872', fontWeight: 600 }}
								>
									{`${order.product?.days} dias de anúncio`}
									<br />
									{!(
										order.product?.free_days === null ||
										order.product?.free_days === 0
									)
										? `${order.product?.free_days} dias adicionais`
										: ''}
								</p>
							</div>
						),
						labelInicio: dataInicio.toLocaleDateString(),
						labelFim:
							order.status === 'ok'
								? dataFim.toLocaleDateString()
								: pendingRefused,
						labelPreco: (order.value / 100).toLocaleString('pt-br', {
							style: 'currency',
							currency: 'BRL',
						}),
					});

					setPackets(newPackets);
				});
			})
			.catch(error => {
				handleLogOut();
				history.push('/home');
			});
	}, []);

	function handleLogOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user_type');
		localStorage.removeItem('perfilCreate');
		localStorage.removeItem('kyc');
	}

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Assinatura
					<Link to={'/perfil'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="body-register pt-5">
				<div className="text-adicione-info-2 flex justify-center mb-6 mr-20 ml-20">
					Aqui você pode conferir suas compras
				</div>

				<div className="mb-4">
					{packets.map((packet: packetsInterface) => {
						return (
							<PacketCardBig
								cabecalhoCard={packet.cabecalhoCard}
								elementDescricao={packet.elementDescricao}
								labelInicio={packet.labelInicio}
								labelFim={packet.labelFim}
								labelPreco={packet.labelPreco}
							/>
						);
					})}
				</div>
			</div>
			<div className="footer-register">
				<Link
					to={'/perfil'}
					className="block w-full p-2 rounded-full text-center bg-white"
				>
					Voltar
				</Link>
			</div>
		</div>
	);
};

export default Signatures;

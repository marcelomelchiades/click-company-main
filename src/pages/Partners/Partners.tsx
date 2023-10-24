import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { endpointState } from '../../recoil/atoms';

type PartnersParams = {
	id: string;
	name: string;
};

type typeResponseAxios = {
	[key: string]: any;
};

const Partners: React.FC = () => {
	const params = useParams<PartnersParams>();
	const history = useHistory();
	const { urlEndpoint } = useRecoilValue(endpointState);
	const [partners, setPartners] = useState<any[]>([]);

	const urlEndpointCampaigns = `${urlEndpoint}/api/partner/campaign`;

	useEffect(() => {
		axios
			.get(urlEndpointCampaigns, {
				params: {
					state: localStorage.getItem('estadoName'),
					category_id: params.id,
					distinct: 'true'
				},
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.data.length > 0) {
					const data: any[] = [];
					response.data.data.forEach((campaignResponse: any) => {
						data.push({
							img:
								campaignResponse.banner !== ''
									? `https://zapgrupos-bucket.s3.us-west-2.amazonaws.com/${campaignResponse.banner}`
									: '',
							title: campaignResponse.title,
							url: campaignResponse.target_url,
							id: campaignResponse.id,
							user_id: campaignResponse.user_id,
						});
					});
					setPartners(data);
				}
			});
	}, []);

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center bg-white">
				<p>
					{params?.name}
					<button
						type="button"
						onClick={() => {
							history.goBack();
						}}
						className="float-right"
					>
						<i className="fas fa-times" />
					</button>
				</p>
			</div>
			<div className="body-perfil">
				<div
					style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
				>
					{partners.map((partner: any) => (
						<div
							key={partner.id}
							style={{
								padding: 5,
								width: '50%',
								boxSizing: 'border-box',
							}}
						>
							<Link to={`/perfil-partner/${partner.user_id}`}>
								<img
									style={{ borderRadius: 5 }}
									src={partner.img}
									alt={partner.title}
								/>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Partners;

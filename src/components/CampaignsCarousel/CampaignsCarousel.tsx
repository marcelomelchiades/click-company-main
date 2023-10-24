import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useRecoilValue } from 'recoil';
import { endpointState } from '../../recoil/atoms';
import Loading from '../Loading/Loading';

const CampaignsCarousel: React.FC = () => {
	type typeResponseAxios = {
		[key: string]: any;
	};

	const { urlEndpoint } = useRecoilValue(endpointState);

	const [showLoading, setShowLoading] = useState(true);
	const [cardsCampaigns, setCardsCampaigns] = useState<any[]>([]);

	const urlEndpointCampaigns = `${urlEndpoint}/api/partner/campaign`;

	useEffect(() => {
		populateCampaings();
	}, []);

	const populateCampaings = () => {
		setCardsCampaigns([]);
		setShowLoading(true);

		axios
			.get(urlEndpointCampaigns, {
				params: {
					state: localStorage.getItem('estadoName'),
				},
			})
			.then(function (response: typeResponseAxios) {
				if (response.data.data.length > 0) {
					const newCampaigns: any[] = [];
					response.data.data.forEach((campaignResponse: any) => {
						newCampaigns.push({
							img:
								campaignResponse.banner !== ''
									? `https://zapgrupos-bucket.s3.us-west-2.amazonaws.com/${campaignResponse.banner}`
									: '',
							url: campaignResponse.target_url,
						});
					});
					setCardsCampaigns(newCampaigns);
					console.log(newCampaigns);
				}

				setShowLoading(false);
			});
	};

	return (
		<div>
			<Link to={'/register-partner'}>
				<div className="w-full p-2 rounded-full chamada-parceiro">
					<i className="text-white fas fa-money-bill-wave size-icon-money" />
					<div className="container-botao-parceiro">
						<h1>Seja um parceiro</h1>
						<p>Anuncie aqui os seus serviços</p>
					</div>
				</div>
			</Link>
			<div className="py-2">
				<p className="font-bold">Parceiros</p>
			</div>
			<div className="py-2">
				<Loading showLoading={showLoading} className="loading-center" />
				{cardsCampaigns.length ? (
					<Swiper freeMode={true} spaceBetween={15} slidesPerView={1.3}>
						{cardsCampaigns.map(campaign => {
							return (
								<SwiperSlide className="w-full bg-white text-center swiper-slide-campaign">
									{campaign.url !== '' ? (
										<a
											href={campaign.url}
											target="_blank"
											rel="noreferrer noopener"
										>
											<img src={campaign.img} alt="" />
										</a>
									) : (
										<img src={campaign.img} alt="" />
									)}
								</SwiperSlide>
							);
						})}
					</Swiper>
				) : null}
			</div>
		</div>
	);
};

export default CampaignsCarousel;

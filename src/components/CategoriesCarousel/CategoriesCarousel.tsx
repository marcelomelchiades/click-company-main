import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import saudeEBemEstar from '../../assets/images/categories/saude-e-bem-estar.jpeg';
import modaMasculina from '../../assets/images/categories/moda-masculina.jpeg';
import modaFeminina from '../../assets/images/categories/moda-feminina.jpeg';
import fotografia from '../../assets/images/categories/fotografia.jpeg';
import entretenimento from '../../assets/images/categories/entretenimento.jpeg';
import hoteis from '../../assets/images/categories/hoteis.jpeg';
import esporte from '../../assets/images/categories/esportes.jpeg';
import sexyShop from '../../assets/images/categories/sexy-shop.jpeg';
import academia from '../../assets/images/categories/academia.jpeg';
import outros from '../../assets/images/categories/outros.jpeg';

const CategoriesCarousel: React.FC = () => {
	const [cardsCampaigns, setCardsCampaigns] = useState<any[]>([]);

	useEffect(() => {
		setCardsCampaigns([
			{
				id: 1,
				name: 'Saúde e bem estar',
				image: saudeEBemEstar,
			},
			{
				id: 2,
				name: 'Moda masculina',
				image: modaMasculina,
			},
			{
				id: 3,
				name: 'Moda feminina',
				image: modaFeminina,
			},
			{
				id: 4,
				name: 'Fotografia',
				image: fotografia,
			},
			{
				id: 5,
				name: 'Entretenimento',
				image: entretenimento,
			},
			{
				id: 6,
				name: 'Hotéis',
				image: hoteis,
			},
			{
				id: 7,
				name: 'Esportes',
				image: esporte,
			},
			{
				id: 8,
				name: 'Sexy shop',
				image: sexyShop,
			},
			{
				id: 9,
				name: 'Academia',
				image: academia,
			},
			{
				id: 10,
				name: 'Outros',
				image: outros,
			},
		]);
	}, []);

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
				{cardsCampaigns.length ? (
					<Swiper freeMode={true} spaceBetween={15} slidesPerView={2}>
						{cardsCampaigns.map(campaign => {
							return (
								<SwiperSlide className="w-full bg-white text-center swiper-slide-category">
									<a
										href={`partners/${campaign.id}/${campaign.name}`}
										rel="noreferrer noopener"
									>
										<img
											style={{ borderRadius: 5 }}
											src={campaign.image}
											alt={campaign.name}
											title={campaign.name}
										/>
									</a>
								</SwiperSlide>
							);
						})}
					</Swiper>
				) : null}
			</div>
		</div>
	);
};

export default CategoriesCarousel;

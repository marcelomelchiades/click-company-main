import axios from 'axios';
import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import Loading from '../../components/Loading/Loading';

import { endpointState, fotosKyc } from '../../recoil/atoms';

const DocumentsFrontSelfieConfirmation: React.FC<RouteComponentProps> = ({
	history,
}) => {
	type typeResponseAxios = {
		[key: string]: any;
	};

	const {
		documentSelfie,
		documentFront,
		documentBack,
		documentSelfieTemporaryUrl,
	} = useRecoilValue(fotosKyc);

	const { urlEndpoint } = useRecoilValue(endpointState);
	const urlEndpointKyc = `${urlEndpoint}/api/account/kyc/send`;

	const [showLoading, setShowLoading] = useState(false);

	const handleCadastrar = (e: any) => {
		e.preventDefault();

		const token = localStorage.getItem('token');

		const formData = new FormData();

		formData.append('front', documentFront);
		formData.append('verse', documentBack);
		formData.append('selfie', documentSelfie);

		setShowLoading(true);

		axios
			.post(urlEndpointKyc, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(function (response: typeResponseAxios) {
				localStorage.setItem('kyc', 'pending');
				if (response.status === 201) {
					history.push('/documents-final');
				}

				setShowLoading(false);
			})
			.catch(function (error) {
				toast.error(
					'Erro ao tentar enviar os documentos, por favor tente novamente mais tarde.',
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

				setShowLoading(false);
			});
	};

	return (
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Anunciar serviços
					<Link to={'/login'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="mt-4 px-20px">
				<div className="text-center text-color-413872 font-size-17px font-semibold">
					<p>Ótimo! Se achar preciso pode Tirar outra foto</p>
				</div>
				<div className="text-center my-4">
					<img
						src={documentSelfieTemporaryUrl}
						className="inline-block"
						alt=""
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="text-center btn-confirmar-documents">
						<Link
							to={'/documents-front-selfie'}
							className="block w-full p-2 rounded-full text-center border-2 bg-white border-color-FF4767 text-color-FF4767"
						>
							<p className="text-17px">Tirar outra Foto</p>
						</Link>
					</div>

					<div className="text-center btn-confirmar-documents">
						<button
							type="button"
							onClick={handleCadastrar}
							className="block w-full p-2 rounded-full text-center border-2 border-color-FF4767 background-color-FF4767 text-white"
						>
							<p className="text-17px">Continuar</p>
						</button>
					</div>
				</div>
			</div>
			<Loading showLoading={showLoading} />
		</div>
	);
};

export default DocumentsFrontSelfieConfirmation;

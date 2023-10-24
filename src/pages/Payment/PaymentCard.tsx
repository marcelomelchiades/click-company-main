import React, {useState, useRef, useEffect} from 'react';
import { Link,RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState,useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedPlan,successfulBuy } from '../../recoil/atoms';

const PaymentCard: React.FC<RouteComponentProps> = ({ history }) => {
	const plan = useRecoilState(selectedPlan);
	const setSuccessful = useSetRecoilState(successfulBuy);

	// const location = useLocation();
	// const [hiddenCupom, setHiddenCupom] = useState(false);

	const [numero, setNumero] = useState('');
	const [nome, setNome] = useState('');
	const [cvv, setCvv] = useState('');
	const [validade, setValidade] = useState('');
	const [mes, setMes] = useState('');
	const [ano, setAno] = useState('');
	const erroDefault = {
		"number":[],
		"exp_month":[],
		"exp_year":[],
		"security_code":[],
		"name":[],
		"product_id": [],
		"error": null
	}

	const [erro, setErro] = useState(erroDefault);

	const numInput = useRef<HTMLInputElement>(null);
	const validateInput = useRef<HTMLInputElement>(null);
	const cvvImput = useRef<HTMLInputElement>(null);

	function handleEvent(e: any){
		const { value, name } = e.target;
		switch(name){
			case 'numero':
				setNumero(value);
				break;
			case 'nome':
				setNome(value);
				break;
			case 'cvv':
				setCvv(value);
				break;
			case 'validade':
				setValidade(value);
				break;
			case 'mes':
				setMes(value);
				break;
			case 'ano':
				setAno(value);
				break;
			default:
				break;
		}
	}

	function validateMask(value: string = ""){
		const str = value
			.replace(/\D/g, "")
			.replace(/(\d{2})/,"$1/")
			.replace(/(\d{2})\/(\d{1,3})/,"$1/$2")
			.replace(/(\d{2})\/(\d{4})+$/,"$1/$2");

		modifyREF(validateInput,str)
	}

	function validateCVV(value: string = ""){
		const str = value.replace(/\D/g, "")
		modifyREF(cvvImput,str)
	}

	function modifyREF(ref: React.RefObject<HTMLInputElement>  , str: string){
		if(ref?.current !== null){
			console.log(ref.current.value,str)
			ref.current.value = str;
		}
	}

	async function send(){
		setErro(value => ({...value, ...erroDefault}));

		const body = {
			'number': numero,
			'exp_month': mes,
			'exp_year': ano,
			'security_code': cvv,
			'name': nome,
			'product_id': plan[0].idPlan
		}


		const Header = new Headers();

		Header.append('Authorization', 'Bearer '.concat(localStorage.getItem('token') || ''));
		Header.append('Content-Type','application/json');

		const request = await fetch('https://api.clickcompanyapp.com.br/api/payment/cartao', 
			{ 
				method: 'POST', 
				headers: Header,
				body: JSON.stringify(body) 
			}
		);

		const response = await request.json();

		if(request.ok){
			setSuccessful(response.successful)
			setErro({...erroDefault});
			history.push('/payment-approved')
		}else{
			setErro( value => ({ ...value, ...response }) );
		}
	}

	useEffect(() => {
		if(erro.error !== null){
			toast.error(erro.error, {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
		}
	})

	return(
		<div className="bg-white">
			<div className="cabecalho-register text-center">
				<p>
					Pagamento
					<Link to={'/packets'} className="float-right">
						<i className="fas fa-times" />
					</Link>
				</p>
			</div>
			<div className="px-20px text-center my-6">
				<p className="text-color-FF4767 font-semibold font-size-17px">
					Cartão de crédito
				</p>
			</div>
			<div className="px-20px my-6">
				<p className="font-size-17px text-color-413872 mb-6">
					Preencha os dados do seu cartão de crédito
				</p>
				<div className="body-register">
					<div className="mt-8">
						<input
							name={'numero'}
							type={'number'}
							placeholder={'Número do cartão de crédito'}
							value={numero}
							onChange={(e: any) => {handleEvent(e);}}
							onKeyPress={(e: any) => {handleEvent(e);}}
							ref={numInput}
							size={16}
							className={'form-input'}
						/>
						<span className="ErrorLogin">
							{
								erro.number.map(
									(e) => (<li>{e}</li>)
								)
							}
						</span>
					</div>
					<div>
						<input
							name={'nome'}
							type={'text'}
							placeholder={'Nome gravado no cartão'}
							value={nome}
							onChange={(e: any) => handleEvent(e)}
							onKeyPress={(e: any) => handleEvent(e)}
							className={'form-input'}
						/>
						<span className="ErrorLogin">
							{
								erro.name.map(
									(e) => (<li>{e}</li>)
								)
							}
						</span>					
					</div>
					<div>
						<input
							name={'mes'}
							type={'text'}
							placeholder={'Mês'}
							value={mes}
							className={'form-input'}
							onChange={(e: any) => {
								handleEvent(e);
								validateMask(e.target.value);
							}}
							onKeyPress={(e: any) => {
								handleEvent(e);
								validateMask(e.target.value);
							}}
							maxLength={7}
						/>
						<span className="ErrorLogin">
							{
								erro.exp_month.map(
									(e) => (<li>{e}</li>)
								)
							}
						</span>					
					</div>
					<div>
						<input
							name={'ano'}
							type={'text'}
							placeholder={'Ano'}
							value={ano}
							className={'form-input'}
							onChange={(e: any) => {
								handleEvent(e);
								validateMask(e.target.value);
							}}
							onKeyPress={(e: any) => {
								handleEvent(e);
								validateMask(e.target.value);
							}}
						/>
						<span className="ErrorLogin">
							{
								erro.exp_year.map(
									(e) => (<li>{e}</li>)
								)
							}
						</span>					
					</div>
					<div>
						<input
							name={'cvv'}
							type={'text'}
							placeholder={'CVV'}
							value={cvv}
							onChange={(e: any) => {
								handleEvent(e);
								validateCVV(e.target.value)
							}}
							onKeyPress={(e: any) => {
								handleEvent(e);
								validateCVV(e.target.value)
							}}
							className={'form-input'}
							maxLength={6}
							minLength={3}
							ref={cvvImput}
						/>
						<span className="ErrorLogin">
							{
								erro.security_code.map(
									(e) => (<li>{e}</li>)
								)
							}
						</span>					
					</div>
				</div>
				

				{/* <div className="footer-plano-escolhido fixed left-0 bottom-0 w-full px-20px py-3">
					<p className="font-size-13px text-color-413872 font-semibold mb-2">
						{plan[0].descriptionPlan}
					</p>

					<p className="font-size-13px text-color-575757 flex items-center w-full relative">
						<span>Total do pedido</span>
						<span className="absolute right-0 text-color-413872 font-size-17px font-semibold">
							{`R$ ${plan[0].pricePlan.toFixed(2).replace('.', ',')}`}
						</span>
					</p>
				</div> */}
				<div className="fixed left-0 bottom-0 w-full bg-gray-100 px-20px py-4" role="button" onClick={send} onKeyPress={send} tabIndex={0}>
					{/* <Link
						to={'/payment-approved-credit-card'}
						className="block w-full p-2 rounded-full text-center background-color-FF4767 text-white"
					> */}
					<p className="text-17px">Pagar</p>
					{/* </Link> */}
				</div>
			</div>
		</div>
	);
}

export default PaymentCard;
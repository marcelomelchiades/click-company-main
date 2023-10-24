import { atom } from 'recoil';

export const endpointState = atom({
	key: 'endpointState',
	default: {
		urlEndpoint: 'https://api.clickcompanyapp.com.br',
		urlEndpointEstados:
			'https://servicodados.ibge.gov.br/api/v1/localidades/estados/',
	},
});

export const fluxoCreatePerfil = atom({
	key: 'fluxoCreatePerfil',
	default: {
		finalSendTo: '/perfil-companion',
	},
});

export const typeCreatePerfil = atom({
	key: 'typeCreatePerfil',
	default: {
		typePerfil: 'acompanhante',
	},
});

export const selectedPlan = atom({
	key: 'selectedPlan',
	default: {
		idPlan: 0,
		pricePlan: 0,
		descriptionPlan: '',
		typePlan: '',
		timePlan: 0,
	},
});

export const successfulBuy = atom({
	key: 'successfulBuy',
	default: {
		mensage: "",
		referenceId: "",
		status: ""
	},
});

type documentsKyc = {
	documentFront: any;
	documentBack: any;
	documentSelfie: any;
	documentFrontTemporaryUrl: string;
	documentBackTemporaryUrl: string;
	documentSelfieTemporaryUrl: string;
};

export const fotosKyc = atom<documentsKyc>({
	key: 'fotosKyc',
	default: {
		documentFront: null,
		documentBack: null,
		documentSelfie: null,
		documentFrontTemporaryUrl: '',
		documentBackTemporaryUrl: '',
		documentSelfieTemporaryUrl: '',
	},
});

export const createPerfilAcompanhante1 = atom({
	key: 'fotosKyc',
	default: {
		name: '',
		profile: {
			nickname: '',
			whatsApp: '',
			gender: '',
			height: '',
			eyes: '', // Id
			weight: '',
			clothingSize: '',
			footSize: '',
			skinColor: '', // Id
			hair: '', // Id
			breasts: '', // Id
			info: '',
			birth: '',
		},
	},
});

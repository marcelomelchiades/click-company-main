import React from 'react';
import { ToastContainer } from 'react-toastify';
import SimpleReactLightbox from 'simple-react-lightbox';

import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { RecoilRoot } from 'recoil';
import { registerServiceWorker } from './serviceWorker';

import './assets/main.css';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Perfil from './pages/Perfil/Perfil';
import Documents from './pages/Register/Documents';
import Packets from './pages/Register/Packets';
import CreatePerfil from './pages/Register/CreatePerfil';
import PacketsPartner from './pages/Register/PacketsPartner';
import LoginHasAccount from './pages/Login/LoginHasAccount';
import HomeCompanions from './pages/Home/HomeCompanions';
import HomeSwing from './pages/Home/HomeSwing';
import HomeCloseFriends from './pages/Home/HomeCloseFriends';
import PaymentApproved from './pages/Payment/PaymentApproved';
import PaymentApprovedPix from './pages/Payment/PaymentApprovedPix';
import CreatePerfil2 from './pages/Register/CreatePerfil2';
import PerfilUser from './pages/Perfil/PerfilUser';
import PerfilData from './pages/Perfil/PerfilData';
import Signatures from './pages/Perfil/Signatures';
import DocumentsFront from './pages/Register/DocumentsFront';
import DocumentsFrontConfirmation from './pages/Register/DocumentsFrontConfirmation';
import DocumentsBack from './pages/Register/DocumentsBack';
import DocumentsBackConfirmation from './pages/Register/DocumentsBackConfirmation';
import DocumentsFrontSelfie from './pages/Register/DocumentsFrontSelfie';
import DocumentsFrontSelfieConfirmation from './pages/Register/DocumentsFrontSelfieConfirmation';
import DocumentsFinal from './pages/Register/DocumentsFinal';
import Help from './pages/Help/Help';
import DiscountCoupon from './pages/DiscountCoupon/DicountCoupon';
import PaymentMethod from './pages/Payment/PaymentMethod';
// import PaymentInstallment from './pages/Payment/PaymentInstallment';
import PaymentCart from './pages/Payment/PaymentCart';
import NewPublication from './pages/Publications/NewPublication';
import CreatePerfilPartner from './pages/Register/CreatePerfilPartner';
import CreatePerfilSwing from './pages/Register/CreatePerfilSwing';
import CreatePerfilCloseFriends from './pages/Register/CreatePerfilCloseFriends';
import SearchCompanions from './pages/Register/SearchCompanions';
import SearchSwing from './pages/Register/SearchSwing';
import SearchCloseFriends from './pages/Register/SearchCloseFriends';
import UpdatePerfil from './pages/Register/UpdatePerfil';
import UpdatePerfil2 from './pages/Register/UpdatePerfil2';
import UpdatePerfilSwing from './pages/Register/UpdatePerfilSwing';
import UpdatePerfilCloseFriends from './pages/Register/UpdatePerfilCloseFriends';
import UpdatePerfilPartner from './pages/Register/UpdatePerfilPartner';
import UpdatePublication from './pages/Publications/UpdatePublication';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import HomePartner from './pages/Home/HomePartners';
import Reset from './pages/Reset/Reset';
import Partners from './pages/Partners/Partners';
import PerfilPartner from './pages/Perfil/PerfilPartner';
import Listing from './pages/Listing/Listing';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import PaymentCard from './pages/Payment/PaymentCard';
import Regras from './pages/Regras/Regras';

ReactDOM.render(
	<React.StrictMode>
		<SimpleReactLightbox>
			<RecoilRoot>
				<BrowserRouter>
					<Switch>
						<Route path="/home-companions" component={HomeCompanions} />
						<Route path="/home-swing" component={HomeSwing} />
						<Route path="/home-close-friends" component={HomeCloseFriends} />
						<Route path="/home-partners" component={HomePartner} />
						<Route path="/home" component={Home} />
						<Route path="/partners/:id/:name" component={Partners} />
						<Route path="/listing/:type/:name" component={Listing} />
						<Route path="/login-with-account" component={LoginHasAccount} />
						<Route path="/login" component={Login} />
						<Route path="/reset" component={Reset} />
						<Route path="/reset-password/:token" component={ResetPassword} />
						<ProtectedRoute unprotected path="/register" component={Register} />
						<ProtectedRoute
							unprotected
							path="/register-partner"
							component={Register}
						/>
						<ProtectedRoute
							unprotected
							path="/register-swing"
							component={Register}
						/>
						<ProtectedRoute
							unprotected
							path="/register-close-friends"
							component={Register}
						/>
						<ProtectedRoute
							path="/documents-final"
							component={DocumentsFinal}
						/>
						<ProtectedRoute
							path="/documents-front-selfie-confirmation"
							component={DocumentsFrontSelfieConfirmation}
						/>
						<ProtectedRoute
							path="/documents-front-selfie"
							component={DocumentsFrontSelfie}
						/>
						<ProtectedRoute
							path="/documents-front-confirmation"
							component={DocumentsFrontConfirmation}
						/>
						<ProtectedRoute
							path="/documents-front"
							component={DocumentsFront}
						/>
						<ProtectedRoute
							path="/documents-back-confirmation"
							component={DocumentsBackConfirmation}
						/>
						<ProtectedRoute path="/documents-back" component={DocumentsBack} />
						<ProtectedRoute path="/documents" component={Documents} />
						<ProtectedRoute path="/packets" component={Packets} />
						<ProtectedRoute
							path="/packets-partner"
							component={PacketsPartner}
						/>
						<ProtectedRoute path="/payment-cart" component={PaymentCart} />
						{/* <ProtectedRoute
							path="/payment-installment"
							component={PaymentInstallment}
						/> */}
						<ProtectedRoute path="/payment-card" component={PaymentCard} />

						<ProtectedRoute path="/payment-method" component={PaymentMethod} />
						<ProtectedRoute
							path="/payment-approved"
							component={PaymentApproved}
						/>
						<ProtectedRoute
							path="/payment-approved-pix"
							component={PaymentApprovedPix}
						/>
						<ProtectedRoute path="/create-perfil" component={CreatePerfil} />
						<ProtectedRoute path="/update-perfil" component={UpdatePerfil} />
						<ProtectedRoute path="/create-perfil-2" component={CreatePerfil2} />
						<ProtectedRoute path="/update-perfil-2" component={UpdatePerfil2} />
						<ProtectedRoute
							path="/create-perfil-swing"
							component={CreatePerfilSwing}
						/>
						<ProtectedRoute
							path="/update-perfil-swing"
							component={UpdatePerfilSwing}
						/>
						<ProtectedRoute
							path="/create-perfil-close-friends"
							component={CreatePerfilCloseFriends}
						/>
						<ProtectedRoute
							path="/update-perfil-close-friends"
							component={UpdatePerfilCloseFriends}
						/>
						<ProtectedRoute
							path="/create-perfil-partner"
							component={CreatePerfilPartner}
						/>
						<ProtectedRoute
							path="/update-perfil-partner"
							component={UpdatePerfilPartner}
						/>
						<ProtectedRoute
							path="/update-publication"
							component={UpdatePublication}
						/>
						<Route path="/new-publication" component={NewPublication} />
						<Route path="/perfil-user/:id" component={PerfilUser} />
						<Route path="/perfil-partner/:id" component={PerfilPartner} />
						<Route path="/perfil-data" component={PerfilData} />
						<Route path="/signatures" component={Signatures} />
						<Route path="/help" component={Help} />
						<Route path="/discount-coupon" component={DiscountCoupon} />
						<ProtectedRoute path="/perfil" component={Perfil} exact={true} />
						<Route path="/search-companions" component={SearchCompanions} />
						<Route path="/search-swing" component={SearchSwing} />
						<Route
							path="/search-close-friends"
							component={SearchCloseFriends}
						/>
						<Route path="/regras" component={Regras} />
						<Redirect from="*" to="/home" />
					</Switch>
				</BrowserRouter>
			</RecoilRoot>
			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
			/>
		</SimpleReactLightbox>
	</React.StrictMode>,
	document.getElementById('root'),
);

registerServiceWorker();

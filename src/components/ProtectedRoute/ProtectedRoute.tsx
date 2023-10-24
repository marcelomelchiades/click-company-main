import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

type ProtectedRouteProps = {
	path: string;
	component: any;
	unprotected?: boolean;
	exact?: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	path,
	component,
	unprotected = false,
	exact = false,
}) => {
	let youCanPass = localStorage.getItem('token') !== null;

	if (unprotected) {
		youCanPass = !youCanPass;
	}

	return (
		<Route
			exact={exact}
			path={path}
			component={youCanPass ? component : undefined}
			render={props => (youCanPass ? undefined : <Redirect to="/login" />)}
		/>
	);
};

ProtectedRoute.defaultProps = {
	unprotected: false,
	exact: false,
};

export default ProtectedRoute;

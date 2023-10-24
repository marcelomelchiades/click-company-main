import React from 'react';
import { Link } from 'react-router-dom';

import logoWhiteVertical from '../../assets/images/Logo_CC-variacao-Coracao-branco.svg';
import logoWhiteHorizontal from '../../assets/images/Logo_CC-variacao-horizontal.svg';
import logoVermelho from '../../assets/images/logo-vermelho-clickcompany.svg';

type LogoProps = {
	logoType: string;
	classes: string;
};

const Logo: React.FC<LogoProps> = ({ logoType, classes }) => {
	let srcLogo = logoWhiteVertical;

	if (logoType === 'white vertical') {
		srcLogo = logoWhiteVertical;
	} else if (logoType === 'white horizontal') {
		srcLogo = logoWhiteHorizontal;
	} else if (logoType === 'red vertical') {
		srcLogo = logoVermelho;
	}

	return (
		<Link to="/login">
			<img
				className={classes}
				src={srcLogo}
				alt="Click Company"
				title="Click Company"
			/>
		</Link>
	);
};

export default Logo;

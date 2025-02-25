import { useNavigate } from 'react-router-dom';
import * as S from './Header.style';
import Logo from '@assets/svg/logo-posepik.svg';

export default function LogoHeader() {
	const navigate = useNavigate();

	const handleNavLinkClick = path => {
		navigate(path);
	};

	return (
		<S.HeaderContainer>
			<S.LogoImg src={Logo} alt="PosePik" onClick={() => handleNavLinkClick('/map')} />
		</S.HeaderContainer>
	);
}

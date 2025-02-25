import { useNavigate } from 'react-router-dom';
import * as S from './Splash.style';
import Button from '@components/Common/Button/Button';
import TextLogo from '@assets/svg/logo-posepik.svg';
import CharacLogo from '@assets/svg/charac-posepik.svg';

export default function Splash() {
	const navigate = useNavigate();

	const handleNavLinkClick = path => {
		navigate(path);
	};

	return (
		<S.Container>
			<S.LogoContainer>
				<S.TLogo src={TextLogo} alt="posepik!" />
				<S.CLogo src={CharacLogo} alt="posepik!" />
			</S.LogoContainer>
			<Button text="시작하기" onClick={() => handleNavLinkClick('/map')} isActive={false} />
		</S.Container>
	);
}

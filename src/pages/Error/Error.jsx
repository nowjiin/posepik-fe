import { useNavigate } from 'react-router-dom';
import * as S from './Error.style';
import ErrorLogo from '@assets/svg/logo-error.svg';
import LogoHeader from '@components/Common/Header/LogoHeader';

export default function Error() {
	const navigate = useNavigate();

	const handleNavLinkClick = path => {
		navigate(path);
	};

	return (
		<S.Space>
			<LogoHeader />
			<S.Container>
				<S.ErrorImg src={ErrorLogo} alt="Error" />
				<S.Text>죄송합니다. 페이지를 찾을 수 없습니다.</S.Text>
				<S.ButtonContainer onClick={() => handleNavLinkClick('/map')}>홈으로 돌아가기</S.ButtonContainer>
			</S.Container>
		</S.Space>
	);
}

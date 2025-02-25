import { useNavigate } from 'react-router-dom';
import * as S from './Header.style';
import Back from '@assets/svg/icon-back.svg';

export default function BackHeader() {
	const navigate = useNavigate();

	const onClickBack = () => {
		navigate(-1);
	};

	return (
		<S.HeaderContainer>
			<S.BackImg src={Back} alt="뒤로가기" onClick={onClickBack} />
		</S.HeaderContainer>
	);
}

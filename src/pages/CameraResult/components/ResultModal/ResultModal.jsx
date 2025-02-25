import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as S from './ResultModal.style';

export default function ResultModal({ id, onClose }) {
	const navigate = useNavigate();

	const handleNavLinkClick = path => {
		navigate(path);
	};

	return (
		<>
			<S.ModalBackground onClick={onClose} />
			<S.ModalSpace>
				<S.ModalWrap>
					<S.TextContainer>
						[사용자 이름]님은 1등이에요!
						<S.Content>랭킹 페이지를 확인해보세요!</S.Content>
					</S.TextContainer>
					<S.ButtonContainer onClick={() => handleNavLinkClick(`/picture-detail/${id}`)}>
						랭킹페이지 바로가기
					</S.ButtonContainer>
				</S.ModalWrap>
			</S.ModalSpace>
		</>
	);
}

ResultModal.propTypes = {
	id: PropTypes.number.isRequired,
	onClose: PropTypes.func.isRequired,
};

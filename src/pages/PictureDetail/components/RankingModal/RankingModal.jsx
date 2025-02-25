import PropTypes from 'prop-types';
import * as S from './RankingModal.style';
import Close from '@assets/svg/icon-close.svg';

export default function RankingModal({ onClose }) {
	return (
		<>
			<S.ModalBackground onClick={onClose} />
			<S.ModalSpace>
				<S.ModalWrap>
					<S.Picture src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s" />
					<S.CloseContainer>
						<S.CloseImg src={Close} onClick={onClose} alt="닫기" />
					</S.CloseContainer>
				</S.ModalWrap>
			</S.ModalSpace>
		</>
	);
}

RankingModal.propTypes = {
	onClose: PropTypes.func.isRequired,
};

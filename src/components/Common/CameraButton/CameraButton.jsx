import PropTypes from 'prop-types';
import * as S from './CameraButton.style';
import Camera from '@assets/svg/icon-camera.svg';

export default function CameraButton({ onClick }) {
	return (
		<S.ButtonContainer onClick={onClick}>
			<S.CameraIcon src={Camera} alt="사진 찍기" />
			사진 찍기
		</S.ButtonContainer>
	);
}

CameraButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import * as S from './CameraButton.style';
import Camera from '@assets/svg/icon-camera.svg';

export default function CameraButton() {
	const navigate = useNavigate();

	const handleNavLinkClick = path => {
		navigate(path);
	};

	return (
		<S.ButtonContainer onClick={() => handleNavLinkClick('/camera')}>
			<S.CameraIcon src={Camera} alt="사진 찍기" />
			사진 찍기
		</S.ButtonContainer>
	);
}

CameraButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

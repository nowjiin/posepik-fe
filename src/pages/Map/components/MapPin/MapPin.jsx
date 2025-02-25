import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import * as S from './MapPin.style';
import Pin from '@assets/svg/icon-location-pin.svg';

export default function MapPin({ id, imageUrl }) {
	const navigate = useNavigate();

	const handleNavLinkClick = path => {
		navigate(path);
	};

	return (
		<S.Container onClick={() => handleNavLinkClick(`/picture-detail/${id}`)}>
			<S.PinImg src={Pin} alt="핀" />
			<S.Img src={imageUrl} alt="이미지" />
		</S.Container>
	);
}

MapPin.propTypes = {
	id: PropTypes.number.isRequired,
	imageUrl: PropTypes.string.isRequired,
};

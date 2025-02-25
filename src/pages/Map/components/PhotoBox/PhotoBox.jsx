import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import * as S from './PhotoBox.style';

export default function PhotoBox({ id, imageUrl, location, instagram }) {
	const navigate = useNavigate();

	const handleNavLinkClick = path => {
		navigate(path);
	};

	return (
		<S.Container onClick={() => handleNavLinkClick(`/picture-detail/${id}`)}>
			<S.Img src={imageUrl} alt="퍼센트" />
			<S.TextContainer>
				<S.Title>{location}</S.Title>
				<S.InstaBox>{instagram}</S.InstaBox>
			</S.TextContainer>
		</S.Container>
	);
}

PhotoBox.propTypes = {
	id: PropTypes.number.isRequired,
	imageUrl: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	instagram: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';
import * as S from './InstagramBox.style';
import Instagram from '@assets/svg/logo-instagram.svg';

export default function InstagramBox({ instagramID }) {
	const handleClick = () => {
		if (instagramID) {
			window.open(`https://www.instagram.com/${instagramID}`, '_blank');
		}
	};

	return (
		<S.SpaceContainer onClick={handleClick}>
			<S.InstagramImg src={Instagram} alt="인스타 아이디" />
			<S.Container>{instagramID}</S.Container>
		</S.SpaceContainer>
	);
}

InstagramBox.propTypes = {
	instagramID: PropTypes.string.isRequired,
};

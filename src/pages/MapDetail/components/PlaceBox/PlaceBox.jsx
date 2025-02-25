import PropTypes from 'prop-types';
import * as S from './PlaceBox.style';
import Location from '@assets/svg/icon-location.svg';
import Right from '@assets/svg/icon-right.svg';

export default function PlaceBox({ country, area }) {
	return (
		<S.Container>
			<S.LocationImg src={Location} alt="위치" />
			<S.TextContainer>
				<S.Country>{country}</S.Country>
				<S.RightImg src={Right} alt=">" />
				<S.Area>{area}</S.Area>
			</S.TextContainer>
		</S.Container>
	);
}

PlaceBox.propTypes = {
	country: PropTypes.string.isRequired,
	area: PropTypes.string.isRequired,
};

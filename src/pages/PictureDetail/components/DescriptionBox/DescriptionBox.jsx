import PropTypes from 'prop-types';
import * as S from './DescriptionBox.style';
import PhotoTip from '@assets/svg/icon-photo-tip.svg';

export default function DescriptionBox({ description }) {
	return (
		<S.Container>
			<S.PhotoImg src={PhotoTip} alt="포토팁" />
			<S.Text>{description}</S.Text>
		</S.Container>
	);
}

DescriptionBox.propTypes = {
	description: PropTypes.string.isRequired,
};

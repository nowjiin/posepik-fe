import PropTypes from 'prop-types';
import * as S from './PicGuideBox.style';

export default function PicGuideBox({ guide }) {
	return (
		<S.Container>
			<S.Text>{guide}</S.Text>
		</S.Container>
	);
}

PicGuideBox.propTypes = {
	guide: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';
import * as S from './GuideBox.style';

export default function GuideBox({ guide }) {
	return (
		<S.Container>
			<S.Text>{guide}</S.Text>
		</S.Container>
	);
}

GuideBox.propTypes = {
	guide: PropTypes.string.isRequired,
};

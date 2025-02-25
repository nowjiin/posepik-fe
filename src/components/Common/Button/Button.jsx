import PropTypes from 'prop-types';
import * as S from './Button.style';

export default function Button({ text, onClick, isActive }) {
	return (
		<S.ButtonContainer onClick={onClick} $isActive={isActive}>
			{text}
		</S.ButtonContainer>
	);
}

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isActive: PropTypes.bool.isRequired,
};

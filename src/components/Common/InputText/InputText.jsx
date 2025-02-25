import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as S from '@components/Common/InputText/InputText.style';

function InputText({ placeholder, warningMsg, value, onInputChange }) {
	const [inputData, setInputData] = useState(value || '');
	const [showWarning, setShowWarning] = useState(false);
	const [hasInteracted, setHasInteracted] = useState(false);

	const handleInputChange = e => {
		const value = e.target.value;
		setInputData(value);
		setHasInteracted(true);

		if (onInputChange) {
			onInputChange(value);
		}
	};

	useEffect(() => {
		setInputData(value || '');
	}, [value]);

	useEffect(() => {
		if (hasInteracted && inputData.trim().length === 0) {
			setShowWarning(true);
		} else {
			setShowWarning(false);
		}
	}, [inputData, hasInteracted]);

	return (
		<S.Input>
			<S.InputText
				placeholder={placeholder}
				type="text"
				value={inputData}
				onChange={handleInputChange}
				$isInvalid={showWarning}
			/>
			{showWarning && <S.Warn>{warningMsg}</S.Warn>}
		</S.Input>
	);
}

// PropTypes 유효성 검사 추가
InputText.propTypes = {
	placeholder: PropTypes.string.isRequired,
	warningMsg: PropTypes.string,
	value: PropTypes.string,
	onInputChange: PropTypes.func,
};

// 기본값 설정
InputText.defaultProps = {
	warningMsg: '',
	value: '',
	onInputChange: () => {},
};

export default InputText;

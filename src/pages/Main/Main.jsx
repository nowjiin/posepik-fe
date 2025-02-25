import { useState } from 'react';
import * as S from './Main.style';
import Button from '@components/Common/Button/Button';
import CameraButton from '@components/Common/CameraButton/CameraButton';
import InputText from '@components/Common/InputText/InputText';

function Main() {
	const [projectName, setProjectName] = useState('');

	const sampleClose = () => {
		alert('시작하기 버튼이 클릭되었습니다.');
	};

	const handleInputChange = value => {
		setProjectName(value);
	};

	return (
		<S.Main>
			<h1>공통 컴포넌트 테스트 페이지</h1>
			<Button text="시작하기" onClick={sampleClose} isActive={false} />
			<CameraButton />
			<InputText
				placeholder="닉네임(1~12자 입력 가능)"
				warningMsg="*유효하지 않은 닉네임입니다."
				isEssential={true}
				value={projectName}
				onInputChange={handleInputChange}
			/>
		</S.Main>
	);
}

export default Main;

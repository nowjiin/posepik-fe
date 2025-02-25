import { useState } from 'react';
import * as S from './Main.style';
import LogoHeader from '@components/Common/Header/LogoHeader';
import BackHeader from '@components/Common/Header/BackHeader';
import Button from '@components/Common/Button/Button';
import CameraButton from '@components/Common/CameraButton/CameraButton';
import InputText from '@components/Common/InputText/InputText';
import PlaceBox from '@pages/MapDetail/components/PlaceBox/PlaceBox';
import GuideBox from '@pages/MapDetail/components/GuideBox/GuideBox';

function Main() {
	const [projectName, setProjectName] = useState('');

	const sampleClose = () => {
		alert('시작하기 버튼이 클릭되었습니다.');
	};

	const handleInputChange = value => {
		setProjectName(value);
	};

	return (
		<>
			<LogoHeader />
			<BackHeader />
			<S.Main>
				<h1>공통 컴포넌트</h1>
				<Button text="시작하기" onClick={sampleClose} isActive={false} />
				<CameraButton />
				<InputText
					placeholder="닉네임(1~12자 입력 가능)"
					warningMsg="*유효하지 않은 닉네임입니다."
					isEssential={true}
					value={projectName}
					onInputChange={handleInputChange}
				/>

				<h1>지도, 지도 상세 컴포넌트</h1>
				<PlaceBox country="프랑스" area="파리" />
				<GuideBox guide="샤요 궁(Palais de Chaillot) 방향에서 남쪽" />

				<h1>사진 상세, 결과 상세 컴포넌트</h1>
			</S.Main>
		</>
	);
}

export default Main;

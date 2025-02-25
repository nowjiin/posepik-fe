import { useState } from 'react';
import * as S from './Main.style';
import LogoHeader from '@components/Common/Header/LogoHeader';
import BackHeader from '@components/Common/Header/BackHeader';
import Button from '@components/Common/Button/Button';
import CameraButton from '@components/Common/CameraButton/CameraButton';
import InputText from '@components/Common/InputText/InputText';
import PlaceBox from '@pages/MapDetail/components/PlaceBox/PlaceBox';
import GuideBox from '@pages/MapDetail/components/GuideBox/GuideBox';
import MapPin from '@pages/Map/components/MapPin/MapPin';
import PhotoBox from '@pages/Map/components/PhotoBox/PhotoBox';
import DescriptionBox from '@pages/PictureDetail/components/DescriptionBox/DescriptionBox';
import InstagramBox from '@pages/PictureDetail/components/InstagramBox/InstagramBox';
import PicGuideBox from '@pages/PictureDetail/components/PicGuideBox/PicGuideBox';
import AccuracyBar from '@pages/CameraResult/components/AccuracyBar/AccuracyBar';

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
				<MapPin
					id={1}
					imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s"
				/>
				<PhotoBox
					id={1}
					imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s"
					location="사진 위치"
					instagram="rize_official"
				/>

				<h1>사진 상세, 결과 상세 컴포넌트</h1>
				<DescriptionBox
					description="이 사진을 보면 에펠탑이 정면으로 보이고, 넓은 광장이 있으며, 바닥이 돌로 
포장되어 있습니다. 이런 특징을 고려했을 때, 샤요 궁(Palais de Chaillot) 
방향에서 남쪽을 바라보며 촬영한 사진일 가능성이 높습니다. 최대3줄입니다ㅏㅏㅏ"
				/>
				<InstagramBox instagramID="jennierubyjane" />
				<PicGuideBox guide="샤요 궁(Palais de Chaillot) 방향에서 남쪽" />
				<AccuracyBar percentage="98.5" />
			</S.Main>
		</>
	);
}

export default Main;

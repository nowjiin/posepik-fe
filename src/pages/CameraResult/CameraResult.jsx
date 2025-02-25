import { useState } from 'react';
import * as S from './CameraResult.style';
import BackHeader from '@components/Common/Header/BackHeader';
import AccuracyBar from '@pages/CameraResult/components/AccuracyBar/AccuracyBar';
import InputText from '@components/Common/InputText/InputText';
import Button from '@components/Common/Button/Button';
import Download from '@assets/svg/icon-download.svg';
import Upload from '@assets/svg/icon-upload.svg';

export default function CameraResult() {
	const [projectName, setProjectName] = useState('');

	const handleInputChange = value => {
		setProjectName(value);
	};

	const sampleButton = () => {
		alert('다음으로 버튼이 클릭되었습니다.');
	};

	return (
		<S.Space>
			<BackHeader />
			<S.Container>
				<S.BodyContainer>
					<S.ImageContainer>
						<S.InstaImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s" />
						<S.InstaImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s" />
					</S.ImageContainer>
					<S.TextContainer>
						<S.TitleContainer>포토 스코어</S.TitleContainer>
						<AccuracyBar percentage="98.5" />
					</S.TextContainer>
					<S.TextContainer>
						<S.TitleContainer>랭킹 업데이트</S.TitleContainer>
						<S.Text>작성해주신 닉네임은 포토 랭킹에 업로드됩니다.</S.Text>
						<S.InputContainer>
							<InputText
								placeholder="닉네임(1~12자 입력 가능)"
								warningMsg="*유효하지 않은 닉네임입니다."
								isEssential={true}
								value={projectName}
								onInputChange={handleInputChange}
							/>
						</S.InputContainer>
					</S.TextContainer>
					<Button text="다음으로" onClick={sampleButton} isActive={false} />
					<S.ButtonSpaceContainer>
						<S.ButtonContainer>
							<S.Button>
								<S.ButtonImg src={Download} alt="저장하기" />
							</S.Button>
							사진 저장하기
						</S.ButtonContainer>
						<S.ButtonContainer>
							<S.Button>
								<S.ButtonImg src={Upload} alt="공유하기" />
							</S.Button>
							인스타그램에
							<br />
							공유하기
						</S.ButtonContainer>
					</S.ButtonSpaceContainer>
				</S.BodyContainer>
			</S.Container>
		</S.Space>
	);
}

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './CameraResult.style';
import BackHeader from '@components/Common/Header/BackHeader';
import AccuracyBar from '@pages/CameraResult/components/AccuracyBar/AccuracyBar';
import InputText from '@components/Common/InputText/InputText';
import Button from '@components/Common/Button/Button';
import Download from '@assets/svg/icon-download.svg';
import Upload from '@assets/svg/icon-upload.svg';
import ResultModal from './components/ResultModal/ResultModal';

export default function CameraResult() {
	const { id } = useParams();
	const [rankingName, setRankingName] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleInputChange = value => {
		setRankingName(value);
	};

	const handleDownloadImage = () => {
		const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s';
		const link = document.createElement('a');
		link.href = imageUrl;
		link.download = 'photo_score_image.jpg'; // 저장될 파일명
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleShareOnInstagram = () => {
		const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s';
		const encodedUrl = encodeURIComponent(imageUrl);
		const instagramUrl = `https://www.instagram.com/sharer.php?u=${encodedUrl}`;

		window.open(instagramUrl, '_blank'); // 새 창에서 공유
	};

	const photoList = [
		{
			id: 0,
			imageUrl: 'https://github.com/user-attachments/assets/306149ff-dc7d-487c-a3ee-595ab00ea5bf',
		},
		{
			id: 1,
			imageUrl: 'https://github.com/user-attachments/assets/425146d7-bef8-4a7c-b693-4048c429008c',
		},
		{
			id: 2,
			imageUrl: 'https://github.com/user-attachments/assets/fe461828-78d8-4f53-8710-d61e94e2dc09',
		},
		{
			id: 3,
			imageUrl: 'https://github.com/user-attachments/assets/e7802c41-61ed-4a28-ae9a-806384612b77',
		},
		{
			id: 4,
			imageUrl: 'https://github.com/user-attachments/assets/5f4e383e-45c8-4df2-9b21-483df58a5bcf',
		},
	];

	const selectedPhoto = photoList.find(photo => photo.id === Number(id));

	return (
		<S.Space>
			<BackHeader />
			<S.Container>
				<S.BodyContainer>
					<S.ImageContainer>
						<S.InstaImg src={selectedPhoto?.imageUrl || ''} />
						<S.InstaImg src={selectedPhoto?.imageUrl || ''} />
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
								value={rankingName}
								onInputChange={handleInputChange}
							/>
						</S.InputContainer>
					</S.TextContainer>
					<Button text="다음으로" onClick={openModal} isActive={rankingName.trim() !== ''} />
					<S.ButtonSpaceContainer>
						<S.ButtonContainer onClick={handleDownloadImage}>
							<S.Button>
								<S.ButtonImg src={Download} alt="저장하기" />
							</S.Button>
							사진 저장하기
						</S.ButtonContainer>
						<S.ButtonContainer onClick={handleShareOnInstagram}>
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
			{isModalOpen && <ResultModal id={id} name={rankingName} onClose={closeModal} />}
		</S.Space>
	);
}

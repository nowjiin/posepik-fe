import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './PictureDetail.style';
import BackHeader from '@components/Common/Header/BackHeader';
import CameraButton from '@components/Common/CameraButton/CameraButton';
import InstagramBox from './components/InstagramBox/InstagramBox';
import PicGuideBox from './components/PicGuideBox/PicGuideBox';
import DescriptionBox from './components/DescriptionBox/DescriptionBox';
import Refresh from '@assets/svg/icon-refresh.svg';
import first from '@assets/svg/icon-1st-medal.svg';
import second from '@assets/svg/icon-2nd-medal.svg';
import third from '@assets/svg/icon-3rd-medal.svg';
import RankingModal from './components/RankingModal/RankingModal';

export default function PictureDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const photoList = [
		{
			id: 0,
			imageUrl: 'https://github.com/user-attachments/assets/306149ff-dc7d-487c-a3ee-595ab00ea5bf',
			location: '퐁 드 비르 아케임 다리에서 남쪽을 향해 촬영',
			instagram: 'jennierubyjane',
		},
		{
			id: 1,
			imageUrl: 'https://github.com/user-attachments/assets/425146d7-bef8-4a7c-b693-4048c429008c',
			location: '샤요 궁(Palais de Chaillot) 방향에서 남쪽',
			instagram: 'jiraishin99',
		},
		{
			id: 2,
			imageUrl: 'https://github.com/user-attachments/assets/fe461828-78d8-4f53-8710-d61e94e2dc09',
			location: '퐁 드 비르 아케임 다리에서 남쪽을 향해 촬영',
			instagram: '_yujin_an',
		},
		{
			id: 3,
			imageUrl: 'https://github.com/user-attachments/assets/e7802c41-61ed-4a28-ae9a-806384612b77',
			location: 'Port Debilly 근처 강변에서 남동쪽 방향',
			instagram: 'for_everyoung10',
		},
		{
			id: 4,
			imageUrl: 'https://github.com/user-attachments/assets/5f4e383e-45c8-4df2-9b21-483df58a5bcf',
			location: 'Port Debilly 근처 강변에서 남동쪽 방향',
			instagram: '_yujin_an',
		},
	];

	const selectedPhoto = photoList.find(photo => photo.id === Number(id));

	const handleCameraButtonClick = () => {
		const targetPath = id === '0' ? '/camera' : `/camera${id}`;
		navigate(targetPath);
	};

	return (
		<S.Space>
			<BackHeader />
			<S.Container>
				<S.BodyContainer>
					<S.TopContainer>
						<InstagramBox instagramID={selectedPhoto?.instagram || 'unknown'} />
						<S.InstaImg src={selectedPhoto?.imageUrl || ''} />
						<PicGuideBox guide={selectedPhoto?.location || '위치 정보 없음'} />
					</S.TopContainer>
					<S.TextContainer>
						<S.TitleContainer>포토 팁</S.TitleContainer>
						<DescriptionBox
							description="이 사진을 보면 에펠탑이 정면으로 보이고, 넓은 광장이 있으며, 바닥이 돌로 
            포장되어 있습니다. 이런 특징을 고려했을 때, 샤요 궁(Palais de Chaillot) 
            방향에서 남쪽을 바라보며 촬영한 사진일 가능성이 높습니다."
						/>
					</S.TextContainer>
					<S.TextContainer style={{ marginTop: '30px', marginBottom: '100px' }}>
						<S.TitleContainer>
							포토 랭킹
							<S.RefreshImg src={Refresh} alt="새로고침" />
						</S.TitleContainer>
						<S.RankingContainer>
							<S.RankingBarContainer onClick={openModal}>
								배고프다
								<S.RankingBar1>23.1%</S.RankingBar1>
							</S.RankingBarContainer>
							<S.RankingBarContainer onClick={openModal}>
								배고프다
								<S.RankingBar2>
									<S.MedalImg src={second} alt="2등" />
									69.3%
								</S.RankingBar2>
							</S.RankingBarContainer>
							<S.RankingBarContainer onClick={openModal}>
								배고프다
								<S.RankingBar3>
									<S.MedalImg src={first} alt="1등" />
									87.6%
								</S.RankingBar3>
							</S.RankingBarContainer>
							<S.RankingBarContainer onClick={openModal}>
								배고프다
								<S.RankingBar4>
									<S.MedalImg src={third} alt="3등" />
									47.1%
								</S.RankingBar4>
							</S.RankingBarContainer>
							<S.RankingBarContainer onClick={openModal}>
								배고프다
								<S.RankingBar5>12.4%</S.RankingBar5>
							</S.RankingBarContainer>
						</S.RankingContainer>
					</S.TextContainer>
				</S.BodyContainer>
				<S.ButtonContainer>
					<CameraButton onClick={handleCameraButtonClick} />
				</S.ButtonContainer>
			</S.Container>
			{isModalOpen && <RankingModal onClose={closeModal} />}
		</S.Space>
	);
}

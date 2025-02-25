import { useState } from 'react';
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
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<S.Space>
			<BackHeader />
			<S.Container>
				<S.BodyContainer>
					<S.TopContainer>
						<InstagramBox instagramID="jennierubyjane" />
						<S.InstaImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s" />
						<PicGuideBox guide="샤요 궁(Palais de Chaillot) 방향에서 남쪽" />
					</S.TopContainer>
					<S.TextContainer>
						<S.TitleContainer>포토 팁</S.TitleContainer>
						<DescriptionBox
							description="이 사진을 보면 에펠탑이 정면으로 보이고, 넓은 광장이 있으며, 바닥이 돌로 
            포장되어 있습니다. 이런 특징을 고려했을 때, 샤요 궁(Palais de Chaillot) 
            방향에서 남쪽을 바라보며 촬영한 사진일 가능성이 높습니다. 최대3줄입니다ㅏㅏㅏ"
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
					<CameraButton />
				</S.ButtonContainer>
			</S.Container>
			{isModalOpen && <RankingModal onClose={closeModal} />}
		</S.Space>
	);
}

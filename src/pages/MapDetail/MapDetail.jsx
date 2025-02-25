import { useNavigate } from 'react-router-dom';
import * as S from './MapDetail.style';
import LogoHeader from '@components/Common/Header/LogoHeader';
import PlaceBox from './components/PlaceBox/PlaceBox';
import GuideBox from './components/GuideBox/GuideBox';
import BgImg from '@assets/svg/bg-map-detail.svg';

export default function MapDetail() {
	const navigate = useNavigate();

	const photoList = [
		{
			id: 0,
			imageUrl: 'https://github.com/user-attachments/assets/306149ff-dc7d-487c-a3ee-595ab00ea5bf',
			guide: '퐁 드 비르 아케임 다리에서 남쪽을 향해 촬영',
		},
		{
			id: 1,
			imageUrl: 'https://github.com/user-attachments/assets/425146d7-bef8-4a7c-b693-4048c429008c',
			guide: '샤요 궁(Palais de Chaillot) 방향에서 남쪽',
		},
		{
			id: 2,
			imageUrl: 'https://github.com/user-attachments/assets/fe461828-78d8-4f53-8710-d61e94e2dc09',
			guide: '퐁 드 비르 아케임 다리에서 남쪽을 향해 촬영',
		},
		{
			id: 3,
			imageUrl: 'https://github.com/user-attachments/assets/e7802c41-61ed-4a28-ae9a-806384612b77',
			guide: 'Port Debilly 근처 강변에서 남동쪽 방향',
		},
		{
			id: 4,
			imageUrl: 'https://github.com/user-attachments/assets/5f4e383e-45c8-4df2-9b21-483df58a5bcf',
			guide: 'Port Debilly 근처 강변에서 남동쪽 방향',
		},
	];

	const handleNavLinkClick = id => {
		navigate(`/picture-detail/${id}`);
	};

	return (
		<S.Space>
			<LogoHeader />
			<S.Container>
				<S.Background src={BgImg} alt="오늘의 포즈는?" />
				<S.BottomContainer>
					<PlaceBox country="프랑스" area="파리" />
					<S.PhotoContainer>
						{photoList.map(photo => (
							<S.PhotoBox key={photo.id} onClick={() => handleNavLinkClick(photo.id)}>
								<S.Photo src={photo.imageUrl} alt="포즈 사진" />
								<GuideBox guide={photo.guide} />
							</S.PhotoBox>
						))}
					</S.PhotoContainer>
				</S.BottomContainer>
			</S.Container>
		</S.Space>
	);
}

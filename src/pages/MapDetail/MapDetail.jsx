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
			id: 1,
			imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s',
			guide: '샤요 궁(Palais de Chaillot) 방향에서 남쪽',
		},
		{
			id: 2,
			imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s',
			guide: '샤요 궁(Palais de Chaillot) 방향에서 남쪽',
		},
		{
			id: 3,
			imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s',
			guide: '샤요 궁(Palais de Chaillot) 방향에서 남쪽',
		},
		{
			id: 4,
			imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s',
			guide: '샤요 궁(Palais de Chaillot) 방향에서 남쪽',
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

import * as S from './Map.style';
import LogoHeader from '@components/Common/Header/LogoHeader';
import PhotoBox from './components/PhotoBox/PhotoBox';
import GoogleMapContainer from './components/GoogleMap/GoogleMapContainer';

export default function Map() {
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

	return (
		<S.Space>
			<LogoHeader />
			<S.Container>
				{/* 구글맵 삽입 */}
				<S.MapContainer>
					<GoogleMapContainer />
				</S.MapContainer>
				<S.BottomContainer>
					<S.Title>오늘의 포토픽</S.Title>
					<S.PhotoContainer>
						{photoList.map(photo => (
							<PhotoBox
								key={photo.id}
								id={photo.id}
								imageUrl={photo.imageUrl}
								location={photo.location}
								instagram={photo.instagram}
							/>
						))}
					</S.PhotoContainer>
				</S.BottomContainer>
			</S.Container>
		</S.Space>
	);
}

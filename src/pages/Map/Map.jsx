import * as S from './Map.style';
import LogoHeader from '@components/Common/Header/LogoHeader';
import PhotoBox from './components/PhotoBox/PhotoBox';
import GoogleMapContainer from './components/GoogleMap/GoogleMapContainer';

export default function Map() {
	const photoList = [
		{
			id: 1,
			imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s',
			location: '사진 위치',
			instagram: 'rize_official',
		},
		{
			id: 2,
			imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s',
			location: '사진 위치',
			instagram: 'rize_official',
		},
		{
			id: 3,
			imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s',
			location: '사진 위치',
			instagram: 'rize_official',
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

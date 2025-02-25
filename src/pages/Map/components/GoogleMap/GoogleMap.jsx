import { useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PinIcon from '@assets/svg/icon-location-pin.svg';

const MapContainer = styled.div`
	width: 100vw;
	height: 100%;

	@media (hover: hover) and (pointer: fine) {
		width: 440px;
	}
`;

function GoogleMap() {
	const mapRef = useRef(null);
	const markerRef = useRef(null);
	const navigate = useNavigate();

	const mapContainerRef = useCallback(node => {
		if (!node || mapRef.current) return;

		if (!window.google || !window.google.maps) {
			console.error('❌ Google Maps API가 아직 로드되지 않았습니다.');
			return;
		}

		console.log('✅ Initializing Google Maps');

		// 🌍 Google Maps 생성
		mapRef.current = new window.google.maps.Map(node, {
			center: { lat: 48.858844, lng: 2.294351 },
			zoom: 16,
			mapId: import.meta.env.VITE_APP_GOOGLE_MAP_KEY,
			minZoom: 12,
			maxZoom: 18,
			gestureHandling: 'greedy',
		});
	}, []);

	useEffect(() => {
		if (!mapRef.current || markerRef.current) return;

		console.log('📍 Adding Advanced Marker');

		// ✅ 마커 컨테이너 동적 생성
		const markerElement = document.createElement('div');
		markerElement.classList.add('custom-marker');

		// ✅ 스타일 적용된 마커 구조 추가
		const container = document.createElement('div');
		container.style.position = 'relative';
		container.style.display = 'flex';
		container.style.justifyContent = 'center';
		container.style.alignItems = 'center';
		container.style.width = '42px';
		container.style.height = 'auto';
		container.style.cursor = 'pointer';

		// 🔹 핀 이미지 추가
		const pinImg = document.createElement('img');
		pinImg.src = PinIcon;
		pinImg.alt = '핀';
		pinImg.style.width = '42px';
		pinImg.style.height = 'auto';

		// 🔹 프로필 이미지 추가
		const img = document.createElement('img');
		img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV-EpDA9QlYzrKkI-xVr6FFolVlQaqZQQbw&s';
		img.alt = '이미지';
		img.style.position = 'absolute';
		img.style.top = '6px';
		img.style.left = '50%';
		img.style.transform = 'translateX(-50%)';
		img.style.width = '28.82px';
		img.style.height = '28.82px';
		img.style.aspectRatio = '1 / 1';
		img.style.borderRadius = '50%';
		img.style.objectFit = 'cover';

		// 📌 마커 요소 추가
		container.appendChild(pinImg);
		container.appendChild(img);
		markerElement.appendChild(container);

		// ✅ AdvancedMarkerElement 적용
		markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
			position: { lat: 48.858844, lng: 2.294351 },
			map: mapRef.current,
			title: 'Advanced Marker',
			content: markerElement,
		});

		// ✅ 마커 클릭 이벤트 추가
		markerRef.current.addListener('click', () => {
			console.log('📌 마커 클릭됨! 이동 중...');
			navigate(`/map-detail`);
		});
	}, [navigate]);

	return (
		<MapContainer ref={mapContainerRef} id="map">
			<p>⏳ Loading Google Maps...</p>
		</MapContainer>
	);
}

export default GoogleMap;

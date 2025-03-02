import styled from 'styled-components';

/**
 * 카메라 컴포넌트의 스타일 정의
 */
// 전체 카메라 컨테이너
export const CameraContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100dvh; /* 모바일 브라우저의 동적 뷰포트 높이 대응 */
	position: relative;
	overflow: hidden;
	background-color: #000; /* 검은색 배경 추가 */
`;

// 비디오 영역 컨테이너
export const VideoContainer = styled.div`
	position: relative;
	width: 100%;
	flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	/* 비율을 조정하기 위한 제약 추가 */
	aspect-ratio: 3/4; /* 모바일 세로 화면에 적합한 비율 */
	max-height: 80vh; /* 최대 높이 제한 */
	margin: 0 auto; /* 중앙 정렬 */
`;

// 실제 비디오 요소 스타일
export const StyledVideo = styled.video.attrs(() => ({
	autoPlay: true,
	playsInline: true,
	muted: true,
}))`
	width: 100%;
	height: 100%;
	object-fit: contain; /* 비율을 유지하면서 공간을 채움 */
	position: absolute;
	transform: ${props => (props.$isFlipped ? 'scaleX(-1)' : 'scaleX(1)')};
`;

// 실루엣 오버레이 스타일
export const SilhouetteOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: none; /* 이벤트가 비디오에 전달되도록 */
	z-index: 5;

	img {
		height: 90%;
		max-width: 90%;
		object-fit: contain;
		opacity: 0.7; /* 반투명하게 설정 */
		mix-blend-mode: screen; /* 이미지 블렌딩 모드 변경 */
		filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.3)); /* 옵션: 실루엣 가장자리에 미세한 그림자 추가 */
	}
`;

// 위치 안내 메시지 스타일
export const PositionGuide = styled.div`
	position: absolute;
	top: 15%;
	left: 0;
	right: 0;
	text-align: center;
	color: white;
	font-size: 18px;
	font-weight: 500;
	padding: 10px;
	z-index: 15;
	text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
	background-color: ${props => {
		switch (props.$status) {
			case 'too-close':
				return 'rgba(244, 67, 54, 0.7)'; // 빨간색 (너무 가까움)
			case 'too-far':
				return 'rgba(255, 152, 0, 0.7)'; // 주황색 (너무 멈)
			case 'not-centered':
				return 'rgba(33, 150, 243, 0.7)'; // 파란색 (중앙에 없음)
			case 'perfect':
				return 'rgba(76, 175, 80, 0.7)'; // 초록색 (적절함)
			default:
				return 'rgba(0, 0, 0, 0.5)'; // 기본 (검정)
		}
	}};
	border-radius: 20px;
	margin: 0 auto;
	max-width: 80%;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	opacity: ${props => (props.$status === 'none' ? 0 : 1)};
	transition:
		opacity 0.3s,
		background-color 0.3s;
`;

// 캔버스 (보이지 않음)
export const HiddenCanvas = styled.canvas`
	display: none;
`;

// 하단 컨트롤 컨테이너
export const ControlsContainer = styled.div`
	position: absolute;
	bottom: 20px;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 25px;
	padding: 0 20px;
	z-index: 10;
	margin-bottom: env(safe-area-inset-bottom, 0); /* iOS 안전 영역 고려 */
`;

// 컨트롤 버튼 (좌우 반전, 카메라 전환)
export const ControlButton = styled.button`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: white;
	border: 4px solid #4285f4;
	cursor: pointer;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 22px;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: rgba(66, 133, 244, 0.2);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: background-color 0.3s;
	}

	&:hover::after {
		background-color: rgba(66, 133, 244, 0.4);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		&::after {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
`;
// 촬영 버튼
export const CaptureButton = styled.button`
	width: 70px;
	height: 70px;
	border-radius: 50%;
	background-color: white;
	border: 4px solid #4285f4;
	cursor: pointer;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	position: relative;

	&::after {
		content: '';
		position: absolute;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: rgba(66, 133, 244, 0.2);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: background-color 0.3s;
	}

	&:hover::after {
		background-color: rgba(66, 133, 244, 0.4);
	}

	&:disabled {
		border-color: #bdbdbd;
		cursor: not-allowed;
		&::after {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
`;

// 캡처된 이미지 컨테이너
export const CapturedImageContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.9);
	z-index: 20;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	img {
		width: auto; /* 가로는 비율에 맞게 */
		height: 85dvh; /* dvh 사용 */
		object-fit: contain;
		max-width: 100%; /* 최대 너비 제한 */
	}
`;

// 캡처된 이미지 액션 버튼 컨테이너
export const CapturedImageActions = styled.div`
	display: flex;
	gap: 15px;
	margin-top: 20px;
`;

// 일반 버튼 (다시 촬영, 사용하기 등)
export const Button = styled.button`
	padding: 12px 20px;
	border: none;
	border-radius: 50px;
	background-color: ${props => (props.$primary ? '#4285F4' : 'rgba(0, 0, 0, 0.5)')};
	color: white;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.3s;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

	&:hover {
		background-color: ${props => (props.$primary ? '#3367D6' : 'rgba(0, 0, 0, 0.7)')};
	}

	&:disabled {
		background-color: #bdbdbd;
		cursor: not-allowed;
		opacity: 0.7;
	}
`;

// 에러 메시지
export const ErrorMessage = styled.div`
	position: absolute;
	top: 20px;
	left: 20px;
	right: 20px;
	color: white;
	background-color: rgba(244, 67, 54, 0.8);
	padding: 10px;
	border-radius: 5px;
	text-align: center;
	z-index: 30;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

// 상단 헤더 바
export const HeaderBar = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	padding: 15px 20px;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
	color: white;
	z-index: 10;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

// 헤더 제목
export const HeaderTitle = styled.h1`
	font-size: 18px;
	margin: 0;
	font-weight: 500;
`;

// 닫기 버튼
export const CloseButton = styled.button`
	background: none;
	border: none;
	color: white;
	font-size: 24px;
	cursor: pointer;
	padding: 5px;
`;

// 감지 프레임 (사각형 영역)
export const DetectionFrame = styled.div`
	position: absolute;
	top: 20%;
	left: 20%;
	width: 60%;
	height: 60%;
	border: 4px solid ${props => (props.$personDetected ? '#4CAF50' : '#FF5252')};
	border-radius: 8px;
	box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.3);
	pointer-events: none;
	transition: border-color 0.3s;

	&:before {
		content: '';
		position: absolute;
		top: -10px;
		left: -10px;
		right: -10px;
		bottom: -10px;
		border: 2px dashed ${props => (props.$personDetected ? 'rgba(76, 175, 80, 0.5)' : 'rgba(255, 82, 82, 0.5)')};
		border-radius: 12px;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.6;
		}
	}
`;

// 감지 상태 표시
export const DetectionStatus = styled.div`
	position: absolute;
	bottom: 20px;
	left: 0;
	right: 0;
	text-align: center;
	padding: 10px 16px;
	margin: 0 auto;
	width: fit-content;
	min-width: 200px;
	background-color: ${props => (props.$personDetected ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255, 82, 82, 0.9)')};
	color: white;
	border-radius: 30px;
	font-weight: 600;
	font-size: 14px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	transition: background-color 0.3s;
`;

/* CameraComponent.styles.js에 추가할 스타일 */

// 스캔 애니메이션 컨테이너
export const ScanAnimationContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 25; // CapturedImageContainer보다 위에 표시
	overflow: hidden;
`;

// 스캔 라인 애니메이션
export const ScanLine = styled.div`
	position: absolute;
	left: 0;
	width: 100%;
	height: 4px;
	background: linear-gradient(to right, rgba(0, 200, 255, 0.2), rgba(0, 200, 255, 0.8) 50%, rgba(0, 200, 255, 0.2));
	box-shadow: 0 0 8px rgba(0, 220, 255, 0.8);
	z-index: 2;
	animation: scanAnimation 2s linear infinite;
	opacity: ${props => (props.$isActive ? 1 : 0)};
	transition: opacity 0.3s ease;

	// 스캔 라인 애니메이션
	@keyframes scanAnimation {
		0% {
			top: 0;
		}
		100% {
			top: 100%;
		}
	}
`;

// 스캔 오버레이
export const ScanOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: radial-gradient(ellipse at center, rgba(0, 180, 255, 0.05) 0%, rgba(0, 180, 255, 0.1) 100%);
	z-index: 1;
	opacity: ${props => (props.$isActive ? 1 : 0)};
	transition: opacity 0.3s ease;
`;

// 스캔 진행 상태 표시
export const ScanProgress = styled.div`
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	color: white;
	font-size: 14px;
	font-weight: 600;
	padding: 8px 16px;
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: 20px;
	z-index: 3;
	opacity: ${props => (props.$isActive ? 1 : 0)};
	transition: opacity 0.3s ease;
	text-align: center;

	&::after {
		content: '';
		display: inline-block;
		width: 4px;
		height: 4px;
		margin-left: 4px;
		background-color: white;
		border-radius: 50%;
		animation: blink 1s infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}
`;

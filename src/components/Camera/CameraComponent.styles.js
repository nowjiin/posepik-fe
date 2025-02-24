import styled from 'styled-components';

export const CameraContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100dvh; /* 모바일 브라우저의 동적 뷰포트 높이 대응 */
	position: relative;
	overflow: hidden;
`;

export const VideoContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #000;
`;

export const StyledVideo = styled.video.attrs(() => ({
	// 여기서 HTML 요소에 전달할 속성만 정의
	autoPlay: true,
	playsInline: true,
	muted: true,
}))`
	width: 100%; /* 가로는 꽉 차게 */
	height: auto; /* 높이는 자동으로 비율 유지 */
	object-fit: cover; /* 비율을 유지하면서 공간을 채움 */
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) ${props => (props.$isFlipped ? 'scaleX(-1)' : 'scaleX(1)')};
`;

export const HiddenCanvas = styled.canvas`
	display: none;
`;

export const ControlsContainer = styled.div`
	position: absolute;
	bottom: 30px;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 25px;
	padding: 0 20px;
	z-index: 10;
`;

export const ControlButton = styled.button`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 22px;
	cursor: pointer;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

	&:hover {
		background-color: rgba(0, 0, 0, 0.7);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

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

export const CapturedImageActions = styled.div`
	display: flex;
	gap: 15px;
	margin-top: 20px;
`;

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

export const HeaderTitle = styled.h1`
	font-size: 18px;
	margin: 0;
	font-weight: 500;
`;

export const CloseButton = styled.button`
	background: none;
	border: none;
	color: white;
	font-size: 24px;
	cursor: pointer;
	padding: 5px;
`;

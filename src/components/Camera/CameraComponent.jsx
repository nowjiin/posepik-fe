import { useState, useEffect } from 'react';
import useCamera from './useCamera';
import {
	CameraContainer,
	VideoContainer,
	HiddenCanvas,
	ControlsContainer,
	ControlButton,
	CaptureButton,
	CapturedImageContainer,
	CapturedImageActions,
	Button,
	ErrorMessage,
	HeaderBar,
	HeaderTitle,
	CloseButton,
	DetectionStatus,
	DetectionFrame,
} from './CameraComponent.styles';

const CameraComponent = () => {
	const {
		videoRef,
		canvasRef,
		isCameraOn,
		cameraError,
		capturedImage,
		isFlipped,
		personDetected,
		detectionPercentage,
		detectionActive,
		startCamera,
		stopCamera,
		capturePhoto,
		sendPhotoToBackend,
		switchCamera,
		toggleFlip,
		initPoseDetection,
	} = useCamera();

	const [isSending, setIsSending] = useState(false);
	const [sendError, setSendError] = useState(null);
	const [showPreview, setShowPreview] = useState(false);
	const [detectionMessage, setDetectionMessage] = useState('사람 감지 시작하기 위해 버튼을 누르세요');

	// 컴포넌트 마운트 시 자동으로 카메라 시작
	useEffect(() => {
		startCamera();

		return () => {
			stopCamera();
		};
	}, []);

	// 감지 메시지 업데이트
	useEffect(() => {
		if (!detectionActive) {
			setDetectionMessage('사람 감지 기능을 초기화하는 중...');
		} else if (personDetected) {
			setDetectionMessage(`✅ 인식 성공: ${detectionPercentage}% 프레임 안에 있습니다`);
		} else {
			setDetectionMessage(`❌ 인식 실패: ${detectionPercentage}% 프레임 안에 있습니다`);
		}
	}, [personDetected, detectionPercentage, detectionActive]);

	// 사진 찍기
	const handleCapture = () => {
		capturePhoto();
		setShowPreview(true);
	};

	// 사진 다시 찍기
	const handleRetake = () => {
		setShowPreview(false);
	};

	// 사진 백엔드로 전송
	const handleSend = async () => {
		try {
			setIsSending(true);
			setSendError(null);

			// 백엔드로 전송
			const result = await sendPhotoToBackend();

			if (!result) {
				throw new Error('사진 전송 실패');
			}

			console.log('사진 전송 성공:', result);

			// 전송 성공 후 미리보기 닫기 (옵션)
			// setShowPreview(false);
		} catch (error) {
			console.error('전송 에러:', error);
			setSendError(error.message || '사진을 전송하는데 실패했습니다.');
		} finally {
			setIsSending(false);
		}
	};

	// 카메라 닫기 (사용자가 페이지를 떠날 때)
	const handleClose = () => {
		stopCamera();
		// 여기에 네비게이션 로직 추가 (예: 히스토리 백 또는 라우터 사용)
		// window.history.back() 또는 navigation("/previous-page")
	};

	const showDetectionElements = isCameraOn && !showPreview;

	return (
		<CameraContainer>
			<HeaderBar>
				<HeaderTitle>카메라</HeaderTitle>
				<CloseButton onClick={handleClose}>&times;</CloseButton>
			</HeaderBar>

			<VideoContainer>
				{!showPreview && (
					<>
						{videoRef && (
							<video
								ref={videoRef}
								autoPlay
								playsInline
								style={{
									display: 'block',
									width: '100%',
									transform: isFlipped ? 'scaleX(-1)' : 'none',
								}}
							/>
						)}
						{showDetectionElements && (
							<>
								<DetectionFrame $personDetected={personDetected} />
								<DetectionStatus $personDetected={personDetected}>{detectionMessage}</DetectionStatus>
							</>
						)}
					</>
				)}

				<HiddenCanvas ref={canvasRef} />
			</VideoContainer>

			{!showPreview && (
				<ControlsContainer>
					<ControlButton onClick={toggleFlip} disabled={!isCameraOn} title="좌우반전">
						⇄
					</ControlButton>
					<CaptureButton
						onClick={handleCapture}
						disabled={!isCameraOn || !personDetected}
						title={!personDetected ? '사람이 프레임 안에 있어야 합니다' : '사진 촬영'}
					/>
					<ControlButton onClick={switchCamera} disabled={!isCameraOn} title="카메라 전환">
						⟲
					</ControlButton>
				</ControlsContainer>
			)}

			{showPreview && capturedImage && (
				<CapturedImageContainer>
					<img src={capturedImage} alt="촬영된 사진" />
					<CapturedImageActions>
						<Button onClick={handleRetake}>다시 촬영</Button>
						<Button onClick={handleSend} disabled={isSending} $primary>
							{isSending ? '전송 중...' : '사용하기'}
						</Button>
					</CapturedImageActions>
				</CapturedImageContainer>
			)}

			{(cameraError || sendError) && <ErrorMessage>{cameraError || sendError}</ErrorMessage>}
		</CameraContainer>
	);
};

export default CameraComponent;

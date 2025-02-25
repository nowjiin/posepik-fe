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
	ScanAnimationContainer,
	ScanLine,
	ScanOverlay,
	ScanProgress,
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
	const [detectionMessage, setDetectionMessage] = useState('사람 감지 기능을 초기화하는 중...');
	const [uploadProgress, setUploadProgress] = useState(0);
	const [showScanAnimation, setShowScanAnimation] = useState(false);

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
			setDetectionMessage(`✅ 가이드에  ${detectionPercentage}% 위치했습니다`);
		} else if (detectionPercentage > 0) {
			setDetectionMessage(`❌ ${detectionPercentage}% 가이드에 맞지 않습니다`);
		} else {
			setDetectionMessage('❌ 사람이 감지되지 않았습니다');
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
			setShowScanAnimation(true);

			// 진행률 애니메이션 시작
			let progress = 0;
			const progressInterval = setInterval(() => {
				progress += 5; // 5%씩 증가
				if (progress > 95) {
					progress = 95; // 최대 95%까지만 표시 (실제 완료는 업로드 완료 후)
					clearInterval(progressInterval);
				}
				setUploadProgress(progress);
			}, 100);

			// 백엔드로 전송
			console.log('업로드 시작');

			const result = await sendPhotoToBackend();
			console.log('업로드 응답:', result);

			clearInterval(progressInterval);
			setUploadProgress(100); // 완료 표시

			// 스캔 애니메이션이 끝날 때까지 잠시 대기
			await new Promise(resolve => setTimeout(resolve, 500));

			if (!result || !result.url) {
				throw new Error('S3 업로드 실패');
			}

			console.log('S3 업로드 성공:', result);

			// 전송 성공 후 미리보기 닫기 (옵션)
			setShowScanAnimation(false);
			setShowPreview(false);
		} catch (error) {
			console.error('전송 에러:', error);
			console.error(error.message);
			setSendError(error.message || '사진을 전송하는데 실패했습니다.');
			setShowScanAnimation(false);
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
								{/* upperbody.png 이미지로 가이드 표시 */}
								<div
									style={{
										position: 'absolute',
										top: '10%',
										left: '10%',
										width: '80%',
										height: '80%',
										pointerEvents: 'none',
										zIndex: 5,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<img
										src="/images/upperbody.png"
										alt="상체 가이드"
										style={{
											maxWidth: '100%',
											maxHeight: '100%',
											objectFit: 'contain',
											opacity: '0.7',
											filter: personDetected
												? 'drop-shadow(0 0 8px rgba(76, 175, 80, 0.8))'
												: 'drop-shadow(0 0 8px rgba(255, 82, 82, 0.8))',
										}}
									/>
								</div>
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
